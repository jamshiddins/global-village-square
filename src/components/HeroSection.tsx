import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Truck, Shield, Star } from "lucide-react";
import { useNavigation } from "@/hooks/useNavigation";
import heroBanner from "@/assets/hero-banner.jpg";

export const HeroSection = () => {
  const { navigateToCatalog, handleAction } = useNavigation();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Профессиональная
                <span className="bg-hero-gradient bg-clip-text text-transparent block">
                  Спецтехника
                </span>
                для Любых Задач
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Широкий выбор строительной и специальной техники. Экскаваторы, автокраны, бульдозеры и многое другое для вашего бизнеса.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                className="group"
                onClick={() => navigateToCatalog()}
              >
                Смотреть Каталог
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => handleAction("Стать поставщиком")}
              >
                Стать Поставщиком
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Быстрая Доставка</p>
              </div>
              <div className="text-center space-y-2">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Гарантия Качества</p>
              </div>
              <div className="text-center space-y-2">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Сервисная Поддержка</p>
              </div>
            </div>
          </div>

          {/* Right content - Hero image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={heroBanner} 
                alt="Спецтехника в работе"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Floating elements */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold">5000+ Единиц</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-rating fill-current" />
                  <span className="text-sm font-semibold">4.8/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};