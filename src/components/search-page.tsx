'use client';

import { useRateLimit } from '@/hooks/use-rate-limit';
import { Search } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { RateLimitModal } from './rate-limit-modal';
import { Button } from './ui/button';
import { Input } from './ui/input';

const UrlSchema = z
  .string({
    message: 'La URL no es válida.',
  })
  .url('La URL no es válida.');

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

    const result = UrlSchema.safeParse(value);
    if (!result.success) {
      toast.error(result.error.message);
      return;
    }

    if (isBlocked || !incrementSearch()) {
      setRemainingTime(getRemainingTime());
      setShowModal(true);
      return;
    }

    setSearchUrl(result.data.toString(), { shallow: false });
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
            className="w-full rounded-xl px-3 py-1 border border-border bg-transparent text-base hover:border-border/80 transition-colors h-[2.5lh]"
            defaultValue={url}
          />
          <Button
            variant="outline"
            type="submit"
            className="absolute cursor-pointer right-2 rounded-lg text-black bg-white hover:bg-white hover:text-black border border-white px-3 h-[1.5lh] text-sm hover:opacity-95 transition-opacity"
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
