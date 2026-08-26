// components/feature/auth/LeftStats.tsx

interface LeftStatsProps {
  stats: {
    value: string;
    label: string;
  }[];
}

const LeftStats = ({ stats }: LeftStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-10">
      {stats.map((item) => (
        <div key={item.label}>
          <h3 className="text-3xl font-bold text-white">{item.value}</h3>

          <p className="mt-1 text-sm text-white/70">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default LeftStats;
