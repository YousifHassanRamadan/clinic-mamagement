// components/feature/layout/footer/footer-bottom/footer-bottom.tsx

import Link from "next/link";

interface Props {
  translations: {
    copyright: string;
    privacyPolicy: string;
    terms: string;
    accessibility: string;
  };
}

const FooterBottom = ({ translations }: Props) => {
  return (
    <div className="mt-3 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">
      <p>{translations.copyright}</p>

      <div className="flex gap-6">
        <Link href="/privacy-policy" className="hover:text-primary">
          {translations.privacyPolicy}
        </Link>

        <Link href="/terms" className="hover:text-primary">
          {translations.terms}
        </Link>

        <Link href="/accessibility" className="hover:text-primary">
          {translations.accessibility}
        </Link>
      </div>
    </div>
  );
};

export default FooterBottom;
