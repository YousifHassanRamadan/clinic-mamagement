import { getUsers } from "@/app/actions/admin-actions/user/get-users";
import UsersPage from "@/components/feature/dashboard/admin/users/UsersPage";

const Users = async () => {
  const users = await getUsers();

  return (
    <div className="p-4 sm:p-6">
      <UsersPage initialUsers={users} />
    </div>
  );
};

export default Users;
