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
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";

export type SkillAlertProps = {
    skills: string;
    setSkills: (value: string) => void;
};
export type SkillsAlert = {
    skills?: string
}
export const SkillAlert = ({ skills, setSkills }: SkillAlertProps) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<SkillAlertProps>({
        defaultValues: {
            skills,
        },
    });
    const [error, setErrors] = useState<SkillsAlert>({});
    const validate = (): boolean => {
        const newErrors: SkillsAlert = {};
        if (skills.trim() === '') {
            newErrors.skills = 'Skills Name is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = (data: SkillAlertProps) => {
        if (validate()) {

            console.log(data);
        }

    };

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="skills" className="sr-only">
                                Skills
                            </Label>
                            <Controller
                                name="skills"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="skills"
                                        {...field}

                                    />
                                )}
                            />
                            {errors.skills && <span>{errors.skills.message}</span>}
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <Button type="submit" variant="default">
                            Save
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
