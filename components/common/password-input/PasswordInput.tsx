"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type PasswordInputProps = React.ComponentProps<typeof Input>;

const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      {" "}
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        className={`h-11 rounded-xl p-3 pr-12 ${className ?? ""}`}
      />{" "}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-transparent"
      >
        {" "}
        {showPassword ? (
          <EyeOff className="h-5 w-5 text-muted-foreground" />
        ) : (
          <Eye className="h-5 w-5 text-muted-foreground" />
        )}{" "}
      </Button>{" "}
    </div>
  );
};
export default PasswordInput;
