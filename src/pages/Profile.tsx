import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useViewHistory } from '@/hooks/useViewHistory';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GamificationWidget } from '@/components/GamificationWidget';
import { FinanceCalculator } from '@/components/FinanceCalculator';
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
  ArrowRight,
  Loader2
} from 'lucide-react';

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
  const { items: viewHistoryItems } = useViewHistory();
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
      title: "Товары в корзине",
      value: cartCount.toString(),
      description: `на сумму ${new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(totalPrice)}`,
      icon: ShoppingCart,
      action: () => navigate('/cart')
    },
    {
      title: "Избранных товаров",
      value: wishlistItems.length.toString(),
      description: "в списке желаний",
      icon: Heart,
      action: () => navigate('/wishlist')
    },
    {
      title: "Просмотрено",
      value: viewHistoryItems.length.toString(),
      description: "товаров за всё время",
      icon: Eye,
      action: () => {}
    },
    {
      title: "Заказов",
      value: "0",
      description: "ожидают обработки",
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
              <Button variant="ghost" onClick={() => navigate('/')}>
                <Building2 className="h-8 w-8 text-primary" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary">MAYDON</h1>
                <p className="text-sm text-muted-foreground">Личный кабинет</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-all" onClick={stat.action}>
                  <CardContent className="p-4 text-center">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm font-medium text-foreground mb-1">{stat.title}</div>
                    <div className="text-xs text-muted-foreground">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs for different sections */}
            <Tabs defaultValue="cart" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="cart">Корзина</TabsTrigger>
                <TabsTrigger value="wishlist">Избранное</TabsTrigger>
                <TabsTrigger value="history">История</TabsTrigger>
                <TabsTrigger value="gamification">Достижения</TabsTrigger>
                <TabsTrigger value="finance">Финансы</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cart" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Корзина ({cartCount} товаров)</span>
                      {cartCount > 0 && (
                        <Button onClick={() => navigate('/cart')}>
                          Перейти в корзину
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cartItems.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Корзина пуста</p>
                        <Button className="mt-4" onClick={() => navigate('/catalog')}>
                          Перейти в каталог
                        </Button>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {cartItems.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                            <img src={item.product_image} alt={item.product_name} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.product_name}</h4>
                              <p className="text-sm text-muted-foreground">Количество: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(item.product_price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))}
                        {cartItems.length > 3 && (
                          <p className="text-center text-sm text-muted-foreground">
                            И ещё {cartItems.length - 3} товаров...
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wishlist" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Избранное ({wishlistItems.length} товаров)</span>
                      {wishlistItems.length > 0 && (
                        <Button onClick={() => navigate('/wishlist')}>
                          Смотреть всё
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {wishlistItems.length === 0 ? (
                      <div className="text-center py-8">
                        <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Нет избранных товаров</p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {wishlistItems.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                            <img src={item.product_image} alt={item.product_name} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.product_name}</h4>
                              <p className="font-semibold text-price">
                                {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(item.product_price)}
                              </p>
                            </div>
                          </div>
                        ))}
                        {wishlistItems.length > 3 && (
                          <p className="text-center text-sm text-muted-foreground">
                            И ещё {wishlistItems.length - 3} товаров...
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>История просмотров ({viewHistoryItems.length} товаров)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {viewHistoryItems.length === 0 ? (
                      <div className="text-center py-8">
                        <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">История просмотров пуста</p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {viewHistoryItems.slice(0, 5).map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                            <img src={item.product_image} alt={item.product_name} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.product_name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Просмотрено: {new Date(item.created_at).toLocaleDateString('ru-RU')}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-price">
                                {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(item.product_price)}
                              </p>
                            </div>
                          </div>
                        ))}
                        {viewHistoryItems.length > 5 && (
                          <p className="text-center text-sm text-muted-foreground">
                            И ещё {viewHistoryItems.length - 5} товаров...
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gamification" className="mt-6">
                <GamificationWidget />
              </TabsContent>

              <TabsContent value="finance" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Финансовые инструменты</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FinanceCalculator 
                      price={cartItems.length > 0 ? cartItems[0].product_price : 5000000}
                      productName={cartItems.length > 0 ? cartItems[0].product_name : "Спецтехника"}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;