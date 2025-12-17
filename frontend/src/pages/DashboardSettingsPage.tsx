import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardSidebar from "@/components/DashboardSidebar";

const DashboardSettingsPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 p-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your personal information and account details
          </p>
        </div>

        {/* Full-width layout */}
        <div className="bg-card rounded-xl border border-border p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left column — avatar & info */}
            <div className="lg:col-span-1">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-3xl font-semibold text-primary-foreground">
                      JD
                    </span>
                  </div>
                  <button
                    type="button"
                    className="absolute -bottom-1 -right-1 w-9 h-9 bg-secondary border border-border rounded-full flex items-center justify-center hover:bg-secondary/80 transition-colors"
                  >
                    <Camera className="w-4 h-4 text-foreground" />
                  </button>
                </div>

                <div>
                  <p className="font-medium text-foreground text-lg">
                    Jane Doe
                  </p>
                  <p className="text-sm text-muted-foreground">
                    jane@example.com
                  </p>
                </div>
              </div>
            </div>

            {/* Right column — form */}
            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Jane" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="jane@example.com"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="input-field resize-none"
                    defaultValue="Professional hairstylist with 10+ years of experience specializing in color treatments and modern cuts."
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button>Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardSettingsPage;
