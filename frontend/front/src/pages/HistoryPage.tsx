import {useState} from "react";
import {useNavigate} from "@tanstack/react-router";
import {useQuery} from "@tanstack/react-query";
import {api} from "@/api/api.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

const HistoryPage = () =>{
    const [login, setLogin] = useState('');
    const [searchID, setSearchID] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const navigate = useNavigate();
    const {data: scans, isLoading, error} = useQuery({
        queryKey: ['scans',login],
        queryFn: ()=>api.getAllScans(login).then(res=> res.data),
        enabled: !!login
    })
    const filterSortScans = scans
        ?.filter(scan=> !searchID || scan.id.toString().includes(searchID))
        .sort((a,b) =>{
            if (sortBy === 'date') {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
            return Number(b.isAD) - Number(a.isAD);
        })
    return(
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">History Scans</h1>
            </div>
            <div className="flex flex-wrap items-end gap-4">
                <div className="flex-1 min-w-[200px]">
                    <Label htmlFor="login-filter">Login</Label>
                    <Input
                        id="login-filter"
                        placeholder="Enter Login"
                        value={login}
                        onChange={(e)=>setLogin(e.target.value)}
                        className="mt-1 w-full"
                    />
                </div>
                <div className="flex-1 min-w-[200px]">
                    <Label htmlFor="searchId">Search ID</Label>
                    <Input
                        id="searchId"
                        placeholder="Enter ID for search"
                        value={searchID}
                        onChange={(e)=>setSearchID(e.target.value)}
                        className="mt-1 w-full"
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={sortBy === 'date' ? "default": "outline"}
                        onClick={()=>setSortBy('date')}
                        >
                    By date
                    </Button>
                    <Button
                        variant={sortBy === 'status' ? 'default': "outline"}
                        onClick={()=>setSortBy('status')}
                        >
                    By status
                    </Button>
                </div>
            </div>
            {!login &&(
                <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg">
                    <p className="text-lg">
                        Enter login
                    </p>
                </div>
            )}
            {isLoading && (
                <div className="text-center py-16">
                    <div className="flex gap-2">
                        <p className="animate-spin rounded-full mx-auto">Loading...</p>
                    </div>
                </div>
            )}
            {error && (
                <div className="text-center py-16">
                    <p className="text-lg">Error!</p>
                </div>
            )}
            <div className="border rounded-lg overflow-hidden shadow">
                {filterSortScans && filterSortScans.length > 0 && (
                <Table className="border rounded-lg">
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="font-bold">
                                ID
                            </TableHead>
                            <TableHead className="font-bold" >
                                User
                            </TableHead>
                            <TableHead className="font-bold">
                                Status
                            </TableHead>
                            <TableHead className="font-bold">
                                Date
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterSortScans.map((scan) => (
                            <TableRow key={scan.id}
                            onClick={() => navigate({to: `/scan/$id`, params:{id: scan.id.toString()}})}
                            className="cursor-pointer hover:bg-muted/50 transition-colors">
                                <TableCell className="border">
                                    {scan.id}
                                </TableCell>
                                <TableCell className="border font-medium">
                                    {scan.user}
                                </TableCell>
                                <TableCell className="border font-medium">
                                    {scan.isAD ? "AD" : "no_AD"}
                                </TableCell>
                                <TableCell className="border text-muted-foreground">
                                    {new Date(scan.createdAt).toLocaleString('ru-RU',{
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                )}
            </div>
        </div>
    );
};
export default HistoryPage