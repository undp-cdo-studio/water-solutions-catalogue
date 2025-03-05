import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function Customize() {
  return (
    <div className="grid w-full min-h-[600px] lg:grid-cols-2">
      <div className="hidden lg:block">
        <img
          alt="Onboarding Illustration"
          className="h-full w-full object-cover"
          height="600"
          src="/placeholder.svg"
          style={{
            aspectRatio: "800/600",
            objectFit: "cover",
          }}
          width="800"
        />
      </div>
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome to Acme Inc</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Let's get you set up with an account.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-type">Account Type</Label>
              <Select required>
                <option value="">Select account type</option>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
                <option value="enterprise">Enterprise</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="features">Features</Label>
              <div>
                <div>Analytics</div>
                <div>Collaboration</div>
                <div>Security</div>
                <div>Scalability</div>
              </div>
            </div>
            <Button className="w-full" type="submit">
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
