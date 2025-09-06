import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Building2, AlertCircle } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user, loading } = useAuth();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    email: '', 
    password: '', 
    fullName: '',
    confirmPassword: '' 
  });

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Ошибка валидации",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        console.error('Login error:', error);
        
        let errorMessage = "Произошла ошибка при входе";
        
        if (error.message.includes('Invalid login credentials') || error.message.includes('Invalid credentials')) {
          errorMessage = "Неверный email или пароль";
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = "Подтвердите email перед входом";
        } else if (error.message.includes('Too many requests')) {
          errorMessage = "Слишком много попыток входа. Попробуйте позже";
        } else {
          errorMessage = error.message || "Неизвестная ошибка";
        }
        
        toast({
          title: "Ошибка входа",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Добро пожаловать!",
          description: "Вы успешно вошли в систему",
        });
      }
    } catch (err) {
      console.error('Unexpected login error:', err);
      toast({
        title: "Ошибка входа",
        description: "Произошла непредвиденная ошибка. Попробуйте позже",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!signupData.email || !signupData.password || !signupData.fullName) {
      toast({
        title: "Ошибка валидации",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Ошибка валидации",
        description: "Пароли не совпадают",
        variant: "destructive",
      });
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        title: "Ошибка валидации",
        description: "Пароль должен содержать минимум 6 символов",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupData.email)) {
      toast({
        title: "Ошибка валидации",
        description: "Введите корректный email адрес",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signUp(signupData.email, signupData.password, signupData.fullName);
      
      if (error) {
        console.error('Signup error:', error);
        
        let errorMessage = "Произошла ошибка при регистрации";
        
        if (error.message.includes('already registered') || error.message.includes('already been registered')) {
          errorMessage = "Пользователь с таким email уже существует";
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = "Пароль слишком короткий";
        } else if (error.message.includes('Invalid email')) {
          errorMessage = "Некорректный email адрес";
        } else if (error.message.includes('Database error') || error.message.includes('unexpected_failure')) {
          errorMessage = "Ошибка сервера. Попробуйте позже или обратитесь в поддержку";
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = "Проверьте email и подтвердите регистрацию";
        } else {
          errorMessage = error.message || "Неизвестная ошибка";
        }
        
        toast({
          title: "Ошибка регистрации",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        // Clear form on success
        setSignupData({ email: '', password: '', fullName: '', confirmPassword: '' });
        
        toast({
          title: "Регистрация успешна!",
          description: "Проверьте email для подтверждения аккаунта",
        });
      }
    } catch (err) {
      console.error('Unexpected signup error:', err);
      toast({
        title: "Ошибка регистрации",
        description: "Произошла непредвиденная ошибка. Попробуйте позже",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-primary">MAYDON</h1>
          </div>
          <p className="text-muted-foreground">Платформа техники</p>
        </div>

        <Card className="bg-card border-border">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="signup">Регистрация</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Войти в систему</CardTitle>
                <CardDescription>
                  Введите ваши данные для входа
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="bg-input border-border"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Пароль</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="bg-input border-border"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Войти
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Создать аккаунт</CardTitle>
                <CardDescription>
                  Зарегистрируйтесь для доступа к платформе
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Полное имя *</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Иван Иванов"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      className="bg-input border-border"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email *</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="bg-input border-border"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Пароль * (минимум 6 символов)</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="bg-input border-border"
                      minLength={6}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Подтвердите пароль *</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      className="bg-input border-border"
                      required
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2 text-xs text-muted-foreground bg-muted/30 p-3 rounded-md mt-3">
                    <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium mb-1">Требования к регистрации:</p>
                      <ul className="space-y-1">
                        <li>• Заполните все обязательные поля (*)</li>
                        <li>• Пароль минимум 6 символов</li>
                        <li>• Используйте действующий email адрес</li>
                        <li>• Подтвердите email после регистрации</li>
                      </ul>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Зарегистрироваться
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Additional help */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>
            Проблемы с входом? {" "}
            <Button 
              variant="link" 
              className="p-0 h-auto text-primary hover:text-primary/80"
              onClick={() => toast({
                title: "Поддержка",
                description: "Обратитесь в поддержку: support@maydon.ru",
              })}
            >
              Обратитесь в поддержку
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;