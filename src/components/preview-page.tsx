'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface PagePreviewProps {
  url: string;
  onClose: () => void;
}

export function PagePreview({ url, onClose }: PagePreviewProps) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg bg-gray-800">
      <div className="flex items-center justify-between bg-gray-700 p-2">
        <span className="truncate text-sm text-gray-300">{url}</span>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="relative aspect-video">
        {/* add a iframe to show the page */}
        <iframe
          className="h-full w-full"
          src={url}
          title="Page Preview"
          allowFullScreen
        />
      </div>
    </div>
  );
}
