interface Props {
  value: number;
}

const ProgressBar = ({ value }: Props) => {
  return (
    <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
