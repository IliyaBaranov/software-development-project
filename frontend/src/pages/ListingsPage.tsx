import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import FilterBar, { FilterState } from "@/components/FilterBar";
import WorkspaceCard from "@/components/WorkspaceCard";

const allSpaces = [
  {
    id: "1",
    title: "Luxury Salon Suite Downtown",
    location: "Manhattan, NY",
    price: 45,
    rating: 4.9,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
    type: "Private Room",
    typeSlug: "private-room",
    amenities: ["wifi", "parking", "climate", "storage"],
  },
  {
    id: "2",
    title: "Modern Beauty Studio",
    location: "Brooklyn, NY",
    price: 35,
    rating: 4.8,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    type: "Full Studio",
    typeSlug: "full-studio",
    amenities: ["wifi", "equipment", "24-7", "natural-light"],
  },
  {
    id: "3",
    title: "Cozy Salon Chair Space",
    location: "Queens, NY",
    price: 25,
    rating: 4.7,
    reviewCount: 64,
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800",
    type: "Salon Chair",
    typeSlug: "salon-chair",
    amenities: ["wifi", "climate"],
  },
  {
    id: "4",
    title: "Premium Wellness Center",
    location: "Jersey City, NJ",
    price: 55,
    rating: 4.9,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800",
    type: "Full Studio",
    typeSlug: "full-studio",
    amenities: ["wifi", "parking", "equipment", "reception", "climate", "storage"],
  },
  {
    id: "5",
    title: "Elegant Hair Studio",
    location: "Hoboken, NJ",
    price: 40,
    rating: 4.6,
    reviewCount: 72,
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800",
    type: "Private Room",
    typeSlug: "private-room",
    amenities: ["wifi", "parking", "natural-light"],
  },
  {
    id: "6",
    title: "Trendy Nail Art Space",
    location: "Manhattan, NY",
    price: 30,
    rating: 4.8,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800",
    type: "Salon Chair",
    typeSlug: "salon-chair",
    amenities: ["wifi", "equipment", "climate"],
  },
  {
    id: "7",
    title: "Spa Treatment Room",
    location: "Brooklyn, NY",
    price: 50,
    rating: 4.9,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    type: "Private Room",
    typeSlug: "private-room",
    amenities: ["wifi", "parking", "24-7", "climate", "storage"],
  },
  {
    id: "8",
    title: "Boutique Beauty Space",
    location: "Queens, NY",
    price: 38,
    rating: 4.7,
    reviewCount: 58,
    image: "https://images.unsplash.com/photo-1629397685944-7073f5589754?w=800",
    type: "Full Studio",
    typeSlug: "full-studio",
    amenities: ["wifi", "equipment", "natural-light", "reception"],
  },
  {
    id: "9",
    title: "Classic Barber Station",
    location: "Manhattan, NY",
    price: 28,
    rating: 4.5,
    reviewCount: 43,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800",
    type: "Salon Chair",
    typeSlug: "salon-chair",
    amenities: ["wifi", "parking"],
  },
  {
    id: "10",
    title: "Luxury Lash Studio",
    location: "Jersey City, NJ",
    price: 65,
    rating: 5.0,
    reviewCount: 87,
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800",
    type: "Private Room",
    typeSlug: "private-room",
    amenities: ["wifi", "parking", "equipment", "24-7", "climate", "natural-light"],
  },
];

const ListingsPage = () => {
  const [searchFilters, setSearchFilters] = useState({ location: "", date: "" });
  const [filters, setFilters] = useState<FilterState>({
    spaceTypes: [],
    priceRange: [0, 200],
    amenities: [],
  });

  const filteredSpaces = useMemo(() => {
    return allSpaces.filter((space) => {
      // Location filter
      if (searchFilters.location) {
        const searchLower = searchFilters.location.toLowerCase();
        if (!space.location.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Space type filter
      if (filters.spaceTypes.length > 0) {
        if (!filters.spaceTypes.includes(space.typeSlug)) {
          return false;
        }
      }

      // Price range filter
      if (space.price < filters.priceRange[0] || space.price > filters.priceRange[1]) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) =>
          space.amenities.includes(amenity)
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });
  }, [searchFilters, filters]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container-max section-padding py-8">
        {/* Search Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Space</h1>
          <p className="text-muted-foreground">Discover beauty workspaces available for rent</p>
        </div>

        <SearchBar
          variant="compact"
          className="mb-4"
          onSearch={(newFilters) => setSearchFilters(newFilters)}
        />
        <FilterBar
          onFilterChange={setFilters}
          totalResults={filteredSpaces.length}
        />

        {/* Listings Grid */}
        {filteredSpaces.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {filteredSpaces.map((space) => (
              <WorkspaceCard
                key={space.id}
                id={space.id}
                title={space.title}
                location={space.location}
                price={space.price}
                rating={space.rating}
                reviewCount={space.reviewCount}
                image={space.image}
                type={space.type}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No spaces found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search criteria
            </p>
            <button
              onClick={() => {
                setSearchFilters({ location: "", date: "" });
                setFilters({ spaceTypes: [], priceRange: [0, 200], amenities: [] });
              }}
              className="text-primary font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Load More */}
        {filteredSpaces.length > 0 && filteredSpaces.length >= 8 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors">
              Load More Spaces
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ListingsPage;
