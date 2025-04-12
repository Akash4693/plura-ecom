import { ReactNode } from 'react';

export const ProductGrid = ({ children }: { children: ReactNode }) => (
  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
    {children}
  </section>
);
