
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  description?: string;
  iconColor?: string;
}

export function StatsCard({
  icon,
  label,
  value,
  description,
  iconColor = "text-blue-500",
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className={`mr-4 ${iconColor}`}>{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
