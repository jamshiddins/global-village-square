import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigation } from "@/hooks/useNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useState } from "react";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  isWishlisted?: boolean;
}

export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  badge,
  isWishlisted = false,
}: ProductCardProps) => {
  const { navigateToProduct, handleAction } = useNavigation();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  
  const wishlisted = isInWishlist(id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      handleAction("Войдите, чтобы добавлять в избранное");
      return;
    }
    
    if (wishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id, name, price, image);
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      handleAction("Войдите, чтобы добавлять в корзину");
      return;
    }
    addToCart(id, name, price, image);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      handleAction("Войдите для покупки");
      return;
    }
    handleAction("Переход к оформлению покупки");
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleAction("Быстрый просмотр товара");
  };

  return (
    <Card 
      className="group bg-product-card border-border hover:border-primary/20 hover:bg-product-hover transition-all duration-300 hover:shadow-product cursor-pointer overflow-hidden animate-fade-in"
      onClick={() => navigateToProduct(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Image container */}
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {badge && (
              <Badge variant="destructive" className="text-xs font-semibold animate-scale-in">
                {badge}
              </Badge>
            )}
            {discount > 0 && (
              <Badge variant="secondary" className="text-xs font-semibold bg-accent animate-scale-in">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              onClick={handleWishlistToggle}
            >
              <Heart 
                className={`h-4 w-4 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
              />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              onClick={handleQuickView}
            >
              <Eye className="h-4 w-4 text-gray-600" />
            </Button>
          </div>

          {/* Quick add to cart */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Button 
              variant="cart" 
              size="sm" 
              className="w-full animate-slide-in-right"
              onClick={handleAddToCartClick}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              В Корзину
            </Button>
          </div>
        </div>

        {/* Product info */}
        <div className="p-4 space-y-3">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 transition-colors duration-200 ${
                    i < Math.floor(rating) 
                      ? 'text-rating fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({reviews})</span>
          </div>

          {/* Product name */}
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-price">
              {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(price)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(originalPrice)}
              </span>
            )}
          </div>

          {/* Buy now button */}
          <Button 
            variant="buy" 
            size="sm" 
            className={`w-full transition-all duration-300 ${isHovered ? 'animate-pulse-glow' : ''}`}
            onClick={handleBuyNow}
          >
            {user ? "Купить Сейчас" : "Войти для покупки"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};