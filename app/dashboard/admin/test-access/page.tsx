import { getTestAccessUsers } from "@/app/actions/admin-actions/test-approval/test-access";
import TestAccessManager from "@/components/feature/dashboard/admin/test/test-access-manager";

const TestAccessPage = async () => {
  const usersResult = await getTestAccessUsers();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
      <TestAccessManager users={usersResult.data} tests={[]} />
    </div>
  );
};

export default TestAccessPage;
