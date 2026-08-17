import SidebarItem from "./SidebarItem";
import { SidebarGroupType } from "./types";

interface Props {
  group: SidebarGroupType;
}

const SidebarGroup = ({ group }: Props) => {
  return (
    <div className="space-y-2">
      {group.title && (
        <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {group.title}
        </h3>
      )}

      {group.items.map((item) => (
        <SidebarItem key={item.href} item={item} />
      ))}
    </div>
  );
};

export default SidebarGroup;
