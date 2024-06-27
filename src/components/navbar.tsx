"use client";

import Link from "next/link"
import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu, Network,
    Package2,
    Search,
    Users,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
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
import {Input} from "@/components/ui/input"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {cn} from "@/lib/utils";
import {clsx} from "clsx";
import {usePathname} from "next/navigation";
import {ModeToggle} from "@/components/theme-toggle";


const links = [
    {
        name: "Dashboard",
        href: "/",
    },
    {
        name: "Settings",
        "href": "/settings",
    },
]


export default function Navbar() {
    const currentPath = usePathname();
    const isActiveLink = (path: string) => {
        return path === currentPath;
    }

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav
                className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Network className="h-6 w-6"/>
                    <span className="sr-only">ZeroNet</span>
                </Link>
                {
                    links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className={clsx(
                                "transition-colors hover:text-foreground",
                                {
                                    "text-foreground": isActiveLink(link.href),
                                    "text-muted-foreground": !isActiveLink(link.href),
                                }
                            )}
                            // className="text-foreground transition-colors hover:text-foreground"
                        >
                            {link.name}
                        </Link>
                    ))
                }
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Network className="h-6 w-6"/>
                            <span className="sr-only">ZeroNet</span>
                        </Link>
                        {
                            links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className={clsx(
                                        "transition-colors hover:text-foreground",
                                        {
                                            "text-foreground": isActiveLink(link.href),
                                            "text-muted-foreground": !isActiveLink(link.href),
                                        }
                                    )}
                                    // className="text-foreground transition-colors hover:text-foreground"
                                >
                                    {link.name}
                                </Link>
                            ))
                        }
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto">
                    <ModeToggle/>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5"/>
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}