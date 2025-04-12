"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterSidebarProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export default function FilterSidebar({
  categories,
  selected,
  onSelect,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="w-full md:w-60 mb-6 md:mb-0">
      <button
        className="text-sm font-medium mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3"
          >
            <button
              onClick={() => onSelect(null)}
              className={`block w-full text-left px-4 py-2 rounded ${
                !selected ? "bg-accent" : "hover:bg-muted"
              }`}
            >
              All Categories
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelect(cat)}
                className={`block w-full text-left px-4 py-2 rounded capitalize ${
                  selected === cat ? "bg-accent" : "hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
