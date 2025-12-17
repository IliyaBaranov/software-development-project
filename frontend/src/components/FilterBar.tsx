import { useState, useEffect, useRef } from "react";
import { SlidersHorizontal, ChevronDown, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export interface FilterState {
  spaceTypes: string[];
  priceRange: [number, number];
  amenities: string[];
}

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
  totalResults?: number;
}

const spaceTypeOptions = [
  { value: "salon-chair", label: "Salon Chair" },
  { value: "private-room", label: "Private Room" },
  { value: "full-studio", label: "Full Studio" },
];

const amenityOptions = [
  { value: "wifi", label: "High-speed WiFi" },
  { value: "parking", label: "Free Parking" },
  { value: "equipment", label: "Equipment Included" },
  { value: "24-7", label: "24/7 Access" },
  { value: "climate", label: "Climate Control" },
  { value: "storage", label: "Storage Space" },
  { value: "reception", label: "Reception Area" },
  { value: "natural-light", label: "Natural Lighting" },
];

const FilterBar = ({ onFilterChange, totalResults = 24 }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    spaceTypes: [],
    priceRange: [0, 200],
    amenities: [],
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const toggleSpaceType = (value: string) => {
    const newTypes = filters.spaceTypes.includes(value)
      ? filters.spaceTypes.filter((t) => t !== value)
      : [...filters.spaceTypes, value];
    updateFilters({ spaceTypes: newTypes });
  };

  const toggleAmenity = (value: string) => {
    const newAmenities = filters.amenities.includes(value)
      ? filters.amenities.filter((a) => a !== value)
      : [...filters.amenities, value];
    updateFilters({ amenities: newAmenities });
  };

  const clearFilters = () => {
    const cleared = { spaceTypes: [], priceRange: [0, 200] as [number, number], amenities: [] };
    setFilters(cleared);
    onFilterChange?.(cleared);
  };

  const hasActiveFilters =
    filters.spaceTypes.length > 0 ||
    filters.amenities.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 200;

  const activeFilterCount =
    filters.spaceTypes.length +
    filters.amenities.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 200 ? 1 : 0);

  return (
    <div className="flex flex-wrap items-center gap-3 py-4" ref={dropdownRef}>
      {/* All Filters Button */}
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setActiveDropdown(activeDropdown === "all" ? null : "all")}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>

        {activeDropdown === "all" && (
          <div className="absolute top-full left-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">All Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Space Types */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-foreground mb-3">Space Type</h4>
              <div className="space-y-2">
                {spaceTypeOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <Checkbox
                      checked={filters.spaceTypes.includes(option.value)}
                      onCheckedChange={() => toggleSpaceType(option.value)}
                    />
                    <span className="text-sm text-foreground">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-foreground mb-3">Price Range</h4>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) =>
                  updateFilters({ priceRange: value as [number, number] })
                }
                max={200}
                min={0}
                step={5}
                className="mb-3"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${filters.priceRange[0]}/hr</span>
                <span>${filters.priceRange[1]}/hr</span>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Amenities</h4>
              <div className="grid grid-cols-2 gap-2">
                {amenityOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={filters.amenities.includes(option.value)}
                      onCheckedChange={() => toggleAmenity(option.value)}
                    />
                    <span className="text-xs text-foreground">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Space Type Quick Filter */}
      <div className="relative">
        <Button
          variant={filters.spaceTypes.length > 0 ? "default" : "outline"}
          size="sm"
          className="gap-1"
          onClick={() => setActiveDropdown(activeDropdown === "type" ? null : "type")}
        >
          Space Type
          {filters.spaceTypes.length > 0 && (
            <span className="ml-1">({filters.spaceTypes.length})</span>
          )}
          <ChevronDown className="w-4 h-4" />
        </Button>

        {activeDropdown === "type" && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg z-50 p-2">
            {spaceTypeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => toggleSpaceType(option.value)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-left"
              >
                <span className="text-sm text-foreground">{option.label}</span>
                {filters.spaceTypes.includes(option.value) && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Quick Filter */}
      <div className="relative">
        <Button
          variant={filters.priceRange[0] > 0 || filters.priceRange[1] < 200 ? "default" : "outline"}
          size="sm"
          className="gap-1"
          onClick={() => setActiveDropdown(activeDropdown === "price" ? null : "price")}
        >
          ${filters.priceRange[0]} - ${filters.priceRange[1]}/hr
          <ChevronDown className="w-4 h-4" />
        </Button>

        {activeDropdown === "price" && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-lg z-50 p-4">
            <h4 className="text-sm font-medium text-foreground mb-4">Price per hour</h4>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) =>
                updateFilters({ priceRange: value as [number, number] })
              }
              max={200}
              min={0}
              step={5}
              className="mb-3"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Min</span>
                <div className="px-3 py-1.5 border border-border rounded-lg text-sm">
                  ${filters.priceRange[0]}
                </div>
              </div>
              <div className="w-4 h-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Max</span>
                <div className="px-3 py-1.5 border border-border rounded-lg text-sm">
                  ${filters.priceRange[1]}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Amenities Quick Filter */}
      <div className="relative">
        <Button
          variant={filters.amenities.length > 0 ? "default" : "outline"}
          size="sm"
          className="gap-1"
          onClick={() => setActiveDropdown(activeDropdown === "amenities" ? null : "amenities")}
        >
          Amenities
          {filters.amenities.length > 0 && (
            <span className="ml-1">({filters.amenities.length})</span>
          )}
          <ChevronDown className="w-4 h-4" />
        </Button>

        {activeDropdown === "amenities" && (
          <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg z-50 p-2 max-h-64 overflow-auto">
            {amenityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => toggleAmenity(option.value)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-left"
              >
                <span className="text-sm text-foreground">{option.label}</span>
                {filters.amenities.includes(option.value) && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="gap-1 text-muted-foreground"
        >
          <X className="w-4 h-4" />
          Clear
        </Button>
      )}

      {/* Results Count */}
      <div className="ml-auto text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{totalResults}</span> spaces available
      </div>
    </div>
  );
};

export default FilterBar;
