"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();

  const paths = pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {paths.map((path, index) => {
        const href = "/" + paths.slice(0, index + 1).join("/");

        return (
          <div key={href} className="flex items-center gap-2">
            {index !== 0 && <ChevronRight className="h-4 w-4" />}

            <Link
              href={href}
              className="capitalize transition hover:text-foreground"
            >
              {path.replace("-", " ")}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
