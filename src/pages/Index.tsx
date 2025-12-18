import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateNumber = () => {
    if (minValue >= maxValue) {
      return;
    }

    setIsAnimating(true);
    
    const randomNum = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    
    setTimeout(() => {
      setCurrentNumber(randomNum);
      setHistory(prev => [randomNum, ...prev.slice(0, 9)]);
      setIsAnimating(false);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8 animate-fade-in">
        
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Генератор чисел
          </h1>
          <p className="text-muted-foreground text-lg">
            Создавайте случайные числа одним нажатием
          </p>
        </div>

        <Card className="p-8 shadow-2xl border-2">
          <div className="space-y-8">
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="min" className="text-sm font-medium">
                  Минимум
                </Label>
                <Input
                  id="min"
                  type="number"
                  value={minValue}
                  onChange={(e) => setMinValue(Number(e.target.value))}
                  className="text-lg h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max" className="text-sm font-medium">
                  Максимум
                </Label>
                <Input
                  id="max"
                  type="number"
                  value={maxValue}
                  onChange={(e) => setMaxValue(Number(e.target.value))}
                  className="text-lg h-12"
                />
              </div>
            </div>

            <div className="flex items-center justify-center min-h-[200px]">
              {currentNumber !== null ? (
                <div
                  key={currentNumber}
                  className={`text-8xl font-bold text-primary ${
                    isAnimating ? 'opacity-50 scale-95' : 'animate-number-pop'
                  }`}
                >
                  {currentNumber}
                </div>
              ) : (
                <div className="text-6xl text-muted-foreground/30">?</div>
              )}
            </div>

            <Button
              onClick={generateNumber}
              disabled={minValue >= maxValue}
              size="lg"
              className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Icon name="Sparkles" className="mr-2" size={24} />
              Сгенерировать число
            </Button>

            {minValue >= maxValue && (
              <p className="text-center text-sm text-destructive animate-fade-in">
                Минимум должен быть меньше максимума
              </p>
            )}
          </div>
        </Card>

        {history.length > 0 && (
          <Card className="p-6 shadow-lg animate-scale-in">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Icon name="History" size={18} />
                <span>История генераций</span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {history.map((num, index) => (
                  <div
                    key={`${num}-${index}`}
                    className="px-4 py-2 bg-secondary rounded-lg text-lg font-semibold text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
