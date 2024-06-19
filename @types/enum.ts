import { FieldElement, UseFormRegister } from "react-hook-form";

import {  Account, ClientProfile, Conversation, FreelancerProfile, JobStatus, Message, Proposal, SkillsOnJobs, User, UserRole } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User, 
  seen: User[]
};

export type FullConversationType = Conversation & { 
  users: User[]; 
  messages: FullMessageType[]
};

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};


export type FormData = {
    skills:{
      skills1:string,
      skills2:string,
      skills3:string,

    }
  
  };

  export type ScopeData  = {
    Scope: string;
  
  };

  export type FormFieldProps = {
    type: string;
    placeholder: string;
     message:string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldElement | undefined;
    valueAsNumber?: boolean;
  };

  export type ValidFieldNames =
  | "skill"
 

  export type LoginResponse = {
  success?: string;
  error?: string;
  twoFactor?: boolean;
  role?: UserRole; // Add the user's role to the response
};


export interface Users {
  user:User[]
  id: string;
  name?: string;
  lastName?: string;
  email?: string;
 emailVerified?: Date;
  image?: string;
  password?: string ;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  accounts?: Account[];
  isTwoFactorEnabled: boolean;
  twoFactorConfirmation?: boolean ;
  profile?: FreelancerProfile[];
  clientProfile?: ClientProfile[];
  conversationIds?: string[];
  conversations?: Conversation[];
 seenMessageIds?: string[];
  seenMessages?: Message[];
  messages?: Message[];
}

  export type ProposalForms={
    id: string,
    title: string,
    country: string,
    clientProfileId: string,
    jobdescription?: string;
    jobsbudget?: string;
    duration: string,
    expertise: string,
    projectSize: string,
    fixed: string,
    Place: string,
    from: string,
    to: string,
    post: string,
    jobDescription: string,
    createdAt: string,
    skills: Array<{ title: string }>;

}

  


export interface AuthState {
    user: User | null; 
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    sessionToken: string | null;
    isLoggedIn: boolean;
    isAdmin: boolean;
    success: string | null;
    users: User[];
}

export interface Job{
  id: string;
  post?: string;
  projectSize?: string;
  duration?: string;
  expertise: string;
  from: string;
  to: string;
  fixed: string;
  createdAt: Date;
  updatedAt: Date;
  jobDescription?: string;
  clientProfile: ClientProfile;
  clientProfileId: string;
  SkillsOnJobs: SkillsOnJobs[];
  status: JobStatus;
  proposals: Proposal[];
}
export interface CategoryState {
   id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryPageProps {
    category: CategoryState| null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    success: string | null;

}
export interface ProfessionState {
   id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface DeleteButtonPros {
    label:string, 
    onDelete: ()=>{}
}




export interface SkillState {
   id: string;
  skill: string;
  createdAt: string;
  updatedAt: string;
}

export interface SalaryState {
   id: string;
  salary: string;
  createdAt: string;
  updatedAt: string;
}

export interface DistrictState {
   id: string;
  district: string;
}

export interface Country {
  id: string;
  name: string;
  zip: string;
  state: string[];
  city: string[];
  streetAddress: string[];
}

export interface Skill {
  id: string; 
  skill: string;
}

export interface Profession {
  id: string;
  title: string;
}
