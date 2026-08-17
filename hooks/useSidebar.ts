"use client";

import { useState } from "react";

const useSidebar = () => {
  const [open, setOpen] = useState(false);

  return {
    open,
    setOpen,
    toggle: () => setOpen((prev) => !prev),
  };
};

export default useSidebar;
