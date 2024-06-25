import Link from "next/link";
import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Snippet from "@/components/snippet";
import {PeerList} from "@/lib/types";

export default async function Dashboard() {
  const res = await fetch("http://localhost:8080/api/v1/peers");
  const peers = await res.json() as PeerList;

    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
              <div className="grid gap-4 md:gap-8 xl:grid-cols-2">
                  <Card className="xl:col-span-2">
                      <CardHeader className="flex flex-row items-center">
                          <div className="grid gap-4">
                              <CardTitle>Peers</CardTitle>
                              <CardDescription>
                                  List of peers on the network
                              </CardDescription>
                          </div>
                          {/*<Button asChild size="sm" className="ml-auto gap-1">*/}
                          {/*    <Link href="#">*/}
                          {/*        View All*/}
                          {/*        <ArrowUpRight className="h-4 w-4" />*/}
                          {/*    </Link>*/}
                          {/*</Button>*/}
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
                                  {peers.peers.map((peer, index) => (
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
                                          <Badge className="text-md rounded-lg" variant="outline">
                                              {peer.user}
                                          </Badge>
                                      </TableCell>
                                      <TableCell className="">
                                          {
                                              peer.connected ? <Badge className="bg-success rounded-lg">Connected</Badge> :
                                                  <Badge className="rounded-lg" variant="destructive">Disconnected</Badge>
                                          }
                                      </TableCell>
                                  </TableRow>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[625px]">
                                      <DialogHeader>
                                          <DialogTitle>Peer Details</DialogTitle>
                                          <DialogDescription>
                                          </DialogDescription>
                                          <div className="grid gap-4 py-4">
                                              <div className="grid grid-cols-4 items-center gap-4">
                                                  <Label className="text-right">
                                                      Admin
                                                  </Label>
                                                  <div className="text-center text-medium font-medium">
                                                      {peer.disabled ?
                                                          <Badge variant="destructive">
                                                              Disabled
                                                          </Badge> :
                                                          <Badge className="bg-success">
                                                              Enabled
                                                          </Badge>
                                                      }
                                                  </div>
                                              </div>

                                              <div className="grid grid-cols-4 items-center gap-4">
                                                  <Label className="text-right">
                                                      Status
                                                  </Label>
                                                  <div className="text-center text-medium font-medium">
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
                                                  <Snippet className="" text={peer.hostname}/>
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
                                                  {peer.user}
                                              </div>
                                          </div>
                                      </DialogHeader>
                                      <DialogFooter className="sm:justify-end">
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
          </main>
      </div>
    )
}

