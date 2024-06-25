import {Copy} from "lucide-react"

import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils";

const defaultCss = "";

export default function Snippet({className = defaultCss, text}: { className?: string, text: string }) {
    return (
        <pre>
            <code className={cn("bg-accent/60 font-medium font-sans", className)}>
                {text}
            </code>
            <button className="ml-2">
                <span className="sr-only">Copy</span>
                <Copy className="h-3 w-3"/>
          </button>
        </pre>
    )
}