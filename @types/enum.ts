import { FieldElement, UseFormRegister } from "react-hook-form";

import {  Account, ClientProfile, Conversation, FreelancerProfile, Message, User, UserRole } from "@prisma/client";

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

  