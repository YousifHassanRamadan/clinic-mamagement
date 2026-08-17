interface Props {
  category: string;
}

const TestBadge = ({ category }: Props) => {
  return (
    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {category}
    </span>
  );
};

export default TestBadge;
