import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useViewHistory } from '@/hooks/useViewHistory';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  ShoppingCart, 
  Phone, 
  MessageCircle, 
  Share2,
  MapPin,
  Truck,
  Shield,
  Clock
} from 'lucide-react';

// Sample product data - in real app this would come from API
const sampleProducts = {
  '1': {
    id: '1',
    name: 'Экскаватор Caterpillar 320D',
    price: 5500000,
    originalPrice: 6000000,
    rating: 4.8,
    reviews: 127,
    image: '/src/assets/product-headphones.jpg',
    category: 'Экскаваторы',
    description: 'Мощный гусеничный экскаватор Caterpillar 320D с рабочим весом 20 тонн. Идеально подходит для земляных работ, строительства и коммунальных нужд.',
    specifications: {
      'Мощность двигателя': '122 кВт (163 л.с.)',
      'Рабочий вес': '20 100 кг',
      'Глубина копания': '6 520 мм',
      'Высота выгрузки': '6 100 мм',
      'Радиус копания': '9 640 мм',
      'Объем ковша': '1,0 м³'
    },
    seller: {
      name: 'ТехноСпец',
      rating: 4.9,
      location: 'Москва, Россия',
      phone: '+7 (495) 123-45-67'
    }
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToViewHistory } = useViewHistory();
  
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id && sampleProducts[id as keyof typeof sampleProducts]) {
      const productData = sampleProducts[id as keyof typeof sampleProducts];
      setProduct(productData);
      
      // Add to view history
      addToViewHistory(
        productData.id,
        productData.name,
        productData.price,
        productData.image
      );
    }
  }, [id, addToViewHistory]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Товар не найден</h1>
            <Button onClick={() => navigate('/catalog')} className="mt-4">
              Вернуться в каталог
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, product.name, product.price, product.image, quantity);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id, product.name, product.price, product.image);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/catalog')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Каталог</span>
          </Button>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                {discount > 0 && (
                  <Badge variant="destructive">-{discount}%</Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-rating fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} отзывов)
                </span>
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-price">
                  {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Добавить в корзину
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Позвонить
                </Button>
                
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Написать
                </Button>
              </div>
            </div>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Продавец</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{product.seller.name}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-rating fill-current mr-1" />
                      <span className="text-sm">{product.seller.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {product.seller.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Specifications */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Характеристики</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-medium">{String(value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Доставка</h3>
              <p className="text-sm text-muted-foreground">По всей России</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Гарантия</h3>
              <p className="text-sm text-muted-foreground">12 месяцев</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Поддержка</h3>
              <p className="text-sm text-muted-foreground">24/7</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;