"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortDropdownProps {
  selected: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({ selected, onChange }: SortDropdownProps) {
  return (
    <div className="w-60">
      <Select value={selected} onValueChange={onChange}>
        <SelectTrigger className="focus:ring-2 ring-ring transition-all duration-300">
          <SelectValue placeholder="Sort by: Default" />
        </SelectTrigger>

        <SelectContent className="z-50 animate-in fade-in slide-in-from-top-1">
          <SelectGroup>
            <SelectItem value="default">Sort by: Default</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
