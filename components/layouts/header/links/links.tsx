"use client";

import { links } from "@/constants/home/home";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LinksSection = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm text-muted-foreground font-semibold hover:text-primary transition-colors",
            pathname === link.href && "text-primary",
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default LinksSection;
