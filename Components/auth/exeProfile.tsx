"use client"
import MaxWidthWrapper from "@/app/(protected)/_components/maxwidthWrappers";
import { GraduationCap, Languages } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { CldUploadButton } from "next-cloudinary";
import { usePathname } from "next/navigation";
import { PortfolioSheet } from "./portfolio/PortfolioSheet";
import { BioAlert } from "./Dialog/BioDialog";
import { SkillAlert } from "./Dialog/SkillAlert";
import { EducationAlert } from "./Dialog/Ediucationalert";
import { LanguageAlert } from "./Dialog/LanguageAlert";
import { UsernameAlert, UserNameAlert } from "./Dialog/UsernameAlert";
import { Label } from "../ui/label";
import { EmploymentAlert } from "./Dialog/Employment";
import { Button } from "../ui/button";
import { useState } from "react";
import { HourlyAlert } from "./Dialog/HourlyRate";

export default function Example() {
    const pathname = usePathname();
    const [userName, setUserName] = useState<string>("User Name");
    const [hours, setHours] = useState<string>("12");
    const [language, setLanguges] = useState<string>("Nepali");
    const [universityName, setUniversityName] = useState<string>("TU");
    const [endYear, setEndYear] = useState<string>("2025");
    const [JobName, setJobName] = useState<string>("Developer");
    const [position, setPosition] = useState<string>("junior developer");
    const [bio, setBio] = useState<string>("");
    const [skills, setSkills] = useState<string>("JS");
    const [errors, setErrors] = useState<UsernameAlert>({});
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleUpload = (result: any) => {

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

    const handleProfileSubmit = () => {
        console.log(userName, "inside use form")
        console.log(universityName, "inside use form")
        console.log(endYear, "inside use form")

    }
    return (
        <MaxWidthWrapper>
            <form onSubmit={handleProfileSubmit}>
                <div className="px-8 py-4 border border-text-gray-600">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start p-4">
                        <div className="flex-shrink-0">
                            <Avatar>
                                <CldUploadButton
                                    options={{ maxFiles: 1 }}
                                    onUpload={handleUpload}
                                    uploadPreset="i1ziapfw"
                                >
                                    {uploadedImageUrl ? (
                                        <AvatarImage src={uploadedImageUrl} alt="Applicant Avatar" />
                                    ) : (
                                        <AvatarImage src="https://github.com/shadcn.png" alt="Default Avatar" />
                                    )}
                                    <AvatarFallback>Image</AvatarFallback>
                                </CldUploadButton>
                            </Avatar>
                        </div>

                        <div className="h-10 px-2">
                            <Separator orientation="vertical" />
                        </div>

                        <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                            <div className="flex gap-3">
                                <h3 className="text-lg font-semibold leading-7 text-gray-900">{userName}</h3>
                                <span className="font-medium text-indigo-600 hover:text-indigo-500"><UserNameAlert userName={userName} setUserName={setUserName} /> </span>


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
                                <dt className="text-sm font-medium leading-6 text-gray-900">{skills}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                                <span className="font-medium text-indigo-600 hover:text-indigo-500"><SkillAlert skills={skills} setSkills={setSkills} /> </span>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>

                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Hourly rate</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                                <span className="font-medium text-indigo-600 hover:text-indigo-500"><HourlyAlert hours={hours} setHours={setHours} /> </span>

                            </div>


                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Bio</dt>
                                <span className="font-medium text-indigo-600 hover:text-indigo-500"><BioAlert bio={bio} setBio={setBio} /> </span>
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

                                            <Label htmlFor="message" className="mb-3 block text-sm font-medium text-black dark:text-white">Employment History <EmploymentAlert setName={setJobName} name={JobName} setPosition={setPosition} position={position} /></Label>

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
                                                    <span className="flex-shrink-0 text-gray-400">{universityName}:-</span>
                                                    <small>{endYear}</small>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <span className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    <EducationAlert universityName={universityName} endYear={endYear} />
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
                                                    <LanguageAlert languages={language} setLanguages={setLanguges} />
                                                </span>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </form>
        </MaxWidthWrapper>
    )
}
