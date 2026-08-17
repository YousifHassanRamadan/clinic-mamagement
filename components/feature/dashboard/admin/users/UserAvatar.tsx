import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  firstName: string;
  lastName: string;
  image: string | null;
}

const UserAvatar = ({ firstName, lastName, image }: Props) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src={image ?? undefined} alt={`${firstName} ${lastName}`} />

      <AvatarFallback className="bg-primary/10 font-medium text-primary">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
