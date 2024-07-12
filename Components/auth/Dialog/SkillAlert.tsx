import { Copy } from "lucide-react"

import { Button } from "@/Components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { FiEdit } from "react-icons/fi";

export function SkillAlert() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><FiEdit color="blue" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Skills</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Skills
                        </Label>
                        <Input
                            id="text"
                            defaultValue=""
                            readOnly
                        />
                    </div>

                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
