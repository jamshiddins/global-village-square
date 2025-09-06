import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useNavigation } from "@/hooks/useNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Building2
} from "lucide-react";

export const Footer = () => {
  const navigate = useNavigate();
  const { handleAction, navigateToCategory } = useNavigation();
  const { user } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email.trim()) {
      handleAction(`Подписка оформлена: ${email}`);
      setEmail("");
    }
  };
  
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-primary" />
              <div className="text-2xl font-bold text-primary">
                MAYDON
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Профессиональная платформа для торговли спецтехникой. Соединяем покупателей и продавцов по всему миру.
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:text-primary"
                onClick={() => handleAction("Переход в Facebook")}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:text-primary"
                onClick={() => handleAction("Переход в Twitter")}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:text-primary"
                onClick={() => handleAction("Переход в Instagram")}
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:text-primary"
                onClick={() => handleAction("Переход в YouTube")}
              >
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Быстрые ссылки</h3>
            <div className="space-y-2 text-sm">
              <Button 
                variant="ghost" 
                className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                onClick={() => handleAction("О компании")}
              >
                О компании
              </Button>
              <Button 
                variant="ghost" 
                className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                onClick={() => handleAction("Новости")}
              >
                Новости
              </Button>
              <Button 
                variant="ghost" 
                className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                onClick={() => handleAction("Карьера")}
              >
                Карьера
              </Button>
              <Button 
                variant="ghost" 
                className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                onClick={() => handleAction("Партнерам")}
              >
                Партнерам
              </Button>
              {!user && (
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                  onClick={() => navigate('/auth')}
                >
                  Вход / Регистрация
                </Button>
              )}
              {user && (
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                  onClick={() => navigate('/profile')}
                >
                  Мой кабинет
                </Button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Категории</h3>
            <div className="space-y-2 text-sm">
              <Button 
                variant="ghost" 
                className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                onClick={() => navigateToCategory("Экскаваторы")}
              >
                Экскаваторы
              </Button>
              <Button 
                variant="ghost" 
                className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                onClick={() => navigateToCategory("Автокраны")}
              >
                Автокраны
              </Button>
              <Button 
                variant="ghost" 
                className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                onClick={() => navigateToCategory("Грузовики")}
              >
                Грузовики
              </Button>
              <Button 
                variant="ghost" 
                className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                onClick={() => navigateToCategory("Погрузчики")}
              >
                Погрузчики
              </Button>
              <Button 
                variant="ghost" 
                className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                onClick={() => navigateToCategory("Инструменты")}
              >
                Инструменты
              </Button>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Контакты</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@maydon.ru</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Москва, Россия</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-foreground">Новости и обновления</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input border-border"
                />
                <Button 
                  variant="default"
                  size="sm"
                  onClick={handleSubscribe}
                  className="bg-primary hover:bg-primary/90"
                >
                  Подписаться
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2025 MAYDON. Все права защищены.
          </div>
          <div className="flex space-x-6 text-sm">
            <Button 
              variant="ghost" 
              className="h-auto p-0 text-muted-foreground hover:text-primary"
              onClick={() => handleAction("Политика конфиденциальности")}
            >
              Политика конфиденциальности
            </Button>
            <Button 
              variant="ghost" 
              className="h-auto p-0 text-muted-foreground hover:text-primary"
              onClick={() => handleAction("Условия использования")}
            >
              Условия использования
            </Button>
            <Button 
              variant="ghost" 
              className="h-auto p-0 text-muted-foreground hover:text-primary"
              onClick={() => handleAction("Поддержка")}
            >
              Поддержка
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};