import { Card } from "@/components/ui/card";
import { clinicInfo } from "@/constants/home/home";
import InfoItem from "./info-item/info-item";

const ClinicInfo = () => {
  return (
    <Card className="rounded-3xl p-8 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold">Clinic information</h2>

      <div className="space-y-7">
        {clinicInfo.map((item) => (
          <InfoItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>
    </Card>
  );
};

export default ClinicInfo;
