export type UserRole = "PATIENT" | "DOCTOR";

export type UserApproval = "ALL" | "APPROVED" | "PENDING";

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string | null;
  gender: "MALE" | "FEMALE" | null;
  role: UserRole;
  approval: boolean;
  image: string | null;
  createdAt: string;
}

export interface GetUsersFilters {
  search?: string;
  role?: UserRole | "ALL";
  approval?: UserApproval;
}
