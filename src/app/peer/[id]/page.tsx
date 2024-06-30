"use client";

import Link from "next/link";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import useSWR from "swr";
import {DeletePeer, GetPeer, GetPeers} from "@/lib/peer-actions";
import {RefreshCcw} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {Peer} from "@/lib/types";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import Snippet from "@/components/snippet";
import {useFormState} from "react-dom";

export default function Page({ params }: { params: { id: number } }) {
    const GetPeerWithId = GetPeer.bind(null, params.id);
    const initialState = {
        message: ''
    }

    const DeletePeerWithId = DeletePeer.bind(null, initialState, params.id);
    const [formState, formAction] = useFormState(DeletePeerWithId, initialState);
    const {data, error, mutate, isLoading} = useSWR("GetPeerWithId", GetPeerWithId, {
        revalidateOnFocus: false,
        refreshInterval: 60 * 1000,
        shouldRetryOnError: false,
        // errorRetryInterval: 30 * 1000
    });

    if (isLoading) {
        return (
            <div className="flex min-h-screen w-full flex-col">
                <main
                    className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                    <div className="mx-auto grid w-full max-w-6xl gap-2">
                        <h1 className="text-3xl font-semibold">Peer Settings</h1>
                    </div>
                    <div
                        className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                        <nav
                            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                        >
                            <Link href="#test1" className="font-semibold text-primary">
                                General
                            </Link>
                            <Link href="#">Security</Link>
                        </nav>
                        <div className="grid gap-8">
                            <Card className="h-[436px]">
                                <CardHeader>
                                    <CardTitle>Peer Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                        {
                                          Array.apply(0, Array(2)).map((_, i) => (
                                              <div key={i} className="grid grid-cols-1 gap-4 mt-4 mx-16">
                                                  <Skeleton className="h-8"/>
                                                  <Skeleton className="h-8"/>
                                                  <Skeleton className="h-8"/>
                                              </div>
                                          ))
                                      }
                                </CardContent>
                            </Card>
                            <Card className="h-[164px]">
                                <CardHeader>
                                    <CardTitle>Manage Peer</CardTitle>
                                    <CardDescription>
                                        Disable or Delete Peer.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                   <div className="flex flex-row gap-4 w-full">
                                       <Skeleton className="h-10 w-[115px]"/>
                                       <Skeleton className="h-10 w-[115px]"/>
                                   </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
            // <div className="grid gap-4 md:gap-8 xl:grid-cols-2">
            //     <Card className="xl:col-span-2">
            //         <CardHeader className="flex flex-row items-center">
            //             <div className="grid gap-4">
            //                 <CardTitle>Peers</CardTitle>
            //                 <CardDescription>
            //                     List of peers on the network
            //                 </CardDescription>
            //             </div>
            //             <Button onClick={() => {
            //                 mutate()
            //             }} size="icon" className="ml-auto gap-1" variant="ghost">
            //                 <RefreshCcw className="h-6 w-6"/>
            //             </Button>
            //         </CardHeader>
            //         <CardContent className="pt-6">
            //             {
            //                 Array.apply(0, Array(1)).map((_, i) => (
            //                     <div key={i} className="grid grid-cols-4 gap-4 mt-4">
            //                         <Skeleton className="h-8"/>
            //                         <Skeleton className="h-8"/>
            //                         <Skeleton className="h-8"/>
            //                         <Skeleton className="h-8"/>
            //                     </div>
            //                 ))
            //             }
            //         </CardContent>
            //     </Card>
            // </div>
        )
    }

    if (error) {
        toast({
            title: "Error",
            description: "Error fetching peer data from server",
            variant: "destructive",
            action: <ToastAction className="bg-background/80 text-primary " onClick={() => mutate()} altText="Try again">Try again</ToastAction>,
            className: "bg-destructive fg-white"
        });
        return (
            <div className="flex min-h-screen w-full flex-col">
                <main
                    className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                    <div className="mx-auto grid w-full max-w-6xl gap-2">
                        <h1 className="text-3xl font-semibold">Peer Details</h1>
                    </div>
                    <div
                        className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                        <nav
                            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                        >
                            <Link href="#test1" className="font-semibold text-primary">
                                General
                            </Link>
                            <Link href="#">Security</Link>
                        </nav>
                        <div className="grid gap-8">
                            <Card className="h-[436px]">
                                <CardHeader>
                                    <CardTitle>Peer Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                </CardContent>
                            </Card>
                            <Card className="h-[164px]">
                                <CardHeader>
                                    <CardTitle>Manage Peer</CardTitle>
                                </CardHeader>
                                <CardContent>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    const peer = data.peer as Peer;

    if (formState.message) {
        toast({
            title: "Error deleting peer",
            description: formState.message,
            variant: "destructive",
            action: <ToastAction className="bg-background/80 text-primary " onClick={() => mutate()}
                                 altText="Try again">Try again</ToastAction>,
            className: "bg-destructive fg-white"
        });
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main
                className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">{peer.hostname} Settings</h1>
                </div>
                <div
                    className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav
                        className="grid gap-4 text-sm text-muted-foreground"
                    >
                        <Link href="#test1" className="font-semibold text-primary">
                            General
                        </Link>
                        <Link href="#">Security</Link>
                    </nav>
                    <div className="grid gap-8">
                        <Card id="test1">
                            <CardHeader>
                                <CardTitle>Peer Status</CardTitle>
                                {/*<CardDescription>*/}
                                {/*Information and status of current peer.*/}
                                {/*</CardDescription>*/}
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-left">
                                            Admin:
                                        </Label>
                                        <div className="text-medium font-medium">
                                            {peer.disabled ?
                                                <Badge variant="destructive" className="">
                                                    Disabled
                                                </Badge> :
                                                <Badge className="bg-success">
                                                    Enabled
                                                </Badge>
                                            }
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="">
                                            Status:
                                        </Label>
                                        <div className="text-medium font-medium">
                                            {!peer.connected ?
                                                <Badge variant="destructive" className="">
                                                    Disconnected
                                                </Badge> :
                                                <Badge className="bg-success">
                                                    Connected
                                                </Badge>
                                            }
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="">
                                            Hostname:
                                        </Label>
                                        <Snippet text={peer.hostname}/>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="">
                                            IP:
                                        </Label>
                                        <Snippet text={peer.ip}/>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="">
                                            Network:
                                        </Label>
                                        {peer.prefix}
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="">
                                            User:
                                        </Label>
                                        <Snippet text={peer.user}/>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="">
                                            Last Auth:
                                        </Label>
                                        <div className="whitespace-nowrap">{peer.lastAuth}</div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="">
                                            Created:
                                        </Label>
                                        <div className="whitespace-nowrap">{peer.createdAt}</div>
                                    </div>
                                </div>
                            </CardContent>
                            {/*<CardFooter className="border-t px-6 py-4">*/}
                            {/*    <Button>Save</Button>*/}
                            {/*</CardFooter>*/}
                        </Card>
                        <Card id="Manage">
                            <CardHeader>
                                <CardTitle>Manage Peer</CardTitle>
                                <CardDescription>
                                    Disable or Delete Peer.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-4">
                                {peer.disabled ?
                                    <Button variant="ghost" className="bg-success hover:bg-success/85">Enable Peer</Button> :
                                    <Button variant="destructive">Disable Peer</Button>
                                }

                                <form action={formAction}>
                                <Button variant="destructive" type="submit">
                                    Delete Peer
                                </Button>
                                </form>
                                </div>
                            </CardContent>
                            {/*<CardFooter className="border-t px-6 py-4">*/}
                            {/*    <Button>Save</Button>*/}
                            {/*</CardFooter>*/}
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}