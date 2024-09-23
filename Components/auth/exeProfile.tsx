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
import { useEffect, useState } from "react";
import { HourlyAlert } from "./Dialog/HourlyRate";
import getCurrentUser from "@/actions/getCurrentUser";
import { useSession } from 'next-auth/react'
import { StringifyOptions } from "querystring";

interface Freelancer {
    messsage: string;
    imageInput: string | null;
    userName: string;
    profession: string[];
    hourlyRate: string;
    country: string;
    state: string;
    language: string;
    jobs: Job[];
}

interface Job {
    title: string;
    company: string;
    duration: string;
}

export default function Example() {
    const pathname = usePathname();
    const loggedIn = getCurrentUser();
    const [userName, setUserName] = useState<string>("Enter User Name");
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

    const [profile, setProfile] = useState(null);
    const [freelancer, setFreelancer] = useState<Freelancer[] | null>(null)
    const [error, setError] = useState(null);
    const { data: session } = useSession()
    const userId = session?.user.id


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`/api/profile/getProfile/${userId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setProfile(data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        if (userId) {
            fetchProfile();
        }
    }, [userId]);

    useEffect(() => {
        const fetchFreelancerProfile = async () => {
            try {
                const response = await fetch(`/api/freelancerprofile/getProfile/66efcfa6fed7636f23cda95b`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setFreelancer(data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        if (userId) {
            fetchFreelancerProfile();
        }
    }, [userId]);


    //console.log("freelancerProfile", freelancer)
    console.log("profile user id", userId)


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

    const handleProfileSubmit = async () => {
        const profileData = {
            userName,
            hours,
            language,
            universityName,
            endYear,
            JobName,
            position,
            bio,
            skills,
            imageUrl
        };

        console.log(profileData);

        try {
            const response = await fetch('/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Profile submitted successfully:', result);
        } catch (error) {
            console.error('Error submitting profile:', error);
        }
    };
    const freelancerArray = Array.isArray(freelancer) ? freelancer : [freelancer];
    return (
        <MaxWidthWrapper>
            <form onSubmit={handleProfileSubmit}>
                {freelancerArray?.map((freelancerItem, index) => (
                    <div key={index} className="px-8 py-4 border border-text-gray-600">
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
                                            <AvatarImage src={freelancerItem?.imageInput || undefined} alt="Avatar" />


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
                                <p className="mt-1 text-sm leading-6 text-gray-500">{freelancerItem?.state}</p>


                            </div>
                        </div>


                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${session?.user.name} ${session?.user.lastName}`}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">skill</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{skills}</dd>
                                    <span className="font-medium text-indigo-600 hover:text-indigo-500"><SkillAlert skills={skills} setSkills={setSkills} /> </span>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session?.user.email}</dd>

                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Hourly rate</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {hours || freelancerItem?.hourlyRate}
                                    </dd>
                                    <span className="font-medium text-indigo-600 hover:text-indigo-500">
                                        <HourlyAlert hours={hours} setHours={setHours} />
                                    </span>
                                </div>


                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Bio</dt>
                                    <span className="font-medium text-indigo-600 hover:text-indigo-500"><BioAlert bio={bio} setBio={setBio} />{freelancerItem?.messsage}</span>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">

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
                                                        <span className="truncate font-medium">Language :-{freelancerItem?.language}</span>
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
                ))}

            </form>
        </MaxWidthWrapper>
    )
}
