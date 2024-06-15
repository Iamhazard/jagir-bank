
"use client";
import React, { useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// import { login } from "@/actions/action";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CardWrapper from '@/Components/auth/card-wrapper'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";

import { LoginSchema } from "@/Schemas";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { login } from "@/actions/loginAction";
import { FormError } from "@/Components/auth/form-error";
import { FormSuccess } from "@/Components/auth/form-success";

const Adminlogin = () => {
    const params = useSearchParams();
    const callbackUrl = params?.get("callbackUrl");
    const urlError =
        params?.get("error") === "OAuthAccountNotLinked"
            ? "Email already used by different providers!"
            : "";
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [showTwoFactor, setShowTwoFactor] = useState(false);

    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values, callbackUrl)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }
                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);

                    }
                    if (data?.twoFactor) {
                        setShowTwoFactor(true);
                    }

                })
                .catch(() => setError("Something went wrong"));
        });
    };
    return (
        <CardWrapper
            headerLabel="Admin"
            backButtonLabel="Admin login"
            blackButtonHref="/"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        {showTwoFactor && (
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Two Factor code</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}></FormField>
                        )}
                        {!showTwoFactor && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your email address"
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}></FormField>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Enter your Password"
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <Button
                                                size="sm"
                                                variant="link"
                                                asChild
                                                className="px-0 font-normal">
                                                <Link href="/auth/reset">Forgot Password</Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}></FormField>
                            </>
                        )}
                    </div>

                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        variant="btn_green"
                        disabled={isPending}
                        type="submit"
                        className="w-full">
                        {showTwoFactor ? "Confirm" : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default Adminlogin