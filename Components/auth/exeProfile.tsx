"use client"
import MaxWidthWrapper from "@/app/(protected)/_components/maxwidthWrappers";
import { GraduationCap, Languages, PaperclipIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { FiEdit } from "react-icons/fi";

import { usePathname } from "next/navigation";
import { PortfolioSheet } from "./portfolio/PortfolioSheet";
import { BioAlert } from "./Dialog/BioDialog";
import { RateAlert } from "./Dialog/HourlyRate";
import { SkillAlert } from "./Dialog/SkillAlert";
import { EducationAlert } from "./Dialog/Ediucationalert";
import { LanguageAlert } from "./Dialog/LanguageAlert";
import { UserNameAlert } from "./Dialog/UsernameAlert";
import { Label } from "../ui/label";
import { EmploymentAlert } from "./Dialog/Employment";
import { Button } from "../ui/button";


export default function Example() {
    const pathname = usePathname();

    return (
        <MaxWidthWrapper>
            <div className="px-8 py-4 border border-text-gray-600">
                <div className="flex flex-col sm:flex-row items-center sm:items-start p-4">
                    <div className="flex-shrink-0">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="Applicant Avatar" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="h-10 px-2">
                        <Separator orientation="vertical" />
                    </div>

                    <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                        <div className="flex gap-3">
                            <h3 className="text-lg font-semibold leading-7 text-gray-900">User name</h3>
                            <span className="font-medium text-indigo-600 hover:text-indigo-500"><UserNameAlert /> </span>


                        </div>
                        <p className="mt-1 text-sm leading-6 text-gray-500">Addresss.</p>

                    </div>
                </div>

                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Skills</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                            <span className="font-medium text-indigo-600 hover:text-indigo-500"><SkillAlert /> </span>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>

                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Hourly rate</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                            <span className="font-medium text-indigo-600 hover:text-indigo-500"><RateAlert /> </span>

                        </div>


                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Bio</dt>
                            <span className="font-medium text-indigo-600 hover:text-indigo-500"><BioAlert /> </span>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                                qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                                pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                            </dd>

                        </div>
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pb-6">

                            <div className=" flex justify-around  border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Portfolio
                                </h3>
                                <span><PortfolioSheet /></span>

                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div className=" w-[200px] h-[200px] rounded-sm border shadow-1 py-3">
                                    <p>Hi</p>
                                </div>
                                <p className="px-8">Portfolio Name</p>
                            </div>
                        </div>


                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-3">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Linked accounts:
                                    <div>
                                        <Button variant="link2">GitHub</Button>
                                    </div>
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>

                                    <div className="grid w-full gap-1.5">

                                        <Label htmlFor="message" className="mb-3 block text-sm font-medium text-black dark:text-white">Employment History <EmploymentAlert /></Label>

                                        <span>hhh</span>
                                    </div>
                                </div>



                            </div>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Others</dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <GraduationCap aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">Education:</span>
                                                <span className="flex-shrink-0 text-gray-400">Bachelor of Science in Information Technology :-</span>
                                                <small>2019-2025</small>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <span className="font-medium text-indigo-600 hover:text-indigo-500">
                                                <EducationAlert />
                                            </span>
                                        </div>
                                    </li>
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <Languages aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">Language :-</span>
                                                <span className="flex-shrink-0 text-gray-400"></span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <span className="font-medium text-indigo-600 hover:text-indigo-500">
                                                <LanguageAlert />
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}
