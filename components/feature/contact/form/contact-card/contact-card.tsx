import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { contactFormFields } from "@/constants/home/home";
import { SendHorizontal } from "lucide-react";
import ContactInput from "../contact-input/contact-input";
import ContactTextarea from "../contact-textarea/contact-textarea";

const ContactCard = () => {
  return (
    <Card className="block rounded-3xl p-8 shadow-sm h-fit">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Send a message</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          All fields marked with * are required.
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          {contactFormFields.map((field) => (
            <ContactInput
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              type={field.type}
            />
          ))}
        </div>

        <ContactTextarea />

        <Button size="lg" className="rounded-xl px-8">
          <SendHorizontal className="mr-2 h-4 w-4" />
          Send message
        </Button>
      </form>
    </Card>
  );
};

export default ContactCard;
