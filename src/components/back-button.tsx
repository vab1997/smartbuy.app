import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export function BackButton({
  href,
  backText,
}: {
  href: string;
  backText: string;
}) {
  return (
    <Link
      href={href}
      className="absolute top-4 left-4 flex items-center gap-3 text-white"
    >
      <ArrowLeftIcon className="size-4" />
      <span className="text-base">{backText}</span>
    </Link>
  );
}
