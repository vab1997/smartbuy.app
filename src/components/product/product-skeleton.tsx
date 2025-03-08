'use client';
import { Check } from 'lucide-react';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

// Estados de extracción para el fallback
const extractionStates = [
  {
    status: 'Conectando con la página web...',
    icon: <Loader2 className="h-5 w-5 animate-spin" />,
  },
  {
    status: 'Analizando estructura del producto...',
    icon: <Loader2 className="h-5 w-5 animate-spin" />,
  },
  {
    status: 'Extrayendo información de precio...',
    icon: <Loader2 className="h-5 w-5 animate-spin" />,
  },
  {
    status: 'Verificando disponibilidad...',
    icon: <Loader2 className="h-5 w-5 animate-spin" />,
  },
  {
    status: '¡Información extraída con éxito! - Preparando para mostrar...',
    icon: <Check className="h-5 w-5 text-green-500" />,
  },
];

export function ProductCardSkeleton() {
  const [extractionState, setExtractionState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setExtractionState((prev) => {
        if (prev < extractionStates.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mx-auto">
      <Card className="border border-border bg-background backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {extractionStates[extractionState].icon}
            <span>Analizando producto</span>
            <Loader2 className="h-5 w-5 animate-spin" />
          </CardTitle>
          <CardDescription>
            {extractionStates[extractionState].status}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-4 w-full bg-background rounded-full overflow-hidden border border-border">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{
                width: `${(extractionState / (extractionStates.length - 1)) * 100}%`,
              }}
            ></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
