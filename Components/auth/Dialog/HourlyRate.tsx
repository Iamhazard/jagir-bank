'use client'

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
import React, { ChangeEvent, FormEvent, useState } from "react";

export type HourlyAlert = {
    userName?: string
}

interface PropPass {
    hours: string;
    setHours: (value: string) => void;
}

export const HourlyAlert: React.FC<PropPass> = ({ hours, setHours }) => {
    //const [userName, setUserName] = useState<string>("");
    //console.log(userName, "userName")
    const [errors, setErrors] = useState<HourlyAlert>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHours(e.target.value);
    };

    const validate = (): boolean => {
        const newErrors: HourlyAlert = {};
        if (hours.trim() === '') {
            newErrors.userName = 'User Name is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validate()) {

            //console.log('Form submitted', { userName });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <FiEdit color="blue" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>User Name</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="userName">Your New User Name</Label>
                            <Input
                                id="userName"
                                value={hours}
                                onChange={handleChange}
                            />
                            {errors.userName && (
                                <span className="text-red-500 text-sm">{errors.userName}</span>
                            )}
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <Button type="button" variant="default">
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
}
