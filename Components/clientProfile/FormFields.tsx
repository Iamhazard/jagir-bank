import { UseFormRegister, useFormContext } from "react-hook-form";

// type FormComponentProps = {
//   register: UseFormRegister<{
//     skills1: string;
//     skills2: string;
//     skills3: string;
//   }>;
// };

const FormFields = () => {
  const { register } = useFormContext();
  return (
    <>

    </>
  );
};

export default FormFields;
