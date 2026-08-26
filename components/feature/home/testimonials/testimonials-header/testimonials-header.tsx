// components/feature/home/testimonials/testimonials-header/testimonials-header.tsx

interface Props {
  title: string;
}

const TestimonialsHeader = ({ title }: Props) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  );
};

export default TestimonialsHeader;
