interface Props {
  title: string;
  subtitle: string;
}

const TestHeader = ({ title, subtitle }: Props) => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">{title}</h1>

      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default TestHeader;
