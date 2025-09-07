import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Calculator, CreditCard, TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';

interface FinanceCalculatorProps {
  price: number;
  productName: string;
}

interface LeasingResult {
  monthlyPayment: number;
  totalAmount: number;
  overpayment: number;
  schedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({ price, productName }) => {
  const [leasingTerm, setLeasingTerm] = useState(24);
  const [leasingRate, setLeasingRate] = useState(18);
  const [downPayment, setDownPayment] = useState(Math.round(price * 0.3));
  const [installmentTerm, setInstallmentTerm] = useState(6);
  const [leasingResult, setLeasingResult] = useState<LeasingResult | null>(null);

  useEffect(() => {
    calculateLeasing();
  }, [leasingTerm, leasingRate, downPayment, price]);

  const calculateLeasing = () => {
    const loanAmount = price - downPayment;
    const monthlyRate = leasingRate / 100 / 12;
    const totalMonths = leasingTerm;

    if (loanAmount <= 0) {
      setLeasingResult(null);
      return;
    }

    // Аннуитетный платеж
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                          (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalAmount = monthlyPayment * totalMonths + downPayment;
    const overpayment = totalAmount - price;

    // Создаем график платежей
    const schedule = [];
    let balance = loanAmount;

    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    setLeasingResult({
      monthlyPayment,
      totalAmount,
      overpayment,
      schedule
    });
  };

  const calculateInstallment = () => {
    return price / installmentTerm;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const leasingTerms = [12, 18, 24, 36, 48, 60];
  const installmentTerms = [3, 6, 9, 12];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Финансовые решения
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Рассчитайте лизинг или рассрочку для покупки {productName}
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="leasing" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="leasing" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Лизинг
            </TabsTrigger>
            <TabsTrigger value="installment" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Рассрочка
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leasing" className="space-y-6">
            <div className="space-y-4">
              {/* Параметры лизинга */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="down-payment">Первоначальный взнос</Label>
                  <Input
                    id="down-payment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    min={0}
                    max={price * 0.9}
                  />
                  <p className="text-xs text-muted-foreground">
                    {Math.round((downPayment / price) * 100)}% от стоимости
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="leasing-rate">Процентная ставка (%)</Label>
                  <Input
                    id="leasing-rate"
                    type="number"
                    value={leasingRate}
                    onChange={(e) => setLeasingRate(Number(e.target.value))}
                    min={1}
                    max={50}
                    step={0.1}
                  />
                </div>
              </div>

              {/* Срок лизинга */}
              <div className="space-y-2">
                <Label>Срок лизинга (месяцы)</Label>
                <div className="grid grid-cols-3 gap-2">
                  {leasingTerms.map((term) => (
                    <Button
                      key={term}
                      variant={leasingTerm === term ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLeasingTerm(term)}
                      className="text-xs"
                    >
                      {term} мес.
                    </Button>
                  ))}
                </div>
              </div>

              {/* Результаты лизинга */}
              {leasingResult && (
                <div className="space-y-4">
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Ежемесячный платеж</span>
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {formatCurrency(leasingResult.monthlyPayment)}
                      </div>
                    </div>

                    <div className="p-4 bg-accent/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">Переплата</span>
                      </div>
                      <div className="text-2xl font-bold text-accent">
                        {formatCurrency(leasingResult.overpayment)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Стоимость техники:</span>
                      <span className="font-medium">{formatCurrency(price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Первоначальный взнос:</span>
                      <span className="font-medium">{formatCurrency(downPayment)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Сумма лизинга:</span>
                      <span className="font-medium">{formatCurrency(price - downPayment)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Общая сумма выплат:</span>
                      <span className="font-medium">{formatCurrency(leasingResult.totalAmount)}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Подать заявку на лизинг
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="installment" className="space-y-6">
            <div className="space-y-4">
              {/* Срок рассрочки */}
              <div className="space-y-2">
                <Label>Срок рассрочки (месяцы)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {installmentTerms.map((term) => (
                    <Button
                      key={term}
                      variant={installmentTerm === term ? "default" : "outline"}
                      size="sm"
                      onClick={() => setInstallmentTerm(term)}
                    >
                      {term} {term === 1 ? 'месяц' : term < 5 ? 'месяца' : 'месяцев'}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Рассрочка 0% - без переплат и скрытых комиссий
                </p>
              </div>

              {/* Результаты рассрочки */}
              <div className="space-y-4">
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-accent/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">Ежемесячный платеж</span>
                    </div>
                    <div className="text-2xl font-bold text-accent">
                      {formatCurrency(calculateInstallment())}
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Переплата</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      0 ₽
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">График платежей:</h4>
                  <div className="space-y-2">
                    {Array.from({ length: installmentTerm }, (_, index) => (
                      <div key={index} className="flex justify-between p-3 bg-muted/50 rounded">
                        <span className="text-sm">
                          {index + 1} платеж ({new Date(Date.now() + (index + 1) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })})
                        </span>
                        <span className="font-medium">{formatCurrency(calculateInstallment())}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Итого к оплате:</div>
                      <div className="text-sm text-muted-foreground">За {installmentTerm} месяцев</div>
                    </div>
                    <div className="text-xl font-bold text-primary">
                      {formatCurrency(price)}
                    </div>
                  </div>
                </div>

                <Button className="w-full" size="lg" variant="outline">
                  Оформить рассрочку 0%
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};