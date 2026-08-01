import { contactInfo } from "@/constants/home/home";

const FooterContact = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Clinic</h3>

      <div className="mt-6 space-y-5">
        {contactInfo.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.text} className="flex items-start gap-3">
              <Icon className="mt-1 h-5 w-5 text-primary" />

              <p className="leading-7 text-muted-foreground">{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FooterContact;
