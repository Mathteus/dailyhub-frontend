
import type React from 'react';
import { useEffect, useState } from 'react';

interface AvatarProps {
  seed: string;
  size?: number;
}

export function Avatar({ seed, size = 120 }: AvatarProps) {
  const [responsiveSize, setResponsiveSize] = useState(size);
  
  useEffect(() => {
    // Calculate responsive size based on viewport width
    const calculateSize = () => {
      const newSize = Math.min(size, Math.floor(window.innerWidth / 8));
      setResponsiveSize(newSize);
    };
    
    // Calculate on mount
    calculateSize();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateSize);
    return () => window.removeEventListener('resize', calculateSize);
  }, [size]);
  
  // Use a random seed if the provided one is "guest"
  const finalSeed = seed === "guest" ? Math.random().toString(36).substring(2, 8) : seed;
  
  // Add memo to avoid unnecessary rerendering
  const avatarUrl = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${finalSeed}`;
  
  return (
    <img 
      src={avatarUrl}
      alt="Avatar"
      className="rounded-full"
      width={responsiveSize}
      height={responsiveSize}
      style={{ width: responsiveSize, height: responsiveSize }}
    />
  );
};
