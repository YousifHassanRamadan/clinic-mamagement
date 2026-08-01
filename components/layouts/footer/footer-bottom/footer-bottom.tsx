import Link from "next/link";

const FooterBottom = () => {
  return (
    <div className="flex flex-col items-center justify-between mt-3 gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">
      <p>© 2026 Serene Mind Clinic. All rights reserved.</p>

      <div className="flex gap-6">
        <Link href="/privacy-policy" className="hover:text-primary">
          Privacy Policy
        </Link>

        <Link href="/terms" className="hover:text-primary">
          Terms
        </Link>

        <Link href="/accessibility" className="hover:text-primary">
          Accessibility
        </Link>
      </div>
    </div>
  );
};

export default FooterBottom;
