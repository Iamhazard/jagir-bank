/* eslint-disable react/jsx-no-undef */
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
import Image from "next/image";
import { GrAddCircle } from "react-icons/gr";

export function PortfolioSheet() {
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
                    <div className="grid grid-cols-5 gap-8">
                        <div className="col-span-5 xl:col-span-3">
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">
                                        New Portfolio Project
                                    </h3>
                                </div>
                                <div className="p-7">
                                    <form>
                                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                            <div className="w-full sm:w-1/2">
                                                <Label htmlFor="projectTitle" className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                    Project Title
                                                </Label>
                                                <div className="relative">
                                                    <span className="absolute left-4.5 top-4">
                                                        {/* SVG icon here */}
                                                    </span>
                                                    <Input
                                                        type="text"
                                                        id="projectTitle"
                                                        name="projectTitle"
                                                        placeholder=""
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
                                                    name="skills"
                                                    placeholder=""
                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <Label htmlFor="role" className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Role in this Project
                                            </Label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    {/* SVG icon here */}
                                                </span>
                                                <Input
                                                    type="text"
                                                    id="role"
                                                    name="role"
                                                    placeholder=""
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <Label htmlFor="projectDescription" className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Project Description
                                            </Label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    {/* SVG icon here */}
                                                </span>
                                                <textarea
                                                    id="projectDescription"
                                                    name="projectDescription"
                                                    rows={6}
                                                    placeholder="Write your description here"
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-5 xl:col-span-2">
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">
                                        Add Content
                                    </h3>
                                </div>
                                <div className="p-7">
                                    <form>
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="h-14 w-14 rounded-full">
                                                <Image
                                                    src="/images/user/user-03.png"
                                                    width={55}
                                                    height={55}
                                                    alt="User"
                                                />
                                            </div>
                                        </div>

                                        <div
                                            id="fileUpload"
                                            className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                                        >
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                            />
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                                            fill="#3C50E0"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.862 5.80478L8.66667 3.60948V10C8.66667 10.3682 8.36819 10.6667 8 10.6667C7.63181 10.6667 7.33333 10.3682 7.33333 10V3.60948L5.13803 5.80478C4.87768 6.06513 4.45557 6.06513 4.19522 5.80478C3.93487 5.54443 3.93487 5.12232 4.19522 4.86197L7.5286 1.52864Z"
                                                            fill="#3C50E0"
                                                        />
                                                    </svg>
                                                </span>
                                                <p>
                                                    <span className="text-primary">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="mt-1.5">(PNG, JPG, JPEG)</p>
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <Label htmlFor="imageName" className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Image Name
                                            </Label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    {/* SVG icon here */}
                                                </span>
                                                <Input
                                                    type="text"
                                                    id="imageName"
                                                    name="imageName"
                                                    placeholder=""
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <Label htmlFor="imageAlt" className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Image Alt
                                            </Label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    {/* SVG icon here */}
                                                </span>
                                                <Input
                                                    type="text"
                                                    id="imageAlt"
                                                    name="imageAlt"
                                                    placeholder=""
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <Label htmlFor="externalLink" className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                External Link
                                            </Label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    {/* SVG icon here */}
                                                </span>
                                                <Input
                                                    type="text"
                                                    id="externalLink"
                                                    name="externalLink"
                                                    placeholder=""
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-4.5">
                                            <SheetClose asChild>
                                                <Button type="submit">Add</Button>
                                            </SheetClose>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
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
