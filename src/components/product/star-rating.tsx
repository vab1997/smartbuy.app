import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
}

export const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} className="relative">
          <Star className="w-5 h-5 text-gray-700" fill="currentColor" />
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{
              width: `${Math.max(0, Math.min(100, (rating - star + 1) * 100))}%`,
            }}
          >
            <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
          </div>
        </div>
      ))}
      {`(${rating})`}
    </div>
  );
};
