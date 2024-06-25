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
    RefreshCcw,
    Search,
} from "lucide-react";
import {GetPeers} from "@/lib/peer-actions";
import useSWR from 'swr'
import { Skeleton } from "@/components/ui/skeleton"
import {Input} from "@/components/ui/input";
import {PeerList} from "@/lib/types";

export default function PeerTable() {
    const { data, error, mutate, isLoading } = useSWR("GetPeers", GetPeers);

    // const filter = (text: string) => {
    //     // alert(text);
    //     const copy = data as PeerList;
    //     if (text === "") {
    //         return
    //     }
    //     data.peers = copy.peers.filter((peer) => peer.hostname.includes(text))
    // }

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
                    <Button onClick={() => {mutate()}} size="icon" className="ml-auto gap-1" variant="ghost" >
                        <RefreshCcw className="h-6 w-6" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 w-full">
                    <Skeleton className="h-6"/>
                    <Skeleton className="h-6"/>
                    <Skeleton className="h-6"/>
                    <Skeleton className="h-6"/>
                    <Skeleton className="h-6"/>
                    <Skeleton className="h-6"/>
                    <Skeleton className="h-6"/>
                    <Skeleton className="h-6"/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    if (error) {
        return (
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
                    <CardContent>
                        <Card className="mx-auto w-[450px] h-[200px]">
                            <CardHeader className="text-center">
                                <CardTitle>Error</CardTitle>
                                <CardDescription>Error loading data from server</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label className="font-bold text-lg">Details</Label>
                                            {error.message}
                                        </div>
                                    </div>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:gap-8 xl:grid-cols-2">
            <Card className="xl:col-span-2">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-4">
                        <CardTitle>Peers</CardTitle>
                        <CardDescription>
                            List of peers on the network
                        </CardDescription>
                    </div>

                    <form className="ml-auto">
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
                        }} size="icon" className="ml-8" variant="ghost">
                            <RefreshCcw className="h-6 w-6"/>
                        </Button>


                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden md:table-cell">ID</TableHead>
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
                            {data.peers.map((peer, index) => (
                                <Dialog key={index}>
                                    <DialogTrigger asChild>
                                        <TableRow>
                                            <TableCell className="hidden md:table-cell font-medium">
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
                                                        <Badge className="bg-success rounded-lg">Connected</Badge> :
                                                        <Badge className="rounded-lg"
                                                               variant="destructive">Disconnected</Badge>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px]">
                                        <DialogHeader>
                                            <DialogTitle>Peer Details</DialogTitle>
                                            <DialogDescription>
                                            </DialogDescription>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right">
                                                        Admin
                                                    </Label>
                                                    <div className="text-medium font-medium">
                                                        {peer.disabled ?
                                                            <Badge variant="destructive">
                                                                Disabled
                                                            </Badge> :
                                                            <Badge className="bg-success text-primary">
                                                                Enabled
                                                            </Badge>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right">
                                                        Status
                                                    </Label>
                                                    <div className="text-medium font-medium">
                                                        {!peer.connected ?
                                                            <Badge variant="destructive">
                                                                Disconnected
                                                            </Badge> :
                                                            <Badge className="bg-success">
                                                                Connected
                                                            </Badge>
                                                        }
                                                    </div>
                                                </div>

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
                                        </DialogHeader>
                                        <DialogFooter className="sm:justify-end">
                                            <Button type="submit" variant="destructive">
                                            Delete Peer
                                            </Button>
                                            <DialogClose asChild>
                                                <Button type="button" variant="secondary">
                                                    Close
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}