import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useViewHistory } from '@/hooks/useViewHistory';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Building2, 
  Phone, 
  Mail, 
  Calendar,
  Settings,
  LogOut,
  ShoppingCart,
  Heart,
  Eye,
  Package,
  ArrowRight
} from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  company_name: string | null;
  company_id: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const { toast } = useToast();
  const { items: cartItems, totalItems: cartCount, totalPrice } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { items: viewHistory } = useViewHistory();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось выйти из системы",
        variant: "destructive",
      });
    } else {
      navigate('/');
    }
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const stats = [
    {
      title: "Товаров в корзине",
      value: cartCount.toString(),
      subtitle: `На сумму ${new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(totalPrice)}`,
      icon: ShoppingCart,
      action: () => navigate('/cart')
    },
    {
      title: "В избранном",
      value: wishlistItems.length.toString(),
      subtitle: "товаров",
      icon: Heart,
      action: () => navigate('/wishlist')
    },
    {
      title: "Просмотрено",
      value: viewHistory.length.toString(),
      subtitle: "товаров",
      icon: Eye,
      action: () => {}
    },
    {
      title: "Заказы",
      value: "0",
      subtitle: "активных заказов",
      icon: Package,
      action: () => {}
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-primary">MAYDON</h1>
                <p className="text-sm text-muted-foreground">Платформа техники</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Настройки
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={profile?.avatar_url || ''} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {profile?.full_name || 'Пользователь'}
                    </h2>
                    <Badge variant="outline" className="mt-1">
                      {profile?.role || 'user'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{user.email}</span>
                </div>
                {profile?.phone && (
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{profile.phone}</span>
                  </div>
                )}
                {profile?.company_name && (
                  <div className="flex items-center space-x-3 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{profile.company_name}</span>
                  </div>
                )}
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">
                    Регистрация: {new Date(profile?.created_at || '').toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                🎉 Добро пожаловать в MAYDON
              </h2>
              <p className="text-muted-foreground">
                Сегодня {new Date().toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })} г. • Ваш профиль активен
              </p>
            </div>

            {/* Key Stats */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                📊 Активность аккаунта
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card 
                    key={index} 
                    className={`bg-dashboard-card border-border hover:bg-dashboard-card-hover transition-all cursor-pointer ${
                      stat.action && 'hover:scale-105'
                    }`}
                    onClick={stat.action}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/20 rounded-lg">
                            <stat.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.title}</p>
                            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                          {stat.action && <ArrowRight className="h-4 w-4 text-muted-foreground mt-2 ml-auto" />}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                ⚡ Быстрые действия
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/catalog')}>
                  <CardContent className="p-6 text-center">
                    <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Каталог</h4>
                    <p className="text-sm text-muted-foreground">Просмотреть товары</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/cart')}>
                  <CardContent className="p-6 text-center">
                    <ShoppingCart className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Корзина</h4>
                    <p className="text-sm text-muted-foreground">{cartCount} товаров</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/wishlist')}>
                  <CardContent className="p-6 text-center">
                    <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Избранное</h4>
                    <p className="text-sm text-muted-foreground">{wishlistItems.length} товаров</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent History */}
            {viewHistory.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  👀 Недавно просмотренные
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {viewHistory.slice(0, 6).map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-all cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={item.product_image} 
                            alt={item.product_name}
                            className="w-12 h-12 object-cover rounded border"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.product_name}</h4>
                            <p className="text-sm text-price font-semibold">
                              {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(item.product_price)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;