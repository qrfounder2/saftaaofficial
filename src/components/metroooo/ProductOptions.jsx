import React from 'react';
import { Minus, Plus, Ruler, Scissors } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const defaultSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];
const defaultColors = [
  { name: 'Natural', value: '#D4B896', border: '#c0a47e' },
  { name: 'Black', value: '#000000', border: '#333' },
];

export default function ProductOptions({
  selectedSize, setSelectedSize,
  selectedColor, setSelectedColor,
  quantity, setQuantity,
  sizes = defaultSizes,
  colors = defaultColors,
  unitPrice = 330,
  comparePrice,
  productId,
}) {
  const navigate = useNavigate();
  const displayCompare =
    comparePrice != null &&
    Number(comparePrice) > Number(unitPrice) &&
    Number.isFinite(Number(comparePrice));

  const handleCheckout = () => {
    if (!productId) return;
    const colorMeta = colors.find((c) => c.name === selectedColor);
    const colorLabel = colorMeta?.label_ar || colorMeta?.name || selectedColor;
    const params = new URLSearchParams({
      product: productId,
      pack: '1',
      price: String(unitPrice),
      qty: String(quantity),
      size: selectedSize,
      colorLabel: String(colorLabel),
    });
    navigate(`/order?${params.toString()}`);
  };
  return (
    <div className="space-y-5">
      {/* Options Card */}
      <div className="bg-muted/60 rounded-2xl p-5 space-y-5">
        {/* Color */}
        <div>
          <h3 className="font-bold text-base mb-3">اللون</h3>
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.name)}
                className={`w-11 h-11 rounded-full transition-all ${
                  selectedColor === color.name
                    ? 'ring-2 ring-primary ring-offset-2'
                    : 'ring-1 ring-border'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <h3 className="font-bold text-base mb-3">المقاس</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`min-w-[52px] h-11 px-3 rounded-lg border text-sm font-bold transition-all ${
                  selectedSize === size
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background hover:border-foreground/40'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Size guide links */}
      <div className="flex items-center justify-center gap-8 text-sm">
        <button className="flex items-center gap-1.5 font-bold hover:opacity-70 transition-opacity underline underline-offset-2">
          <Scissors className="w-4 h-4" />
          غرفة القياس الذكية
        </button>
        <button className="flex items-center gap-1.5 font-bold hover:opacity-70 transition-opacity underline underline-offset-2">
          <Ruler className="w-4 h-4" />
          دليل المقاسات
        </button>
      </div>

      {/* Price */}
      <div className="text-center flex flex-col items-center gap-1">
        {displayCompare && (
          <span className="text-sm text-muted-foreground line-through font-bold">
            ر.س {Number(comparePrice).toFixed(2)}
          </span>
        )}
        <div>
          <span className="text-3xl font-black">ر.س</span>
          <span className="text-3xl font-black mr-1">
            {Number(unitPrice).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Quantity + Add to cart row */}
      <div className="flex items-stretch gap-3">
        {/* Add to cart - takes most space */}
        <Button
          type="button"
          className="flex-1 h-14 rounded-2xl text-lg font-black gap-2"
          size="lg"
          onClick={handleCheckout}
          disabled={!productId}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <line x1="3" x2="21" y1="6" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          أضف إلى السلة
        </Button>

        {/* Quantity */}
        <div className="flex items-center border border-border rounded-2xl overflow-hidden bg-muted/40">
        <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 h-full hover:bg-border transition-colors text-muted-foreground"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center text-lg font-bold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 h-full bg-foreground/80 text-background hover:bg-foreground transition-colors rounded-l-xl"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}