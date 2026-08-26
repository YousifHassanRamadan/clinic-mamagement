// components/feature/home/why-choose-us/why-choose-us-header/why-choose-us-header.tsx

interface WhyChooseUsHeaderProps {
  translations: {
    eyebrow: string;
    title: string;
    description: string;
  };
}

const WhyChooseUsHeader = ({ translations }: WhyChooseUsHeaderProps) => {
  return (
    <div className="max-w-xl">
      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
        {translations.eyebrow}
      </span>

      <h2 className="mt-4 text-4xl font-bold leading-tight">
        {translations.title}
      </h2>

      <p className="mt-6 leading-5 text-muted-foreground">
        {translations.description}
      </p>
    </div>
  );
};

export default WhyChooseUsHeader;
