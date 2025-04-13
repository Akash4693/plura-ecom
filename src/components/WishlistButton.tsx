import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

type WishlistButtonProps = {
  isWishlisted: boolean
  onClick: () => void
}

export function WishlistButton({ isWishlisted, onClick }: WishlistButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Add to wishlist"
      className={cn(
        'p-2 rounded-full transition-colors',
        isWishlisted
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-muted text-muted-foreground hover:bg-accent'
      )}
    >
      <Heart
        size={20}
        className={cn(
          'transition-transform',
          isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
        )}
      />
    </button>
  )
}
