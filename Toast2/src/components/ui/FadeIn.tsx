// FadeIn.tsx
import { useEffect, useRef } from 'react';
import type { ReactNode, CSSProperties } from 'react';

type FadeInProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
};

export default function FadeIn({ children, className = '', style = {}, delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(32px)';
      el.style.transition = 'opacity 0.75s cubic-bezier(.4,0,.2,1), transform 0.75s cubic-bezier(.4,0,.2,1)';
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    }
  }, [delay]);

  return (
    <div ref={ref} className={className} style={{ ...style, willChange: 'opacity, transform' }}>
      {children}
    </div>
  );
}
