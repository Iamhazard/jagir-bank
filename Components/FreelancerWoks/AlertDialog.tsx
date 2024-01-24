import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "../ui/checkbox";

const AlertDialogs = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Change</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Job Preference</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="py-3">
              {" "}
              <AlertDialogTitle>
                Introducing contract-to-hire opportunities
              </AlertDialogTitle>
            </div>
            {""}

            <p className="">
              <Checkbox /> {""}I am open to contract-to-hire opportunities - You
              can show clients you’re open to starting with a contract, and
              later exploring a full-time option
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogs;
