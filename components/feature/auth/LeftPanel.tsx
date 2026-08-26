// components/feature/auth/LeftPanel.tsx

import Link from "next/link";
import { Brain } from "lucide-react";

import LeftStats from "./LeftStats";
import Testimonial from "./Testimonial";

interface LeftPanelProps {
  brand: string;

  testimonial: {
    quote: string;
    author: string;
    subtitle: string;
  };

  stats: {
    value: string;
    label: string;
  }[];
}

const LeftPanel = ({ brand, testimonial, stats }: LeftPanelProps) => {
  return (
    <section className="relative flex h-full min-h-screen flex-col justify-between overflow-hidden bg-gradient-to-br from-primary to-primary/90 p-10 xl:p-14">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />

      <div className="relative z-10">
        <Link href="/" className="inline-flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur">
            <Brain className="h-5 w-5" />
          </div>

          <span className="text-xl font-semibold">{brand}</span>
        </Link>
      </div>

      <div className="relative z-10">
        <Testimonial {...testimonial} />
      </div>

      <div className="relative z-10">
        <LeftStats stats={stats} />
      </div>
    </section>
  );
};

export default LeftPanel;
