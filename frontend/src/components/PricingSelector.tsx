import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingSelectorProps {
  hourlyRate: number;
  dailyRate?: number;
  monthlyRate?: number;
}

const PricingSelector = ({ hourlyRate, dailyRate, monthlyRate }: PricingSelectorProps) => {
  const [selectedDuration, setSelectedDuration] = useState<"hourly" | "daily" | "monthly">("hourly");
  const [hours, setHours] = useState(1);

  const durations = [
    { key: "hourly" as const, label: "Hourly", rate: hourlyRate },
    { key: "daily" as const, label: "Daily", rate: dailyRate },
    { key: "monthly" as const, label: "Monthly", rate: monthlyRate },
  ].filter((d) => d.rate);

  const currentRate = durations.find((d) => d.key === selectedDuration)?.rate || hourlyRate;
  const total = selectedDuration === "hourly" ? currentRate * hours : currentRate;

  return (
    <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-3xl font-bold text-foreground">${currentRate}</span>
        <span className="text-muted-foreground">
          / {selectedDuration === "hourly" ? "hour" : selectedDuration === "daily" ? "day" : "month"}
        </span>
      </div>

      {/* Duration Selector */}
      <div className="flex gap-2 mb-6">
        {durations.map((duration) => (
          <button
            key={duration.key}
            onClick={() => setSelectedDuration(duration.key)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              selectedDuration === duration.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {duration.label}
          </button>
        ))}
      </div>

      {/* Date/Time Selection */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Date</p>
            <input
              type="date"
              className="text-sm bg-transparent border-none outline-none w-full text-foreground"
            />
          </div>
        </div>

        {selectedDuration === "hourly" && (
          <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Duration</p>
              <select
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="text-sm bg-transparent border-none outline-none w-full text-foreground"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((h) => (
                  <option key={h} value={h}>
                    {h} hour{h > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between py-4 border-t border-border mb-4">
        <span className="font-medium text-foreground">Total</span>
        <span className="text-xl font-bold text-foreground">${total}</span>
      </div>

      <Button size="lg" className="w-full">
        Reserve Now
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-4">
        You won't be charged yet
      </p>
    </div>
  );
};

export default PricingSelector;
