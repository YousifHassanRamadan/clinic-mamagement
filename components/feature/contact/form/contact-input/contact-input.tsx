import { Input } from "@/components/ui/input";

interface Props {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}

const ContactInput = ({
  label,
  placeholder,
  required,
  type = "text",
}: Props) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label}

        {required && <span className="text-destructive"> *</span>}
      </label>

      <Input
        type={type}
        placeholder={placeholder}
        className="h-11 rounded-xl p-3"
      />
    </div>
  );
};

export default ContactInput;
