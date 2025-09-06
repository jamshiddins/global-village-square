import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useNavigation } from "@/hooks/useNavigation";
import { useState } from "react";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

export const Footer = () => {
  const { handleAction, navigateToCategory } = useNavigation();
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
            <div className="text-2xl font-bold bg-hero-gradient bg-clip-text text-transparent">
              СпецТехМаркет
            </div>
            <p className="text-muted-foreground text-sm">
              Надежная площадка для торговли спецтехникой. Соединяем покупателей и продавцов по всему миру.
              Качественное оборудование по выгодным ценам.
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleAction("Переход в Facebook")}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleAction("Переход в Twitter")}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleAction("Переход в Instagram")}
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleAction("Переход в YouTube")}
              >
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Быстрые Ссылки</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  className="hover:text-primary transition-colors text-left"
                  onClick={() => handleAction("О нас")}
                >
                  О Нас
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-primary transition-colors text-left"
                  onClick={() => handleAction("Продавать на платформе")}
                >
                  Продавать на СпецТехМаркет
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-primary transition-colors text-left"
                  onClick={() => handleAction("Защита покупателей")}
                >
                  Защита Покупателей
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-primary transition-colors text-left"
                  onClick={() => handleAction("Центр помощи")}
                >
                  Центр Помощи
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-primary transition-colors text-left"
                  onClick={() => handleAction("Информация о доставке")}
                >
                  Доставка
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-primary transition-colors text-left"
                  onClick={() => handleAction("Возврат товаров")}
                >
                  Возврат
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Категории</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  className="hover:text-primary transition-colors text-left"
                  onClick={() => navigateToCategory("Экскаваторы")}
                >
                  Экскаваторы
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-primary transition-colors text-left"
                  onClick={() => navigateToCategory("Автокраны")}
                >
                  Автокраны
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-primary transition-colors text-left"
                  onClick={() => navigateToCategory("Грузовики")}
                >
                  Грузовики
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-primary transition-colors text-left"
                  onClick={() => navigateToCategory("Погрузчики")}
                >
                  Погрузчики
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-primary transition-colors text-left"
                  onClick={() => navigateToCategory("Инструменты")}
                >
                  Инструменты
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-primary transition-colors text-left"
                  onClick={() => navigateToCategory("Сервис")}
                >
                  Сервисное Обслуживание
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Оставайтесь на связи</h3>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@spetehmarket.ru</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+7 (800) 555-12-34</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Москва, ул. Промышленная, д. 123</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Подпишитесь на новости и специальные предложения
              </p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Введите ваш email"
                  className="text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={handleSubscribe}
                >
                  Подписаться
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex flex-wrap gap-4">
            <span>© 2024 СпецТехМаркет. Все права защищены.</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <button 
              className="hover:text-primary transition-colors"
              onClick={() => handleAction("Политика конфиденциальности")}
            >
              Политика Конфиденциальности
            </button>
            <button 
              className="hover:text-primary transition-colors"
              onClick={() => handleAction("Пользовательское соглашение")}
            >
              Пользовательское Соглашение
            </button>
            <button 
              className="hover:text-primary transition-colors"
              onClick={() => handleAction("Политика cookies")}
            >
              Политика Cookie
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};