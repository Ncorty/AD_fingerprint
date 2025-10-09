import {useState} from "react";
import {useNavigate} from "@tanstack/react-router";
import {useMutation} from "@tanstack/react-query";
import {api} from "@/api/api.ts";
import {detectGoLogin} from "@/features/detectedGoLogin.ts";
import * as React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

export const HomePage = () => {
    const [login, setLogin] = useState('');
    const [scan, setScan] = useState(false);
    const navigate = useNavigate();
    const createScan = useMutation({
        mutationFn: api.createScan,
        onSuccess: ()=>{
            navigate({to: '/history'});
        },
        onError: (error) => {
            console.log(error);
            alert("Something went wrong");
            setScan(false);
        }
    })
    const handleScan = async () => {
        if (!login || login == '') {
            alert("Please login");
            return
        }
        setScan(true);
        try {
            const result = detectGoLogin()
            await new Promise(resolve => setTimeout(resolve, 1000));
            await createScan.mutateAsync({
                user: login,
                isAD: result.isAD,
                comment: result.comment
            });
        } catch (error) {
            console.log(error);
            setScan(false);
        }
    }
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && login && !scan) {
            handleScan();
        }
    }
    return (
        <div className="max-w-2xl mx-auto mt-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Scanning for availability GoLogin</CardTitle>
                    <CardDescription className="text-2xl">
                        Start scanning for availability
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-base">
                            Login
                        </Label>
                        <Input
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="login..."
                        disabled={scan}
                        className="text-base"
                        autoFocus
                        />
                    </div>
                    <Button
                    onClick={handleScan}
                    disabled={scan || !login}
                    size="lg"
                    className="text-base w-full py-6"
                    >
                        {scan ? (
                            <>
                               <span className="mr-2"></span>
                               Scanning...
                            </>
                            ):
                            (<>
                                <span className="mr-2"></span>
                                Start scan
                            </>
                            )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}