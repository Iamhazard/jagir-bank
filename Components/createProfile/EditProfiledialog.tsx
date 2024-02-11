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

import { CiEdit } from "react-icons/ci";

interface ProfileProps {
    type: string;
    name: string;
}

const EditProfileDialog = ({ type, name }: ProfileProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <CiEdit color="green" size='22' />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit {type}</DialogTitle>
                    <DialogDescription>
                        {type}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            {name}
                        </Label>
                        <Input id="name" value="" className="col-span-3" />
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default EditProfileDialog;