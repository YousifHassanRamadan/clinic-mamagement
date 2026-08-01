const FAQHeader = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Frequently asked</h2>

      <p className="text-lg text-muted-foreground leading-8">
        Still unsure?{" "}
        <span className="font-medium text-primary cursor-pointer hover:underline">
          Send a message
        </span>{" "}
        and we'll reply within one working day.
      </p>
    </div>
  );
};

export default FAQHeader;
