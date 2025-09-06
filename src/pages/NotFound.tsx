import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Building2, Home, ArrowLeft, Search, User } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-primary">MAYDON</h1>
          </div>
          <p className="text-muted-foreground">Платформа техники</p>
        </div>

        {/* 404 Card */}
        <Card className="bg-card border-border shadow-lg">
          <CardContent className="p-8 text-center space-y-6">
            {/* 404 Number */}
            <div className="text-8xl font-bold text-primary/20 select-none">
              404
            </div>
            
            {/* Error Message */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Страница не найдена
              </h2>
              <p className="text-muted-foreground">
                Извините, но запрашиваемая страница не существует или была перемещена.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button 
                variant="default" 
                size="lg" 
                onClick={() => navigate('/')}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <Home className="h-4 w-4 mr-2" />
                На главную
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Назад
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/catalog')}
                  className="flex-1"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Каталог
                </Button>
              </div>

              {/* Auth-specific action */}
              {!user && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/auth')}
                  className="w-full text-muted-foreground hover:text-primary"
                >
                  <User className="h-4 w-4 mr-2" />
                  Войти в систему
                </Button>
              )}
              
              {user && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/profile')}
                  className="w-full text-muted-foreground hover:text-primary"
                >
                  <User className="h-4 w-4 mr-2" />
                  Мой профиль
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer info */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© 2025 MAYDON. Все права защищены.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;