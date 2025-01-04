import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

type SkeletonProps = {
  className?: string;
  height: number;
  width: number;
};

export default function Skeleton({ className, height, width }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3));
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);
  return (
    <Animated.View
      className={className}
      style={{ opacity: opacity.current, height, width }}
    />
  );
}
