interface Props {
  title: string;
  description: string;
  sendMessage: string;
}

const FAQHeader = ({ title, description, sendMessage }: Props) => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>

      <p className="text-lg leading-8 text-muted-foreground">
        {description}{" "}
        <span className="cursor-pointer font-medium text-primary hover:underline">
          {sendMessage}
        </span>
      </p>
    </div>
  );
};

export default FAQHeader;
