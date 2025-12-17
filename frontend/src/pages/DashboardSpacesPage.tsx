import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, MoreHorizontal, Star, MapPin, Eye, Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";

const mySpaces = [
  {
    id: "1",
    title: "Luxury Salon Suite Downtown",
    location: "Manhattan, NY",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    price: 45,
    rating: 4.9,
    reviewCount: 128,
    bookings: 24,
    revenue: "$3,240",
    status: "active",
    type: "Private Room",
  },
  {
    id: "2",
    title: "Modern Beauty Studio",
    location: "Brooklyn, NY",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
    price: 35,
    rating: 4.8,
    reviewCount: 89,
    bookings: 18,
    revenue: "$2,100",
    status: "active",
    type: "Full Studio",
  },
  {
    id: "3",
    title: "Cozy Salon Chair Space",
    location: "Queens, NY",
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400",
    price: 25,
    rating: 4.7,
    reviewCount: 64,
    bookings: 12,
    revenue: "$890",
    status: "paused",
    type: "Salon Chair",
  },
];

const DashboardSpacesPage = () => {
  const [spaces, setSpaces] = useState(mySpaces);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleStatus = (id: string) => {
    setSpaces(spaces.map((space) =>
      space.id === id
        ? { ...space, status: space.status === "active" ? "paused" : "active" }
        : space
    ));
  };

  const totalRevenue = spaces.reduce((sum, space) => {
    const amount = parseFloat(space.revenue.replace(/[$,]/g, ""));
    return sum + amount;
  }, 0);

  const totalBookings = spaces.reduce((sum, space) => sum + space.bookings, 0);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">My Spaces</h1>
            <p className="text-muted-foreground">Manage your listed workspaces</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Space
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground mb-1">Total Spaces</p>
            <p className="text-2xl font-bold text-foreground">{spaces.length}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
            <p className="text-2xl font-bold text-foreground">{totalBookings}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Spaces Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <div
              key={space.id}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative aspect-[16/10]">
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium ${
                  space.status === "active"
                    ? "bg-green-100 text-success"
                    : "bg-yellow-100 text-warning"
                }`}>
                  {space.status === "active" ? "Active" : "Paused"}
                </span>
                <span className="absolute top-3 right-3 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-md text-xs font-medium">
                  {space.type}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground line-clamp-1">{space.title}</h3>
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === space.id ? null : space.id)}
                      className="p-1 hover:bg-secondary rounded transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                    {activeMenu === space.id && (
                      <div className="absolute right-0 top-full mt-1 w-40 bg-card border border-border rounded-lg shadow-lg z-10 py-1">
                        <Link
                          to={`/listing/${space.id}`}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View Listing
                        </Link>
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                          <Edit className="w-4 h-4" />
                          Edit Space
                        </button>
                        <button
                          onClick={() => toggleStatus(space.id)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                        >
                          {space.status === "active" ? (
                            <>
                              <ToggleLeft className="w-4 h-4" />
                              Pause Listing
                            </>
                          ) : (
                            <>
                              <ToggleRight className="w-4 h-4" />
                              Activate Listing
                            </>
                          )}
                        </button>
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-secondary transition-colors">
                          <Trash2 className="w-4 h-4" />
                          Delete Space
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                  <MapPin className="w-3 h-3" />
                  {space.location}
                </p>

                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="font-medium">{space.rating}</span>
                    <span className="text-muted-foreground">({space.reviewCount})</span>
                  </div>
                  <span className="font-semibold text-foreground">${space.price}/hr</span>
                </div>

                <div className="pt-4 border-t border-border grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{space.bookings}</p>
                    <p className="text-xs text-muted-foreground">Bookings</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">{space.revenue}</p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Space Card */}
          <button className="bg-secondary/50 border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-secondary transition-colors min-h-[320px]">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <span className="font-medium text-foreground">Add New Space</span>
            <span className="text-sm text-muted-foreground text-center">
              List your beauty workspace and start earning
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default DashboardSpacesPage;
