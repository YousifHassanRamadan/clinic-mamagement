// components/feature/layout/footer/footer-contact/footer-contact.tsx

import { contactInfo } from "@/constants/home/home";

interface Props {
  title: string;
}

const FooterContact = ({ title }: Props) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>

      <div className="mt-6 space-y-5">
        {contactInfo.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.text} className="flex items-start gap-3">
              <Icon className="mt-1 h-5 w-5 text-primary" />

              <p dir="ltr" className="leading-7 text-muted-foreground">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FooterContact;
