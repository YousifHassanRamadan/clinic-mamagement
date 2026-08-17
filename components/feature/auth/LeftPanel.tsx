import Link from "next/link";
import { Brain } from "lucide-react";

import LeftStats from "./LeftStats";
import Testimonial from "./Testimonial";

const LeftPanel = () => {
  return (
    <section className="relative flex h-full min-h-screen flex-col justify-between overflow-hidden bg-gradient-to-br from-primary to-primary/90 p-10 xl:p-14">
      {/* Grid Background */}
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

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10">
        <Link href="/" className="inline-flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur">
            <Brain className="h-5 w-5" />
          </div>

          <span className="text-xl font-semibold">Serene Mind</span>
        </Link>
      </div>

      <div className="relative z-10">
        <Testimonial />
      </div>

      <div className="relative z-10">
        <LeftStats />
      </div>
    </section>
  );
};

export default LeftPanel;
