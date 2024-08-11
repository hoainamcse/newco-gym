import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function merge<T>(
  a: T[],
  b: T[],
  predicate: (a: T, b: T) => boolean = (a, b) => a === b
): T[] {
  const c = [...a]; // copy to avoid side effects
  // add all items from B to copy C if they're not already present
  b.forEach((bItem) => {
    if (!c.some((cItem) => predicate(bItem, cItem))) {
      c.push(bItem);
    }
  });
  return c;
}
