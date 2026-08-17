"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-lg">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        placeholder="Search patients, appointments..."
        className="h-11 rounded-full pl-11"
      />
    </div>
  );
};

export default SearchBar;
