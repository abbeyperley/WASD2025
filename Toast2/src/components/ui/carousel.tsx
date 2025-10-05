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
      <button
        onClick={prev}
        aria-label="Previous"
        className="mx-4 carousel-arrow"
        style={{
          background: 'transparent',
          border: 'none',
          borderRadius: '50%',
          width: 56,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 36,
          cursor: 'pointer',
          marginRight: 32,
          transition: 'background 0.2s',
        }}
      >
        &#8592;
      </button>
      <div className="flex-1">{renderItem(items[current], current)}</div>
      <button
        onClick={next}
        aria-label="Next"
        className="mx-4 carousel-arrow"
        style={{
          background: 'transparent',
          border: 'none',
          borderRadius: '50%',
          width: 56,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 36,
          cursor: 'pointer',
          marginLeft: 32,
          transition: 'background 0.2s',
        }}
      >
        &#8594;
      </button>
      <style>{`
        .carousel-arrow:hover, .carousel-arrow:focus {
          background: rgba(0,0,0,0.25) !important;
        }
      `}</style>
    </div>
  );
}
