import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Ruler } from 'lucide-react';

const DEFAULT_CHART = [
  { size: 'S', weight: '40 – 50', height: '1.50 – 1.60', waist: '74 - 78', hips: '94 - 98' },
  { size: 'M', weight: '51 – 62', height: '1.55 – 1.65', waist: '78 - 82', hips: '98 - 102' },
  { size: 'L', weight: '63 – 70', height: '1.65 – 1.75', waist: '82 - 86', hips: '102 - 106' },
  { size: 'XL', weight: '71 – 82', height: '1.65 – 1.80', waist: '86 - 90', hips: '106 - 110' },
  { size: '2XL', weight: '83 - 90', height: '1.80 - 1.84', waist: '90 - 94', hips: '110 - 114' },
  { size: '3XL', weight: '91 - 99', height: '1.84 - 1.88', waist: '94 - 98', hips: '114 - 118' },
  { size: '4XL', weight: '100 - 111', height: '1.88 - 1.92', waist: '98 - 112', hips: '118 - 122' },
];

export default function SizeChart({ sizeChart }) {
  const data = sizeChart?.length > 0 ? sizeChart : DEFAULT_CHART;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <Ruler className="w-3.5 h-3.5" />
          دليل المقاسات
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>دليل المقاسات</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 px-3 text-right font-bold">المقاس</th>
                <th className="py-2 px-3 text-right font-bold">الوزن (كغ)</th>
                <th className="py-2 px-3 text-right font-bold">الطول (م)</th>
                <th className="py-2 px-3 text-right font-bold">الخصر (سم)</th>
                <th className="py-2 px-3 text-right font-bold">الأرداف (سم)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/50">
                  <td className="py-2 px-3 font-bold">{row.size}</td>
                  <td className="py-2 px-3 text-muted-foreground">{row.weight}</td>
                  <td className="py-2 px-3 text-muted-foreground">{row.height}</td>
                  <td className="py-2 px-3 text-muted-foreground">{row.waist}</td>
                  <td className="py-2 px-3 text-muted-foreground">{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}