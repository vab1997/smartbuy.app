import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ConfirmationModalProps = {
  trigger: React.ReactNode;
  title: string;
  description: string;
  onAccept: () => void;
  acceptButtonText?: string;
  rejectButtonText?: string;
  disabled?: boolean;
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  trigger,
  title,
  description,
  onAccept,
  acceptButtonText = 'Si',
  rejectButtonText = 'No',
  disabled = false,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="border-border">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onAccept}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'text-white border-border cursor-pointer hover:opacity-80'
            )}
          >
            {acceptButtonText}
          </AlertDialogAction>
          <AlertDialogCancel
            disabled={disabled}
            className={cn(
              buttonVariants({ variant: 'destructive' }),
              'text-white border-border cursor-pointer hover:bg-destructive-hover'
            )}
          >
            {rejectButtonText}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
