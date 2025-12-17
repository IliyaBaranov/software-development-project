import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Clock, Users, Wifi, Car, Check, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import ImageGallery from "@/components/ImageGallery";
import PricingSelector from "@/components/PricingSelector";

const spaceData = {
  id: "1",
  title: "Luxury Salon Suite Downtown",
  description: "Experience the ultimate in professional beauty workspace with this stunning salon suite located in the heart of downtown Manhattan. This fully-equipped space features modern décor, professional lighting, and all the amenities you need to serve your clients in style.",
  location: "123 Beauty Lane, Manhattan, NY 10001",
  rating: 4.9,
  reviewCount: 128,
  hourlyRate: 45,
  dailyRate: 280,
  monthlyRate: 4500,
  host: {
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    responseTime: "within an hour",
    joined: "March 2021",
  },
  images: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800",
    "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800",
  ],
  amenities: [
    { icon: Wifi, label: "High-speed WiFi" },
    { icon: Car, label: "Free parking" },
    { icon: Users, label: "Up to 3 clients" },
    { icon: Clock, label: "24/7 access" },
  ],
  features: [
    "Professional styling chair",
    "Shampoo station",
    "Full-length mirror",
    "Storage cabinets",
    "Climate control",
    "Natural lighting",
  ],
  reviews: [
    {
      id: "1",
      author: "Michelle R.",
      rating: 5,
      date: "November 2024",
      comment: "Absolutely beautiful space! Clean, professional, and my clients loved it. Will definitely book again.",
    },
    {
      id: "2",
      author: "David K.",
      rating: 5,
      date: "October 2024",
      comment: "Perfect for my hair styling business. The lighting is amazing and the location is convenient for clients.",
    },
  ],
};

const ListingDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container-max section-padding py-8">
        {/* Back Link */}
        <Link to="/listings" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to listings
        </Link>

        {/* Title Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{spaceData.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="font-medium">{spaceData.rating}</span>
                <span className="text-muted-foreground">({spaceData.reviewCount} reviews)</span>
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {spaceData.location}
              </span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery images={spaceData.images} />

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mt-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Host Info */}
            <div className="flex items-center gap-4 pb-8 border-b border-border">
              <img
                src={spaceData.host.image}
                alt={spaceData.host.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-foreground">Hosted by {spaceData.host.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Responds {spaceData.host.responseTime} • Joined {spaceData.host.joined}
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {spaceData.amenities.map((amenity) => (
                  <div key={amenity.label} className="flex items-center gap-3">
                    <amenity.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">About this space</h3>
              <p className="text-muted-foreground leading-relaxed">{spaceData.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">What's included</h3>
              <div className="grid grid-cols-2 gap-3">
                {spaceData.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 fill-warning text-warning" />
                <span className="text-xl font-semibold text-foreground">{spaceData.rating}</span>
                <span className="text-muted-foreground">• {spaceData.reviewCount} reviews</span>
              </div>
              <div className="space-y-6">
                {spaceData.reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-border last:border-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <span className="font-medium text-secondary-foreground">
                          {review.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{review.author}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Sidebar */}
          <div>
            <PricingSelector
              hourlyRate={spaceData.hourlyRate}
              dailyRate={spaceData.dailyRate}
              monthlyRate={spaceData.monthlyRate}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingDetailPage;
