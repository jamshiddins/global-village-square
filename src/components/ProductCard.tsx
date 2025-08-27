import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card className="group bg-product-card border-border hover:border-primary/20 hover:bg-product-hover transition-all duration-300 hover:shadow-product cursor-pointer overflow-hidden">
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
              <Badge variant="destructive" className="text-xs font-semibold">
                {badge}
              </Badge>
            )}
            {discount > 0 && (
              <Badge variant="secondary" className="text-xs font-semibold bg-accent">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Wishlist button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart 
              className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </Button>

          {/* Quick add to cart */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="cart" size="sm" className="w-full">
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
                  className={`h-4 w-4 ${
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
          <Button variant="buy" size="sm" className="w-full">
            Купить Сейчас
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};