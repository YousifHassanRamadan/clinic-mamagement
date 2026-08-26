// components/feature/dashboard/admin/sessions/AddSession.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  label: string;
}

const AddSession = ({ label }: Props) => {
  const router = useRouter();

  const handleAddSession = () => {
    router.push("/dashboard/admin/sessions/add-session");
  };

  return (
    <Button className="rounded-xl" onClick={handleAddSession}>
      <Plus className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
};

export default AddSession;
