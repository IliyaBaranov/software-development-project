import { Link } from "react-router-dom";
import { ArrowRight, Search, Calendar, CheckCircle, Sparkles, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import WorkspaceCard from "@/components/WorkspaceCard";

const featuredSpaces = [
  {
    id: "1",
    title: "Luxury Salon Suite Downtown",
    location: "Manhattan, NY",
    price: 45,
    rating: 4.9,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
    type: "Private Room",
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
  },
];

const howItWorks = [
  {
    icon: Search,
    title: "Search",
    description: "Browse our curated selection of professional beauty spaces in your area.",
  },
  {
    icon: Calendar,
    title: "Book",
    description: "Select your preferred dates and times, then reserve instantly.",
  },
  {
    icon: CheckCircle,
    title: "Create",
    description: "Arrive at your space and focus on what you do best—your craft.",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "Premium Spaces",
    description: "Hand-picked, professional-grade beauty workspaces.",
  },
  {
    icon: Shield,
    title: "Verified Hosts",
    description: "All hosts are verified for your peace of mind.",
  },
  {
    icon: Clock,
    title: "Flexible Booking",
    description: "Book by the hour, day, or month—whatever works for you.",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 to-background" />
        <div className="container-max section-padding relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Find Your Perfect
              <span className="text-primary"> Beauty Workspace</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Discover and book professional salon spaces, chairs, and studios. 
              Start your beauty business without the overhead.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              No long-term commitments
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              Instant booking
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              Verified spaces
            </span>
          </div>
        </div>
      </section>

      {/* Featured Spaces */}
      <section className="py-20 bg-secondary/30">
        <div className="container-max section-padding">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Spaces</h2>
              <p className="text-muted-foreground">Top-rated beauty workspaces near you</p>
            </div>
            <Link to="/listings">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSpaces.map((space) => (
              <WorkspaceCard key={space.id} {...space} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" id="how-it-works">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Getting started with BeautySpace is simple. Find your perfect workspace in three easy steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Step {index + 1}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary/30">
        <div className="container-max section-padding">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-card rounded-xl p-6 border border-border">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="bg-primary rounded-2xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of beauty professionals who have found their perfect workspace through BeautySpace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/listings">
                <Button size="lg" variant="secondary" className="gap-2">
                  Browse Spaces
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  List Your Space
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
