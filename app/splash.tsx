import { SplashScreenContent } from '@/components/SplashScreen';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreenContent />;
}
