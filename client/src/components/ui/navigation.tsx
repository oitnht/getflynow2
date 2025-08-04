import { Button } from "@/components/ui/button";
import { Plane, Moon } from "lucide-react";

interface NavigationProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

export function Navigation({ isAuthenticated, onLogin, onRegister, onLogout }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">GetFlyNow</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Moon className="w-5 h-5" />
            </Button>
            {isAuthenticated ? (
              <Button onClick={onLogout} variant="outline">
                Sign Out
              </Button>
            ) : (
              <>
                <Button onClick={onLogin} variant="ghost">
                  Sign In
                </Button>
                <Button onClick={onRegister}>
                  Get Started Free
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
