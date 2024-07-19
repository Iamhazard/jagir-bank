import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { GrAddCircle } from "react-icons/gr";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { portfolioSchema } from "@/Schemas";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import Image from "next/image";


export const PortfolioSheet = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleUploadimg = (result: any) => {

        try {
            if (result.event === 'success') {
                setUploadedImageUrl(result.info.url);
            }
            const imageUrl = result?.info?.secure_url;
            console.log({ imageUrl })

            if (imageUrl) {
                setImageUrl(imageUrl);
            }
            else {
                console.error("Image URL is null or undefined");
            }

        } catch (error) {
            console.log(error)
        }

    };
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(portfolioSchema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className="mx-auto max-w-270">
            <Sheet>
                <SheetTrigger asChild>
                    <button aria-label="Add Portfolio Project"><GrAddCircle size={28} /></button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Portfolio</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you are done.
                        </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-5 gap-8">
                            <div className="col-span-5 xl:col-span-3">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">
                                            New Portfolio Project
                                        </h3>
                                    </div>
                                    <div className="p-7">

                                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                            <div className="w-full sm:w-1/2">
                                                <Label htmlFor="projectTitle" className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                    Project Title
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        type="text"
                                                        id="projectTitle"
                                                        {...register("projectTitle")}
                                                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full sm:w-1/2">
                                                <Label htmlFor="skills" className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                    Skills
                                                </Label>
                                                <Input
                                                    type="text"
                                                    id="skills"
                                                    {...register("skills")}
                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <Label htmlFor="role" className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Role in this Project
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    id="role"
                                                    {...register("role")}
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <Label htmlFor="projectDescription" className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Project Description
                                            </Label>
                                            <div className="relative">
                                                <textarea
                                                    id="projectDescription"
                                                    {...register("projectDescription")}
                                                    rows={6}
                                                    placeholder="Write your description here"
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-4.5">
                                            <SheetClose asChild>
                                                <Button type="submit">Add</Button>
                                            </SheetClose>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-span-5 xl:col-span-2">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">
                                            Upload Image                                        </h3>
                                    </div>
                                    <div className="p-7">
                                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                            <div className="w-full sm:w-1/2">
                                                <div className="flex-shrink-0">
                                                    <div>
                                                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                                                            Upload Image
                                                        </label>
                                                        <div className="mt-1 flex items-center">
                                                            <CldUploadButton
                                                                uploadPreset="i1ziapfw"
                                                                onUpload={handleUploadimg}
                                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                            >
                                                                Upload
                                                            </CldUploadButton>
                                                            {uploadedImageUrl && (
                                                                <Image
                                                                    src={uploadedImageUrl}
                                                                    alt="Uploaded image"
                                                                    className="ml-4 h-16 w-16 object-cover rounded-md"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
