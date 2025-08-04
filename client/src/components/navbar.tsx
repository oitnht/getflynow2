import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();

  return (
    <nav id="navigation" className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 cursor-pointer">
              <Plane className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">GetFlyNow</h1>
            </Link>
          </div>

          {user && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/trips" className="text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  My Trips
                </Link>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600">{user.email}</span>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="text-slate-600 hover:text-blue-600"
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}