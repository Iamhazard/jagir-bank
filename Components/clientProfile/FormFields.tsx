import { useFormContext } from "react-hook-form";

const FormFields = () => {
  const { register } = useFormContext();
  return (
    <>
      <div className="col-span-full">
        <label
          htmlFor="skills"
          className="block text-sm font-medium leading-6 text-gray-900">
          Skills
        </label>
        <div className="mt-2">
          <input
            type="text"
            id="skills1"
            {...register("skills.skills1")}
            autoComplete="street-address"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <input
            type="text"
            id="skills2"
            {...register("skills.skills2")}
            autoComplete=""
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <input
            type="text"
            id="skills3"
            {...register("skills.skills3")}
            autoComplete=""
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </>
  );
};

export default FormFields;
