import { useEffect, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {}

const useIntersectionObserver = <T extends HTMLElement>(
  ref: RefObject<T>,
  options?: UseIntersectionObserverOptions
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
};

export default useIntersectionObserver;
