import React from 'react';

export default function SizeSelector({ sizes = [], selected, onSelect }) {
  return (
    <div>
      <h4 className="text-sm font-bold mb-2">المقاس</h4>
      <div className="flex flex-wrap gap-2">
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`min-w-[48px] h-10 px-3 rounded-lg border-2 text-sm font-semibold transition-all ${
              selected === size
                ? 'border-foreground bg-foreground text-background'
                : 'border-border hover:border-foreground/40'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}