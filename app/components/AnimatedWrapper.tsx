'use client';

import React, { useRef, useEffect, useState } from 'react';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({ children, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`${className || ''} animated-wrapper ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
};

export default AnimatedWrapper;
