import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  variant?: "hero" | "compact";
  className?: string;
  onSearch?: (filters: { location: string; date: string }) => void;
}

const popularLocations = [
  { city: "Manhattan, NY", state: "New York" },
  { city: "Brooklyn, NY", state: "New York" },
  { city: "Queens, NY", state: "New York" },
  { city: "Jersey City, NJ", state: "New Jersey" },
  { city: "Hoboken, NJ", state: "New Jersey" },
  { city: "Los Angeles, CA", state: "California" },
  { city: "Miami, FL", state: "Florida" },
  { city: "Chicago, IL", state: "Illinois" },
];

const SearchBar = ({ variant = "hero", className = "", onSearch }: SearchBarProps) => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(popularLocations);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (location.trim()) {
      const filtered = popularLocations.filter(
        (loc) =>
          loc.city.toLowerCase().includes(location.toLowerCase()) ||
          loc.state.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredLocations(filtered.length > 0 ? filtered : popularLocations);
    } else {
      setFilteredLocations(popularLocations);
    }
  }, [location]);

  const handleLocationSelect = (city: string) => {
    setLocation(city);
    setShowLocationDropdown(false);
  };

  const handleSearch = () => {
    onSearch?.({ location, date });
  };

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="relative flex-1" ref={locationRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setShowLocationDropdown(true)}
            placeholder="Search by location..."
            className="input-field pl-10 py-2"
          />
          {location && (
            <button
              onClick={() => setLocation("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {showLocationDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-auto">
              <div className="p-2">
                <p className="text-xs font-medium text-muted-foreground px-2 py-1">
                  {location ? "Matching locations" : "Popular locations"}
                </p>
                {filteredLocations.map((loc) => (
                  <button
                    key={loc.city}
                    onClick={() => handleLocationSelect(loc.city)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary transition-colors text-left"
                  >
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{loc.city}</p>
                      <p className="text-xs text-muted-foreground">{loc.state}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <Button size="sm" onClick={handleSearch}>Search</Button>
      </div>
    );
  }

  return (
    <div className={`bg-card rounded-2xl shadow-lg border border-border p-2 ${className}`}>
      <div className="flex flex-col md:flex-row gap-2">
        {/* Location with Autocomplete */}
        <div className="flex-1 relative" ref={locationRef}>
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer"
            onClick={() => setShowLocationDropdown(true)}
          >
            <MapPin className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground">Location</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setShowLocationDropdown(true)}
                placeholder="Where do you need space?"
                className="text-sm bg-transparent border-none outline-none w-full text-foreground placeholder:text-muted-foreground"
              />
            </div>
            {location && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLocation("");
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {showLocationDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 max-h-72 overflow-auto">
              <div className="p-2">
                <p className="text-xs font-medium text-muted-foreground px-3 py-2">
                  {location ? "Matching locations" : "Popular locations"}
                </p>
                {filteredLocations.map((loc) => (
                  <button
                    key={loc.city}
                    onClick={() => handleLocationSelect(loc.city)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary transition-colors text-left"
                  >
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{loc.city}</p>
                      <p className="text-xs text-muted-foreground">{loc.state}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:block w-px bg-border" />

        {/* Date */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer">
          <Calendar className="w-5 h-5 text-primary" />
          <div className="flex-1">
            <p className="text-xs font-medium text-muted-foreground">When</p>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-sm bg-transparent border-none outline-none w-full text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Search Button */}
        <Button size="lg" className="rounded-xl px-8" onClick={handleSearch}>
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
