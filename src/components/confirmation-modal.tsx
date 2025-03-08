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
  isDanger?: boolean;
  disabled?: boolean;
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  trigger,
  title,
  description,
  onAccept,
  acceptButtonText = 'Si',
  rejectButtonText = 'No',
  isDanger = false,
  disabled = false,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onAccept}
            className={cn(buttonVariants({ variant: 'outline' }), 'text-white')}
          >
            {acceptButtonText}
          </AlertDialogAction>
          <AlertDialogCancel
            disabled={disabled}
            className={cn(buttonVariants({ variant: 'destructive' }))}
          >
            {rejectButtonText}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
