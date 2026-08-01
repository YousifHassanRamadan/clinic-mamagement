import { Container } from "@/components/common/container/Container";
import Footer from "@/components/layouts/footer/footer";
import Header from "@/components/layouts/header/header";
import type { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Header */}

      <Header />

      <main>{children}</main>

      {/* Footer */}

      <Footer />
    </>
  );
}
