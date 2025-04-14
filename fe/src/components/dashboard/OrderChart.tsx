
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", ordered: 40, delivered: 24 },
  { name: "Feb", ordered: 30, delivered: 50 },
  { name: "Mar", ordered: 50, delivered: 40 },
  { name: "Apr", ordered: 80, delivered: 60 },
  { name: "May", ordered: 40, delivered: 100 },
];

export function OrderChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorOrdered" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#fcd34d" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#93c5fd" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="ordered"
              name="Ordered"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#colorOrdered)"
            />
            <Area
              type="monotone"
              dataKey="delivered"
              name="Delivered"
              stroke="#60a5fa"
              fillOpacity={1}
              fill="url(#colorDelivered)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
