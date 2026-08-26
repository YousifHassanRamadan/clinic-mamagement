// components/feature/layout/footer/footer-links/footer-links.tsx

import Link from "next/link";

interface Props {
  translations: {
    title: string;
    home: string;
    patientSignIn: string;
    createAccount: string;
  };
}

const FooterLinks = ({ translations }: Props) => {
  const links = [
    {
      title: translations.home,
      href: "/",
    },
    {
      title: translations.patientSignIn,
      href: "/login",
    },
    {
      title: translations.createAccount,
      href: "/login",
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold">{translations.title}</h3>

      <nav className="mt-6 flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default FooterLinks;
