import { TrendingUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full   mt-auto">
      <div className=" py-8 w-full">
        <div className="text-center text-gray-400 text-sm w-full mx-auto">
          <p className="sm:text-sm text-xs text-center break-words flex items-center justify-center gap-1">
            © 2025 SmartBuy - Tu asistente para ahorrar en compras online
            <span className="hidden sm:block">
              <TrendingUp className="h-4 w-4 text-green-400 ml-1" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
