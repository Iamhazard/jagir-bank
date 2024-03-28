import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"
import { Button } from "@/Components/ui/button"
import { useState } from "react";

interface UserDeleteProps {
    userId: string;
    onDelete: () => void;
}
const UserDelete: React.FC<UserDeleteProps> = ({ userId, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirmDelete = () => {
        onDelete();
        setIsOpen(false);
    };


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size='sm'>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you to Remove this User?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete
                        Users and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default UserDelete