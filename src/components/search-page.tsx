'use client';

import { useRateLimit } from '@/hooks/use-rate-limit';
import { Search } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { RateLimitModal } from './rate-limit-modal';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function SearchPage({ url }: { url: string }) {
  const [, setSearchUrl] = useQueryState('url', parseAsString);
  const { isBlocked, getRemainingTime, incrementSearch, reset } =
    useRateLimit();
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const [showModal, setShowModal] = useState(() => {
    const timeToReset = getRemainingTime();
    if (timeToReset === 0) {
      reset();
    }
    return false;
  });

  useEffect(() => {
    if (!showModal) return;

    const interval = setInterval(() => {
      const time = getRemainingTime();
      setRemainingTime(time);

      if (time === 0) {
        reset();
        setShowModal(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [showModal, getRemainingTime, reset]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get('url');

    if (!value) {
      toast.error('Por favor, ingrese una URL para buscar');
      return;
    }

    if (isBlocked || !incrementSearch()) {
      setRemainingTime(getRemainingTime());
      setShowModal(true);
      return;
    }

    setSearchUrl(value.toString(), { shallow: false });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (getRemainingTime() === 0) {
      reset();
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch}>
        <div className="relative flex items-center gap-2 justify-center">
          <Input
            type="text"
            name="url"
            placeholder="Ingresar URL del producto (ej: https://www.mercadolibre.com/...)"
            className="w-full rounded-lg border border-gray-700/80 bg-transparent text-base hover:border-gray-700 transition-colors"
            defaultValue={url}
          />
          <Button
            variant="outline"
            type="submit"
            className="text-black bg-white border border-white rounded-md px-3 py-1 text-sm hover:opacity-85 hover:bg-white hover:text-black transition-opacity"
          >
            <Search className="size-4" />
            Buscar
          </Button>
        </div>
      </form>

      <RateLimitModal
        isOpen={showModal}
        remainingTime={remainingTime}
        onClose={handleCloseModal}
      />
    </div>
  );
}
