import {useNavigate, useParams, useSearch} from "@tanstack/react-router";
import { useState} from "react";
import {useQueryClient, useQuery, useMutation} from "@tanstack/react-query";
import {api} from "@/api/api.ts";
import {Button} from "@/components/ui/button.tsx";
import {Card} from "@/components/ui/card.tsx";

export const ScanPage = () =>{
    const { id } = useParams({strict: false});
    const user =useSearch({strict:false}) as {user:string};
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [deleteScan, setDeleteScan] = useState(false);
    const {data: scan, isLoading} = useQuery({
        queryKey: ['scan', id, user.user],
        queryFn: () => api.getScanById(Number(id), user.user).then(res=>res.data),
        enabled: !!id && !!user.user
    });
    const deleteMutaion = useMutation({
        mutationFn: (id: number) => api.deleteScan(id),
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['scans']});
            navigate({to: '/history'});
        }
    })
    const handleDeleteScan = () => {
        if (scan){
            deleteMutaion.mutate(scan.id)
        }
    }
    if(isLoading){
        return(
            <div className="flex justify-center item-center">
                <div className="animate-spin rounded-full border-emerald-800"> Loading...</div>
            </div>
        )
    }
    if(!scan){
        return (
            <div className="flex justify-center items-center">
                <h2 className="font-semibold text-xl">
                    Scan not found
                </h2>
                <p className="text-sm text-gray-600">
                    Scan with ID = {id} not found
                </p>
                <Button onClick={() => navigate({to:'/history'})}>
                    Back to history
                </Button>
            </div>
        )
    }
    return (
        <div className="mx-auto">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl">
                    Scan №{scan.id} - {scan.isAD ? 'AD detected' : 'AD no detected'}
                </h1>
            </div>
            <div className="flex flex-col gap-4">
                <Card className="shadow">
                    <h2 className="text-lg font-semibold text-xl">
                        INFO about User
                    </h2>
                    <div>
                        <span className="text-sm text-white-600">Login: </span>
                        <span className="text-sm text-white-600">{scan.user}</span>
                    </div>
                </Card>

                <Card className="shadow">
                    <h2 className="text-lg">
                        Details scan:
                    </h2>
                    <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                        {scan.comment || "no info("}
                    </div>
                </Card>
                <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        Дата сканирования
                    </h2>
                    <div>
                        {new Date(scan.createdAt).toLocaleString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        })}
                    </div>
                </Card>
                <div className="flex flex-col gap-4">
                    {!deleteScan ? (
                        <Button variant="destructive" onClick={() => setDeleteScan(true)}>
                            Delete scan
                        </Button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground mr-2">
                                You confirim?
                            </span>
                            <Button variant="destructive" onClick={handleDeleteScan} disabled={deleteMutaion.isPending}>
                                {deleteMutaion.isPending ? 'Deleted...' : 'I confirim'}
                            </Button>
                            <Button variant="outline" onClick={()=>setDeleteScan(false)}>
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}