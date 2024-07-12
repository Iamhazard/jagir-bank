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
import { Label } from "@/Components/ui/label"
import { FiEdit } from "react-icons/fi";
import { Input } from "@/Components/ui/input";
import DatePickerTwo from "@/app/admin/_component/FormElements/DatePicker/DatePickerTwo";

export function EducationAlert() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><FiEdit color="blue" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Eucation</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <div className="grid w-full gap-1.5">
                            <Label>University Name</Label>
                            <Input
                                id="text"
                                defaultValue=""
                                readOnly
                            />
                            <div>
                                <Label>End year</Label>
                                <Input
                                    id="number"
                                    defaultValue=""
                                    readOnly
                                />
                            </div>



                        </div>
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
