"use client"

import * as React from "react"

import { Button } from "@/Components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

const SpeedDial = () => {
    const [position, setPosition] = React.useState("bottom")

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size='sm'>
                    <DotsHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SpeedDial
