import EditSessionPage from "@/components/feature/dashboard/admin/sessions/manage-session/EditSessionPage";
import React from "react";

interface Props {
  params: Promise<{
    sessionId: string;
  }>;
}

const EditSession = async ({ params }: Props) => {
  const { sessionId } = await params;
  return <EditSessionPage sessionId={sessionId} />;
};

export default EditSession;
