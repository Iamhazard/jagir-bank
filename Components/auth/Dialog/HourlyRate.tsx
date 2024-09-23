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
    hours?: string;
};

interface PropPass {
    hours: string;
    setHours: (value: string) => void;
}

export const HourlyAlert: React.FC<PropPass> = ({ hours, setHours }) => {
    const [errors, setErrors] = useState<HourlyAlert>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHours(e.target.value);
    };

    const validate = (): boolean => {
        const newErrors: HourlyAlert = {};
        if (hours.trim() === '') {
            newErrors.hours = 'Hourly rate is required';
        } else if (isNaN(Number(hours))) {
            newErrors.hours = 'Hourly rate must be a number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted', { hours });
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
                    <DialogTitle>Hourly Rate</DialogTitle>
                    <DialogDescription>
                        Enter your new hourly rate. This will update your profile information.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="hours">Hourly Rate</Label>
                            <Input
                                id="hours"
                                value={hours}
                                onChange={handleChange}
                                placeholder="Enter your hourly rate"
                                type="text"  // or "number" if you only want numeric input
                            />
                            {errors.hours && (
                                <span className="text-red-500 text-sm">{errors.hours}</span>
                            )}
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
