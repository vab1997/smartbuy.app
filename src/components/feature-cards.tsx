import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bell, Search, ShoppingCart, Smile } from 'lucide-react';

export const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
      <Card className="bg-background border-border">
        <CardHeader>
          <div className="bg-gray-900 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Search className="h-6 w-6" />
          </div>
          <CardTitle>Busca Productos</CardTitle>
          <CardDescription className="text-gray-400">
            Simplemente pega la URL de cualquier producto de cualquier tienda
            online
            <Smile className="inline-block ml-1 h-4 w-4 text-yellow-400" />
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="bg-background border-border">
        <CardHeader>
          <div className="bg-gray-900 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Bell className="h-6 w-6" />
          </div>
          <CardTitle>Recibe Alertas</CardTitle>
          <CardDescription className="text-gray-400">
            Te notificamos al instante cuando el precio baja o hay una oferta
            especial
            <span className="ml-1 text-yellow-400">🔔</span>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="bg-background border-border">
        <CardHeader>
          <div className="bg-gray-900 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
            <ShoppingCart className="h-6 w-6" />
          </div>
          <CardTitle>Compra al Mejor Precio</CardTitle>
          <CardDescription className="text-gray-400">
            Aprovecha las mejores ofertas y ahorra en todas tus compras online
            <span className="ml-1 text-yellow-400">💸</span>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
