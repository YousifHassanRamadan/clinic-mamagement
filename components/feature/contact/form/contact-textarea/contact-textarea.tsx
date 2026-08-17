import { Textarea } from "@/components/ui/textarea";

const ContactTextarea = () => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Message
        <span className="text-destructive"> *</span>
      </label>

      <Textarea
        placeholder="Tell us briefly what you're looking for..."
        className="min-h-36 resize-none rounded-xl p-3"
      />
    </div>
  );
};

export default ContactTextarea;
