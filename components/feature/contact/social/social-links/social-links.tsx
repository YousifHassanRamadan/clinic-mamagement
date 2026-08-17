import { Card } from "@/components/ui/card";
import { socialLinks } from "@/constants/home/home";
import SocialButton from "../social-button/social-button";

const SocialLinks = () => {
  return (
    <Card className="rounded-3xl p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Follow the clinic</h2>

      <div className="space-y-4">
        {socialLinks.map((social) => (
          <SocialButton key={social.title} {...social} />
        ))}
      </div>
    </Card>
  );
};

export default SocialLinks;
