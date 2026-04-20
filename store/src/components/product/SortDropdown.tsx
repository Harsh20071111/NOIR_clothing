"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterStore } from "@/store/useFilterStore";

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export function SortDropdown() {
  const sort = useFilterStore((s) => s.sort);
  const setSort = useFilterStore((s) => s.setSort);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Sort by</span>
      <Select value={sort} onValueChange={(v) => { if (v) setSort(v); }}>
        <SelectTrigger className="w-[180px] h-10 bg-background border-border text-sm font-medium text-foreground rounded-sm focus:ring-[var(--color-gold)]/20 shadow-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-background border-border rounded-sm shadow-md">
          {sortOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-sm font-medium text-muted-foreground focus:bg-secondary focus:text-foreground rounded-sm cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
