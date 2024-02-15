/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/Components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { GrFormEdit } from "react-icons/gr";

interface ClientDialogProps {
    type: string,

}

const ClientDialog = ({ type }: ClientDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex h-8 w-8 rounded-full bg-white border border-green-400 items-center justify-center "><GrFormEdit size={22} /></div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>

                    <DialogDescription>
                        Make changes to your {type} here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            {type}
                        </Label>
                        <Input id="name" className="col-span-3" />
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit" variant='btn_green'>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ClientDialog