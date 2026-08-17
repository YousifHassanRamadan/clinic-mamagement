import MobileSidebar from "./MobileSidebar";
import UserMenu from "./UserMenu";

interface Props {
  role?: "PATIENT" | "DOCTOR" | "SECRETARY";
}

const Header = ({ role }: Props) => {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b bg-background/95 px-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-4">
        <MobileSidebar role={role} />
      </div>

      <div className="flex items-center gap-4">
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
