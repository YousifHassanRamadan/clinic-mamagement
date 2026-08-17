import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  return (
    <Button variant="outline" className="h-11 w-full rounded-xl" type="button">
      <FcGoogle className="mr-2 h-5 w-5" />
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
