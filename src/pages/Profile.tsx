import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Building2, 
  Phone, 
  Mail, 
  Calendar,
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  BarChart3
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
      title: "Общий оборот",
      value: "₽2.1 млрд",
      change: "+15.3%",
      icon: DollarSign,
      positive: true
    },
    {
      title: "Активных сделок",
      value: "23",
      change: "+3",
      icon: Target,
      positive: true
    },
    {
      title: "Баланс кошелька",
      value: "₽45.2 млн",
      change: "-5.1%",
      icon: TrendingUp,
      positive: false
    },
    {
      title: "Средний ROI",
      value: "12.5%",
      change: "+2.1%",
      icon: BarChart3,
      positive: true
    }
  ];

  const tasks = [
    { title: "Купить технику", count: 127, available: "127 доступно", color: "bg-blue-500/20 border-blue-500/50" },
    { title: "Продать технику", count: 5, available: "5 активных", color: "bg-purple-500/20 border-purple-500/50" },
    { title: "Арендовать", count: 89, available: "89 свободно", color: "bg-indigo-500/20 border-indigo-500/50" },
    { title: "Сдать в аренду", count: 4, available: "4 ед. техники", color: "bg-pink-500/20 border-pink-500/50" }
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
                })} г. • У вас 3 новых уведомления и 2 задачи требуют внимания
              </p>
            </div>

            {/* Key Stats */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                📊 Ключевые показатели
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-dashboard-card border-border hover:bg-dashboard-card-hover transition-colors">
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
                        <Badge 
                          variant="outline" 
                          className={`${
                            stat.positive 
                              ? 'text-stats-positive border-stats-positive/50' 
                              : 'text-stats-negative border-stats-negative/50'
                          }`}
                        >
                          {stat.change}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Task Center */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                ⚡ Центр задач
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map((task, index) => (
                  <Card key={index} className={`${task.color} border transition-all hover:scale-105 cursor-pointer`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-foreground">{task.title}</h4>
                        <Activity className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{task.available}</p>
                      <p className="text-3xl font-bold text-foreground">{task.count}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;