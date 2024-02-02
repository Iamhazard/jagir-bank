import { FieldElement, UseFormRegister } from "react-hook-form";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};


export type FormData = {
    skill: string;
  
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
 
  