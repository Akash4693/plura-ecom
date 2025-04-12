import { create, StateCreator } from 'zustand';

export type WishlistItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type WishlistState = {
  items: WishlistItem[];
  addItem: (item: WishlistItem, userId: string) => void;
  removeItem: (id: number, userId: string) => void;
  loadWishlist: (userId: string) => void;
  isItemWishlisted: (id: number) => boolean;
  syncWishlist: () => void; // New method to sync with server
};

const wishlistStoreCreator: StateCreator<WishlistState> = (set, get) => ({
  items: [],

  addItem: (item, userId) => {
    const current = get().items;
    const isAlreadyAdded = current.some((i) => i.id === item.id);
    if (isAlreadyAdded) return;

    const updated = [...current, item];
    localStorage.setItem(`wishlist-${userId}`, JSON.stringify(updated));
    set({ items: updated });
    
    // Try syncing with the server immediately if online
    if (navigator.onLine) {
      get().syncWishlist();
    }
  },

  removeItem: (id, userId) => {
    const updated = get().items.filter((item) => item.id !== id);
    localStorage.setItem(`wishlist-${userId}`, JSON.stringify(updated));
    set({ items: updated });
    
    // Try syncing with the server immediately if online
    if (navigator.onLine) {
      get().syncWishlist();
    }
  },

  loadWishlist: (userId) => {
    try {
      const raw = localStorage.getItem(`wishlist-${userId}`);
      const stored: WishlistItem[] = raw ? JSON.parse(raw) : [];
      set({ items: stored });
    } catch (e) {
      console.error('Failed to load wishlist', e);
      set({ items: [] });
    }
  },

  isItemWishlisted: (id) => {
    return get().items.some((item) => item.id === id);
  },

  syncWishlist: async () => {
    const wishlist = get().items;
    const userId = 'someUserId'; // Replace with actual userId

    // Sync the wishlist to the server
    try {
      const response = await fetch('/api/sync-wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wishlist, userId }),
      });

      if (response.ok) {
        // Sync successful, clear any failed sync attempts from localStorage
        localStorage.removeItem('failed-wishlist-sync');
      } else {
        throw new Error('Failed to sync wishlist');
      }
    } catch (error) {
      console.error('Error syncing wishlist:', error);
      // Store the failed wishlist data for later sync
      localStorage.setItem('failed-wishlist-sync', JSON.stringify(wishlist));
    }
  },
});

export const useWishlistStore = create<WishlistState>(wishlistStoreCreator);
