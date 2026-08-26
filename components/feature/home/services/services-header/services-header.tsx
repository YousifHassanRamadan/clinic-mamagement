// components/feature/home/services/services-header/services-header.tsx

interface ServicesHeaderProps {
  translations: {
    eyebrow: string;
    title: string;
    description: string;
  };
}

const ServicesHeader = ({ translations }: ServicesHeaderProps) => {
  return (
    <div className="max-w-3xl">
      <span className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
        {translations.eyebrow}
      </span>

      <h2 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">
        {translations.title}
      </h2>

      <p className="mt-3 text-md leading-5 text-muted-foreground">
        {translations.description}
      </p>
    </div>
  );
};

export default ServicesHeader;
