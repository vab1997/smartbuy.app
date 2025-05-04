import { Badge } from '@/components/ui/badge';

export function StoreBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <Badge variant="outline" className="text-sm border-border">
        Amazon
      </Badge>
      <Badge variant="outline" className="text-sm border-border">
        MercadoLibre
      </Badge>
      <Badge variant="outline" className="text-sm border-border">
        eBay
      </Badge>
      <Badge variant="outline" className="text-sm border-border">
        AliExpress
      </Badge>
      <Badge variant="outline" className="text-sm border-border">
        + Cientos de tiendas más
      </Badge>
    </div>
  );
}
