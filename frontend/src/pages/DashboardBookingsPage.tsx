import { useState } from "react";
import { Calendar, Clock, MapPin, MoreHorizontal, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";

type BookingStatus = "upcoming" | "completed" | "cancelled";

const bookingsData = [
  {
    id: "1",
    space: "Luxury Salon Suite Downtown",
    location: "Manhattan, NY",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    date: "Dec 20, 2024",
    time: "10:00 AM - 2:00 PM",
    duration: "4 hours",
    amount: "$180",
    status: "upcoming" as BookingStatus,
    host: "Sarah Johnson",
  },
  {
    id: "2",
    space: "Modern Beauty Studio",
    location: "Brooklyn, NY",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
    date: "Dec 18, 2024",
    time: "9:00 AM - 1:00 PM",
    duration: "4 hours",
    amount: "$140",
    status: "upcoming" as BookingStatus,
    host: "Mike Chen",
  },
  {
    id: "3",
    space: "Cozy Salon Chair Space",
    location: "Queens, NY",
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400",
    date: "Dec 14, 2024",
    time: "2:00 PM - 5:00 PM",
    duration: "3 hours",
    amount: "$75",
    status: "completed" as BookingStatus,
    host: "Lisa Park",
  },
  {
    id: "4",
    space: "Premium Wellness Center",
    location: "Jersey City, NJ",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=400",
    date: "Dec 10, 2024",
    time: "11:00 AM - 3:00 PM",
    duration: "4 hours",
    amount: "$220",
    status: "completed" as BookingStatus,
    host: "Emma Wilson",
  },
  {
    id: "5",
    space: "Elegant Hair Studio",
    location: "Hoboken, NJ",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400",
    date: "Dec 8, 2024",
    time: "10:00 AM - 12:00 PM",
    duration: "2 hours",
    amount: "$80",
    status: "cancelled" as BookingStatus,
    host: "David Kim",
  },
];

const DashboardBookingsPage = () => {
  const [activeTab, setActiveTab] = useState<"all" | BookingStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = bookingsData.filter((booking) => {
    const matchesTab = activeTab === "all" || booking.status === activeTab;
    const matchesSearch =
      booking.space.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabs = [
    { key: "all" as const, label: "All Bookings", count: bookingsData.length },
    { key: "upcoming" as const, label: "Upcoming", count: bookingsData.filter((b) => b.status === "upcoming").length },
    { key: "completed" as const, label: "Completed", count: bookingsData.filter((b) => b.status === "completed").length },
    { key: "cancelled" as const, label: "Cancelled", count: bookingsData.filter((b) => b.status === "cancelled").length },
  ];

  const getStatusStyles = (status: BookingStatus) => {
    switch (status) {
      case "upcoming":
        return "bg-violet-100 text-primary";
      case "completed":
        return "bg-green-100 text-success";
      case "cancelled":
        return "bg-red-100 text-destructive";
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage and track all your workspace bookings</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {tab.label}
              <span className="ml-2 px-1.5 py-0.5 rounded-full text-xs bg-background/20">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-card rounded-xl border border-border p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <div className="w-full sm:w-32 h-24 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={booking.image}
                      alt={booking.space}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground truncate">{booking.space}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {booking.location}
                        </p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${getStatusStyles(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {booking.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {booking.time}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Host: {booking.host}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-foreground">{booking.amount}</span>
                        {booking.status === "upcoming" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Reschedule</Button>
                            <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                              Cancel
                            </Button>
                          </div>
                        )}
                        {booking.status === "completed" && (
                          <Button size="sm">Book Again</Button>
                        )}
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No bookings found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try adjusting your search" : "You haven't made any bookings yet"}
              </p>
              <Button>Browse Spaces</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardBookingsPage;
