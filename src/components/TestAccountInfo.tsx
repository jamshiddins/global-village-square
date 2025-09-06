import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TestAccountInfoProps {
  onFillCredentials?: (email: string, password: string) => void;
  compact?: boolean;
}

export const TestAccountInfo = ({ onFillCredentials, compact = false }: TestAccountInfoProps) => {
  const { toast } = useToast();

  const testCredentials = {
    email: "test@maydon.ru",
    password: "maydon123"
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Скопировано!",
        description: `${type} скопирован в буфер обмена`,
      });
    });
  };

  if (compact) {
    return (
      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium text-primary">Тест:</span>{" "}
            <span className="font-mono text-xs">{testCredentials.email}</span>
          </div>
          {onFillCredentials && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFillCredentials(testCredentials.email, testCredentials.password)}
              className="text-xs h-7"
            >
              Заполнить
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-primary mb-2">🎯 Тестовый аккаунт для демонстрации</h3>
            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Email:</span>
                  <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {testCredentials.email}
                  </code>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(testCredentials.email, "Email")}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>

              {/* Password */}
              <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Пароль:</span>
                  <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {testCredentials.password}
                  </code>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(testCredentials.password, "Пароль")}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>

              {/* Quick fill button */}
              {onFillCredentials && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFillCredentials(testCredentials.email, testCredentials.password)}
                  className="w-full text-sm bg-primary/10 hover:bg-primary/20 border-primary/30"
                >
                  🚀 Заполнить форму автоматически
                </Button>
              )}

              <p className="text-xs text-muted-foreground">
                Этот аккаунт создан для демонстрации возможностей системы. 
                В нем есть полный профиль с тестовыми данными компании.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};