
import { useEffect, useRef } from 'react';

export default function AnimatedElement({ 
  children, 
  animation = "fade-in", 
  delay = 0, 
  duration = null,
  threshold = 0.3,
  triggerOnce = true,
  className = ""
}) {
  const elementRef = useRef(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Apply initial classes and delay
    element.style.opacity = "0";
    element.dataset.animation = animation;
    
    if (delay) {
      element.style.animationDelay = `${delay}ms`;
    }
    
    if (duration) {
      element.style.animationDuration = `${duration}ms`;
    }
    
    // Set up intersection observer to trigger animation when element is in view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animation
          element.classList.add('animate-visible');
          element.style.opacity = "1";
          
          // If we only want to trigger once, unobserve the element
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          // If we want to retrigger, remove the class when out of view
          element.classList.remove('animate-visible');
          element.style.opacity = "0";
        }
      });
    }, {
      threshold: threshold
    });
    
    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, [animation, delay, duration, triggerOnce, threshold]);
  
  const animationClass = `animate-${animation}`;
  
  return (
    <div 
      ref={elementRef} 
      className={`animate-element ${animationClass} ${className}`}
    >
      {children}
    </div>
  );
}
