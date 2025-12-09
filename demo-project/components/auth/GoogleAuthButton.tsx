'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Chrome, Loader2 } from 'lucide-react';
import { signInWithGoogle } from '@/lib/firebaseClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';

interface GoogleAuthButtonProps {
  text?: string;
}

export default function GoogleAuthButton({ text = 'Continue with Google' }: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const idToken = await signInWithGoogle();

      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Google authentication failed');
      }

      setUser(result.user);
      toast.success('Successfully signed in!');
      router.push('/');
      router.refresh();
    } catch (error: any) {
      console.error('Google Auth Error:', error);
      toast.error(error.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full bg-white dark:bg-gray-800 text-black dark:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Chrome className="mr-2 h-4 w-4" />
      )}
      {text}
    </Button>
  );
}
