import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="text-2xl font-bold bg-hero-gradient bg-clip-text text-transparent">
              MarketPlace
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative flex w-full">
              <Input
                type="text"
                placeholder="Search for products..."
                className="flex-1 pr-12 border-2 border-border focus:border-primary transition-colors"
              />
              <Button 
                size="icon" 
                className="absolute right-1 top-1 h-8 w-8"
                variant="default"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                3
              </Badge>
            </Button>
            
            <Button variant="outline" size="sm" className="hidden md:flex">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-4 md:hidden">
          <div className="relative flex w-full">
            <Input
              type="text"
              placeholder="Search for products..."
              className="flex-1 pr-12"
            />
            <Button size="icon" className="absolute right-1 top-1 h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex pb-4 space-x-6">
          <Button variant="ghost" className="text-sm font-medium">
            Electronics
          </Button>
          <Button variant="ghost" className="text-sm font-medium">
            Fashion
          </Button>
          <Button variant="ghost" className="text-sm font-medium">
            Home & Garden
          </Button>
          <Button variant="ghost" className="text-sm font-medium">
            Sports
          </Button>
          <Button variant="ghost" className="text-sm font-medium">
            Books
          </Button>
          <Button variant="ghost" className="text-sm font-medium">
            Beauty
          </Button>
        </nav>
      </div>
    </header>
  );
};