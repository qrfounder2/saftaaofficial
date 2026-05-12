import React from 'react';
import { Check } from 'lucide-react';

export default function ColorSelector({ colors = [], selected, onSelect }) {
  return (
    <div>
      <h4 className="text-sm font-bold mb-2">
        اللون: <span className="font-normal text-muted-foreground">{selected}</span>
      </h4>
      <div className="flex gap-2">
        {colors.map(color => (
          <button
            key={color.name}
            onClick={() => onSelect(color.name_ar)}
            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
              selected === color.name_ar ? 'border-foreground scale-110' : 'border-border hover:border-foreground/40'
            }`}
            style={{ backgroundColor: color.hex }}
            title={color.name_ar}
          >
            {selected === color.name_ar && (
              <Check className={`w-4 h-4 ${color.hex === '#000000' || color.hex === '#1a1a1a' ? 'text-white' : 'text-foreground'}`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}