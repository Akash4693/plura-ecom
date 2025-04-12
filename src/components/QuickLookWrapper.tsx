'use client';

import { Product } from '@/lib/types/productTypes';
import QuickLookModal from './QuickLookModal';

type Props = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
};

export default function QuickLookWrapper({ product, isOpen, onClose }: Props) {
  return (
    <QuickLookModal
      product={product}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}
