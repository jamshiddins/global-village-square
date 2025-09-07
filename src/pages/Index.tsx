import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { DemoDataBanner } from "@/components/DemoDataBanner";
import { AIAssistant } from "@/components/AIAssistant";
import { VoiceSearch } from "@/components/VoiceSearch";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, LogIn } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <title>MAYDON - Маркетплейс спецтехники | Продажа и аренда строительной техники</title>
      <meta name="description" content="MAYDON - ведущий маркетплейс спецтехники в России. Купить или арендовать экскаваторы, автокраны, погрузчики, бульдозеры и другую строительную технику от проверенных поставщиков." />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Demo Banner */}
        <div className="container mx-auto px-4 pt-4">
          <DemoDataBanner />
        </div>
        
        {/* Quick Access Bar for Authentication */}
        {!user && (
          <div className="bg-primary/10 border-b border-border">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Войдите для доступа к личному кабинету</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="flex items-center space-x-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Войти</span>
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <main>
          <HeroSection />
          <CategorySection />
          <ProductGrid />
        </main>
        <Footer />
        
        {/* AI Assistant */}
        <AIAssistant />
        
        {/* Voice Search */}
        <VoiceSearch />
      </div>
    </>
  );
};

export default Index;
