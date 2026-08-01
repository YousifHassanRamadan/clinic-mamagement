import { exploreLinks } from "@/constants/home/home";
import Link from "next/link";

const FooterLinks = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Explore</h3>

      <nav className="mt-6 flex flex-col gap-4">
        {exploreLinks.map((link) => (
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
