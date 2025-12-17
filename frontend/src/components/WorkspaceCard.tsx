import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { useState } from "react";

interface WorkspaceCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  type: string;
}

const WorkspaceCard = ({
  id,
  title,
  location,
  price,
  rating,
  reviewCount,
  image,
  type,
}: WorkspaceCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Link to={`/listing/${id}`} className="group">
      <div className="bg-card rounded-xl overflow-hidden card-hover border border-border">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-md text-xs font-medium">
            {type}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">({reviewCount})</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold text-foreground">${price}</span>
            <span className="text-sm text-muted-foreground">/ hour</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkspaceCard;
