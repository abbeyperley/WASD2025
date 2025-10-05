import React from 'react';

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export function Carousel<T>({ items, renderItem, className }: CarouselProps<T>) {
  const [current, setCurrent] = React.useState(0);

  if (!items.length) return null;

  const prev = () => setCurrent((c) => (c === 0 ? items.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === items.length - 1 ? 0 : c + 1));

  return (
    <div className={`flex items-center ${className || ''}`}>
      <button onClick={prev} aria-label="Previous" className="mx-2 text-2xl">&#8592;</button>
      <div className="flex-1">{renderItem(items[current], current)}</div>
      <button onClick={next} aria-label="Next" className="mx-2 text-2xl">&#8594;</button>
    </div>
  );
}
