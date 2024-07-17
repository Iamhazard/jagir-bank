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
import { Input } from "@/Components/ui/input";

export type LanguageAlertProps = {
    languages: string;
    setLanguages: (value: string) => void;
};

export const LanguageAlert = ({ languages, setLanguages }: LanguageAlertProps) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<LanguageAlertProps>({
        defaultValues: {
            languages,
        },
    });

    const onSubmit = (data: LanguageAlertProps) => {
        console.log(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><FiEdit color="blue" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Languages</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="languages">Your New Languages</Label>
                                <Controller
                                    name="languages"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            id="languages"
                                            placeholder="Type your languages here."
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.languages && <span>{errors.languages.message}</span>}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <Button type="submit" variant="secondary">
                            Submit
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
