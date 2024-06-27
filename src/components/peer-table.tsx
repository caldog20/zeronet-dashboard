"use client";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Badge} from "@/components/ui/badge";
import {Label} from "@/components/ui/label";
import Snippet from "@/components/snippet";
import {Button} from "@/components/ui/button";
import {
    Network,
    RefreshCcw,
    Search,
} from "lucide-react";
import {GetPeers} from "@/lib/peer-actions";
import useSWR from 'swr'
import {Skeleton} from "@/components/ui/skeleton"
import {Input} from "@/components/ui/input";
import {Peer, PeerList} from "@/lib/types";
import {toast} from "@/components/ui/use-toast";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {ToastAction} from "@/components/ui/toast";

export default function PeerTable() {
    const {data, error, mutate, isLoading} = useSWR("GetPeers", GetPeers, {
        revalidateOnFocus: false,
        refreshInterval: 30,
        shouldRetryOnError: false,
        // errorRetryInterval: 30 * 1000
    });

    // const filter = (text: string) => {
    //     // alert(text);
    //     const copy = data as PeerList;
    //     if (text === "") {
    //         return
    //     }
    //     data.peers = copy.peers.filter((peer) => peer.hostname.includes(text))
    // }

    const skels = 4;

    if (isLoading) return (
        <div className="grid gap-4 md:gap-8 xl:grid-cols-2">
            <Card className="xl:col-span-2">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-4">
                        <CardTitle>Peers</CardTitle>
                        <CardDescription>
                            List of peers on the network
                        </CardDescription>
                    </div>
                    <Button onClick={() => {
                        mutate()
                    }} size="icon" className="ml-auto gap-1" variant="ghost">
                        <RefreshCcw className="h-6 w-6"/>
                    </Button>
                </CardHeader>
                <CardContent className="pt-6">
                    {
                        Array.apply(0, Array(skels)).map((_, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4 mt-4">
                        <Skeleton className="h-8"/>
                        <Skeleton className="h-8"/>
                        <Skeleton className="h-8"/>
                        <Skeleton className="h-8"/>
                        </div>
                        ))
                    }
                </CardContent>
            </Card>
        </div>
    )

    if (error) {
        toast({
            title: "Error",
            description: "Error fetching peer data from server",
            variant: "destructive",
            action: <ToastAction className="bg-background/80 text-primary " onClick={() => mutate()} altText="Try again">Try again</ToastAction>,
            className: "bg-destructive fg-white"
        });
    }

    return (
        <div className="grid gap-4 md:gap-8 xl:grid-cols-2">
            <Card className="xl:col-span-2 bg-background mx-14">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-4">
                        <CardTitle>Peers</CardTitle>
                        <CardDescription>
                            List of peers on the network
                        </CardDescription>
                    </div>
                    <form className="max-md:hidden mx-auto pl-4 pr-[100px]">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <Input
                                type="search"
                                placeholder="Search peers..."
                                className="pl-8 sm:w-[200px] md:w-[200px] lg:w-[300px]"
                                // onChange={(event) => filter(event.target.value)}
                            />
                        </div>
                    </form>
                    <Button onClick={() => {
                        mutate()
                    }} size="icon" className="max-md:ml-auto relative ml-8" variant="ghost">
                        <RefreshCcw className="h-6 w-6"/>
                    </Button>


                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden lg:table-cell">ID</TableHead>
                                <TableHead>
                                    Hostname
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    IP
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    User
                                </TableHead>
                                <TableHead className="">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data && data.peers.map((peer: Peer, index: number) => (
                                <HoverCard key={index}>
                                    <HoverCardTrigger asChild>
                                        <TableRow>
                                            <TableCell className="hidden lg:table-cell font-medium">
                                                {peer.id}
                                                {/*<div className="hidden text-sm text-muted-foreground md:inline">*/}
                                                {/*liam@example.com*/}
                                                {/*</div>*/}
                                            </TableCell>
                                            <TableCell>
                                                {peer.hostname}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {peer.ip}
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                {peer.user}
                                                {/*<Badge className="text-md rounded-lg" variant="outline">*/}
                                                {/*{peer.user}*/}
                                                {/*</Badge>*/}
                                            </TableCell>
                                            <TableCell className="">
                                                {
                                                    peer.connected ?
                                                        <Badge className="bg-success">Connected</Badge> :
                                                        <Badge className=""
                                                               variant="destructive">Disconnected</Badge>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="sm:max-w-[320px] min-w-[320px]">
                                        {/*<DialogHeader>*/}
                                        {/*    <DialogTitle>Peer Details</DialogTitle>*/}
                                        {/*    <DialogDescription>*/}
                                        {/*    </DialogDescription>*/}
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right">
                                                        Admin
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

                                                {/*<div className="grid grid-cols-4 items-center gap-4">*/}
                                                {/*    <Label className="text-right">*/}
                                                {/*        Status*/}
                                                {/*    </Label>*/}
                                                {/*    <div className="text-medium font-medium">*/}
                                                {/*        {!peer.connected ?*/}
                                                {/*            <Badge variant="destructive" className="">*/}
                                                {/*                Disconnected*/}
                                                {/*            </Badge> :*/}
                                                {/*            <Badge className="bg-success">*/}
                                                {/*                Connected*/}
                                                {/*            </Badge>*/}
                                                {/*        }*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}

                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right">
                                                        Hostname
                                                    </Label>
                                                    <Snippet text={peer.hostname}/>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right">
                                                        IP
                                                    </Label>
                                                    <Snippet text={peer.ip}/>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right">
                                                        Network
                                                    </Label>
                                                    {peer.prefix}
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right">
                                                        User
                                                    </Label>
                                                    <Snippet text={peer.user}/>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right">
                                                        Last Auth
                                                    </Label>
                                                    <div className="whitespace-nowrap">{peer.lastAuth}</div>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right">
                                                        Created
                                                    </Label>
                                                    <div className="whitespace-nowrap">{peer.createdAt}</div>
                                                </div>
                                            </div>
                                        {/*</DialogHeader>*/}
                                        {/*<DialogFooter className="sm:justify-end">*/}
                                        {/*    <Button type="submit" variant="destructive">*/}
                                        {/*        Delete Peer*/}
                                        {/*    </Button>*/}
                                        {/*    <DialogClose asChild>*/}
                                        {/*        <Button type="button" variant="secondary">*/}
                                        {/*            Close*/}
                                        {/*        </Button>*/}
                                        {/*    </DialogClose>*/}
                                        {/*</DialogFooter>*/}
                                    </HoverCardContent>
                                </HoverCard>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}