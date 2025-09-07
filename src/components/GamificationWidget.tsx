import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Gift, 
  Target, 
  Zap, 
  Award,
  TrendingUp,
  Crown,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  reward: string;
}

interface UserLevel {
  level: number;
  title: string;
  xp: number;
  xpToNext: number;
  totalXp: number;
  benefits: string[];
}

export const GamificationWidget: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [dailyQuests, setDailyQuests] = useState<any[]>([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (user) {
      loadGamificationData();
    }
  }, [user]);

  const loadGamificationData = () => {
    // Симуляция данных геймификации
    const mockLevel: UserLevel = {
      level: 3,
      title: "Эксперт по технике",
      xp: 750,
      xpToNext: 250,
      totalXp: 1000,
      benefits: [
        "Скидка 5% на все покупки",
        "Приоритетная поддержка",
        "Доступ к эксклюзивным предложениям"
      ]
    };

    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'Первый покупатель',
        description: 'Совершите первую покупку',
        icon: <Star className="w-5 h-5" />,
        unlocked: true,
        reward: '100 баллов'
      },
      {
        id: '2',
        title: 'Эксперт-обозреватель',
        description: 'Оставьте 10 отзывов',
        icon: <Award className="w-5 h-5" />,
        unlocked: false,
        progress: 6,
        maxProgress: 10,
        reward: '500 баллов'
      },
      {
        id: '3',
        title: 'Влиятельный покупатель',
        description: 'Пригласите 5 друзей',
        icon: <TrendingUp className="w-5 h-5" />,
        unlocked: false,
        progress: 2,
        maxProgress: 5,
        reward: '1000 баллов'
      },
      {
        id: '4',
        title: 'Крупный инвестор',
        description: 'Покупки на сумму более $100,000',
        icon: <Crown className="w-5 h-5" />,
        unlocked: false,
        progress: 45000,
        maxProgress: 100000,
        reward: '5000 баллов + VIP статус'
      }
    ];

    const mockQuests = [
      {
        id: '1',
        title: 'Ежедневный просмотр',
        description: 'Просмотрите 5 товаров',
        progress: 3,
        maxProgress: 5,
        reward: 50,
        completed: false
      },
      {
        id: '2',
        title: 'Социальная активность',
        description: 'Поделитесь товаром в соцсетях',
        progress: 0,
        maxProgress: 1,
        reward: 75,
        completed: false
      },
      {
        id: '3',
        title: 'Обратная связь',
        description: 'Оставьте отзыв о товаре',
        progress: 0,
        maxProgress: 1,
        reward: 100,
        completed: false
      }
    ];

    setUserLevel(mockLevel);
    setAchievements(mockAchievements);
    setDailyQuests(mockQuests);
    setPoints(2450);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  const handleClaimReward = (questId: string) => {
    const quest = dailyQuests.find(q => q.id === questId);
    if (quest && quest.progress >= quest.maxProgress) {
      setPoints(prev => prev + quest.reward);
      setDailyQuests(prev => prev.map(q => 
        q.id === questId ? { ...q, completed: true } : q
      ));
      
      toast({
        title: "Награда получена!",
        description: `+${quest.reward} баллов`,
      });
    }
  };

  if (!user || !userLevel) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Уровень пользователя */}
      <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg">Уровень {userLevel.level}</CardTitle>
                <p className="text-sm opacity-90">{userLevel.title}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{formatNumber(points)}</div>
              <div className="text-xs opacity-90">баллов</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Прогресс до уровня {userLevel.level + 1}</span>
              <span>{userLevel.xp}/{userLevel.totalXp} XP</span>
            </div>
            <Progress 
              value={(userLevel.xp / userLevel.totalXp) * 100} 
              className="h-2 bg-white/20"
            />
            <p className="text-xs opacity-90">
              Осталось {userLevel.xpToNext} XP до следующего уровня
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ежедневные квесты */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="w-5 h-5 text-primary" />
            Ежедневные задания
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {dailyQuests.map((quest) => (
            <div 
              key={quest.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border"
            >
              <div className="flex-1">
                <h4 className="font-medium text-sm">{quest.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{quest.description}</p>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={(quest.progress / quest.maxProgress) * 100} 
                    className="h-1.5 flex-1"
                  />
                  <span className="text-xs text-muted-foreground">
                    {quest.progress}/{quest.maxProgress}
                  </span>
                </div>
              </div>
              <div className="ml-4 text-center">
                <div className="text-sm font-bold text-accent">+{quest.reward}</div>
                <div className="text-xs text-muted-foreground mb-2">баллов</div>
                {quest.progress >= quest.maxProgress && !quest.completed ? (
                  <Button 
                    size="sm" 
                    onClick={() => handleClaimReward(quest.id)}
                    className="h-8 px-3"
                  >
                    <Gift className="w-3 h-3 mr-1" />
                    Получить
                  </Button>
                ) : quest.completed ? (
                  <Badge variant="secondary" className="text-xs">
                    Выполнено
                  </Badge>
                ) : (
                  <Button size="sm" variant="outline" disabled className="h-8 px-3">
                    <Target className="w-3 h-3 mr-1" />
                    Цель
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Достижения */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Award className="w-5 h-5 text-primary" />
            Достижения
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                achievement.unlocked 
                  ? 'bg-accent/10 border-accent/30' 
                  : 'bg-muted/30 border-border/50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                achievement.unlocked 
                  ? 'bg-accent text-white' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {achievement.icon}
              </div>
              
              <div className="flex-1">
                <h4 className={`font-medium text-sm ${
                  achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {achievement.title}
                </h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                
                {achievement.progress !== undefined && achievement.maxProgress && (
                  <div className="mt-2 space-y-1">
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      className="h-1.5"
                    />
                    <span className="text-xs text-muted-foreground">
                      {formatNumber(achievement.progress)}/{formatNumber(achievement.maxProgress)}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="text-right">
                <Badge 
                  variant={achievement.unlocked ? "default" : "secondary"}
                  className="text-xs"
                >
                  {achievement.unlocked ? 'Получено' : achievement.reward}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};