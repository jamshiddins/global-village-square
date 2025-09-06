import { Search, ShoppingCart, User, Menu, Heart, LogOut, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigation } from "@/hooks/useNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const { handleAction, navigateToCategory, navigateToCart, navigateToWishlist } = useNavigation();
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      handleAction(`Поиск: ${searchQuery}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => handleAction("Меню")}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-primary" />
              <div className="text-2xl font-bold text-primary">
                MAYDON
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative flex w-full">
              <Input
                type="text"
                placeholder="Поиск спецтехники..."
                className="flex-1 pr-12 border-2 border-border focus:border-primary transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button 
                size="icon" 
                className="absolute right-1 top-1 h-8 w-8"
                variant="default"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex"
              onClick={navigateToWishlist}
            >
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={navigateToCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">Профиль</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSignOut}
                  title="Выйти"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/auth')}
                className="hidden md:flex"
              >
                <User className="h-4 w-4 mr-2" />
                Войти
              </Button>
            )}
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-4 md:hidden">
          <div className="relative flex w-full">
            <Input
              type="text"
              placeholder="Поиск спецтехники..."
              className="flex-1 pr-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button 
              size="icon" 
              className="absolute right-1 top-1 h-8 w-8"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex pb-4 space-x-6">
          <Button 
            variant="ghost" 
            className="text-sm font-medium"
            onClick={() => navigateToCategory("Экскаваторы")}
          >
            Экскаваторы
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm font-medium"
            onClick={() => navigateToCategory("Автокраны")}
          >
            Автокраны
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm font-medium"
            onClick={() => navigateToCategory("Грузовики")}
          >
            Грузовики
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm font-medium"
            onClick={() => navigateToCategory("Погрузчики")}
          >
            Погрузчики
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm font-medium"
            onClick={() => navigateToCategory("Инструменты")}
          >
            Инструменты
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm font-medium"
            onClick={() => navigateToCategory("Сервис")}
          >
            Сервис
          </Button>
        </nav>
      </div>
    </header>
  );
};