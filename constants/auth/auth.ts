export const stats = [
  {
    value: "400+",
    label: "Clients",
  },
  {
    value: "14 yrs",
    label: "Practice",
  },
  {
    value: "4.9/5",
    label: "Rating",
  },
];

export const testimonial = {
  quote:
    "Therapy worked because the admin never got in the way. One portal, one therapist, one clear thread of progress.",
  author: "Marcus H.",
  subtitle: "Client since 2024",
};

export type RegisterFieldName =
  | "firstName"
  | "lastName"
  | "address"
  | "email"
  | "gender"
  | "phone"
  | "password"
  | "confirmPassword";

export type RegisterField = {
  name: RegisterFieldName;
  placeholder: string;
  type: "text" | "email" | "tel" | "password" | "select";
  options?: { label: string; value: string }[];
};
export const fields: RegisterField[] = [
  { name: "firstName", placeholder: "First Name", type: "text" },
  { name: "lastName", placeholder: "Last Name", type: "text" },
  { name: "address", placeholder: "Address", type: "text" },
  { name: "email", placeholder: "Email", type: "email" },
  {
    name: "gender",
    placeholder: "Gender",
    type: "select",
    options: [
      { label: "Male", value: "MALE" },
      { label: "Female", value: "FEMALE" },
    ],
  },
  { name: "phone", placeholder: "Phone Number", type: "tel" },
  { name: "password", placeholder: "Password", type: "password" },
  {
    name: "confirmPassword",
    placeholder: "Confirm Password",
    type: "password",
  },
];
