import SidebarItem from "./SidebarItem";
import { SidebarGroupType } from "./types";

interface Props {
  group: SidebarGroupType;
  onNavigate?: () => void;
}

const SidebarGroup = ({ group, onNavigate }: Props) => {
  return (
    <div className="space-y-2">
      {group.title && (
        <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {group.title}
        </h3>
      )}

      {group.items.map((item) => (
        <SidebarItem key={item.href} item={item} onNavigate={onNavigate} />
      ))}
    </div>
  );
};

export default SidebarGroup;
