
import React from 'react';
import { cn } from "@/lib/utils";

type AnimationType = 'fade-up' | 'fade-in' | 'scale-in' | 'bounce-in' | 'slide-in' | 'none';

interface AnimatedElementProps {
  children: React.ReactNode;
  animation: AnimationType;
  delay?: number;
  className?: string;
  once?: boolean;
}

export default function AnimatedElement({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
  once = true,
}: AnimatedElementProps) {
  const style = delay ? { animationDelay: `${delay}ms` } : {};
  
  const animationClass = animation === 'none' ? '' : animation;
  
  return (
    <div 
      className={cn(animationClass, className)}
      style={style}
    >
      {children}
    </div>
  );
}
