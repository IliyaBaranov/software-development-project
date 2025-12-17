import { Calendar, TrendingUp, DollarSign, Users } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";

const stats = [
  { label: "Total Bookings", value: "24", change: "+12%", icon: Calendar, trend: "up" },
  { label: "Revenue", value: "$3,240", change: "+8%", icon: DollarSign, trend: "up" },
  { label: "Active Spaces", value: "3", change: "0%", icon: TrendingUp, trend: "neutral" },
  { label: "Total Clients", value: "156", change: "+23%", icon: Users, trend: "up" },
];

const recentBookings = [
  { id: "1", space: "Luxury Salon Suite", client: "Michelle R.", date: "Dec 15, 2024", time: "10:00 AM - 2:00 PM", status: "confirmed", amount: "$180" },
  { id: "2", space: "Modern Beauty Studio", client: "David K.", date: "Dec 14, 2024", time: "2:00 PM - 6:00 PM", status: "completed", amount: "$140" },
  { id: "3", space: "Luxury Salon Suite", client: "Sarah M.", date: "Dec 13, 2024", time: "9:00 AM - 12:00 PM", status: "completed", amount: "$135" },
  { id: "4", space: "Cozy Chair Space", client: "James L.", date: "Dec 12, 2024", time: "1:00 PM - 4:00 PM", status: "cancelled", amount: "$75" },
];

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your business.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-success" : "text-muted-foreground"
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Recent Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Space</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Client</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Date & Time</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Status</th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-6 py-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-foreground">{booking.space}</span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{booking.client}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-foreground">{booking.date}</p>
                        <p className="text-sm text-muted-foreground">{booking.time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        booking.status === "confirmed"
                          ? "bg-violet-100 text-primary"
                          : booking.status === "completed"
                          ? "bg-green-100 text-success"
                          : "bg-red-100 text-destructive"
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-foreground">{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
