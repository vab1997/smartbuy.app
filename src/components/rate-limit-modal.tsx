'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useEffect, useState } from 'react';

interface RateLimitModalProps {
  isOpen: boolean;
  remainingTime: number;
  onClose: () => void;
}

export function RateLimitModal({
  isOpen,
  remainingTime,
  onClose,
}: RateLimitModalProps) {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTimeString = () => {
      const seconds = Math.ceil(remainingTime / 1000);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      setTimeString(
        `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
      );
    };

    updateTimeString();
    const interval = setInterval(updateTimeString, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Límite de búsquedas alcanzado</AlertDialogTitle>
          <AlertDialogDescription>
            Has realizado demasiadas búsquedas sin agregar productos a tu lista.
            Por favor, agrega algún producto a tu lista o espera {timeString}{' '}
            minutos para continuar buscando.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>Entendido</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
