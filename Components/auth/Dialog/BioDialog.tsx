import { useForm, Controller } from "react-hook-form";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { FiEdit } from "react-icons/fi";
import { Textarea } from "@/Components/ui/textarea";

export type BioAlertProps = {
    bio: string;
    setBio: (value: string) => void;
};

export const BioAlert = ({ bio, setBio }: BioAlertProps) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<BioAlertProps>({
        defaultValues: {
            bio,
        },
    });

    const onSubmit = (data: BioAlertProps) => {
        setBio(data.bio);  // Update the bio with the form data
        console.log("Updated bio:", data.bio);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><FiEdit color="blue" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Bio</DialogTitle>
                    <DialogDescription>
                        You can update your bio here.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="bio">Your Bio</Label>
                                <Controller
                                    name="bio"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            id="bio"
                                            placeholder="Type your bio here."
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.bio && <span>{errors.bio.message}</span>}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <Button type="submit" variant="secondary">
                            save
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
