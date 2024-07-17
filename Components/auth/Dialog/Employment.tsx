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
import Select from "react-select";

export type EmploymentAlertProps = {
    name: string;
    setName: (value: string) => void;
    position: string;
    setPosition: (value: string) => void;
};

const positionOptions = [
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Manager' },
    { value: 'int', label: 'Internship' },
    { value: 'jr', label: 'Junior Developer' },
    { value: 'help', label: 'Helper' },
    { value: 'ass', label: 'Assistant' },
    // Add more positions as needed
];

export const EmploymentAlert = ({ name, setName, position, setPosition }: EmploymentAlertProps) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<EmploymentAlertProps>({
        defaultValues: {
            name,
            position,
        },
    });

    const onSubmit = (data: EmploymentAlertProps) => {
        console.log(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button><FiEdit color="blue" /></button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Employment</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    {...register("name", { required: "Name is required" })}
                                    readOnly
                                />
                                {errors.name && <span>{errors.name.message}</span>}
                                <div>
                                    <Label htmlFor="position">Position</Label>
                                    <Controller
                                        name="position"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={positionOptions}
                                                isClearable
                                                placeholder="Select position..."
                                                value={positionOptions.find(option => option.value === field.value)}
                                                onChange={selected => field.onChange(selected ? selected.value : null)}
                                            />
                                        )}
                                    />
                                    {errors.position && <span>{errors.position.message}</span>}
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
