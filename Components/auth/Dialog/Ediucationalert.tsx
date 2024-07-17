'use client'
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
import { useEffect, useState } from "react";
import Select from "react-select";

export type EducationAlertProps = {
    universityName: string;
    endYear: string;
};
interface EducationOption {
    value: string;
    label: string;
}
interface Profession {
    name: string;
}

export const EducationAlert = ({ universityName, endYear }: EducationAlertProps) => {
    const [educations, setEducations] = useState<Profession[]>([]);  // Update the type to Profession[]

    useEffect(() => {
        fetchEducations();
    }, []);

    const fetchEducations = async () => {
        try {
            const response = await fetch('/api/job/Education/getEducation', {
                method: 'GET',
            });
            const data: Profession[] = await response.json();
            //console.log("data from response", data);
            setEducations(data);
        } catch (error) {
            console.log(error);
            setEducations([]);
        }
    };

    const { register, handleSubmit, formState: { errors }, control } = useForm<EducationAlertProps>({
        defaultValues: {
            universityName,
            endYear,
        },
    });

    const onSubmit = (data: EducationAlertProps) => {
        console.log(data);
    };

    const educationOptions: EducationOption[] = educations.map(education => ({
        value: education.name,
        label: education.name,
    }));

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><FiEdit color="blue" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Education</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <div className="grid w-full gap-1.5">
                                <Label>University Name</Label>
                                <Select
                                    options={educationOptions}
                                    isClearable
                                    placeholder="Select education..."
                                />
                                <div>
                                    <Label>End year</Label>
                                    <Input
                                        id="endYear"
                                        {...register("endYear", { required: "End year is required" })}
                                    />
                                    {errors.endYear && <span>{errors.endYear.message}</span>}
                                </div>
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
