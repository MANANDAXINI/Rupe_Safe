'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Chrome, Loader2 } from 'lucide-react';
import { signInWithGoogle } from '@/lib/firebaseClient';
import { toast } from 'sonner';

interface GoogleAuthButtonProps {
  text?: string;
}

export default function GoogleAuthButton({ text = 'Continue with Google' }: GoogleAuthButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
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

      toast.success('Signed in successfully!');
      router.push('/');
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to sign in with Google');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={handleGoogleAuth}
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