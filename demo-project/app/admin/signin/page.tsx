'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Chrome, Loader2 } from 'lucide-react';
import { signInWithGoogle } from '@/lib/firebaseClient';

export default function AdminSignInPage() {
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const idToken = await signInWithGoogle();

            const response = await fetch('/api/admin/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken }),
            });

            if (response.ok) {
                toast.success('Admin sign-in successful! Redirecting...');
                // Force a hard navigation to ensure cookies are recognized by the server/middleware
                window.location.href = '/admin';
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Failed to sign in as admin.');
            }
        } catch (error: any) {
            console.error('Admin sign-in failed:', error);
            toast.error(error.message || 'An error occurred during sign-in.');
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Panel</h1>
                <p className="text-slate-500 mb-8">Please sign in to continue.</p>
                <Button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        <>
                            <Chrome className="w-5 h-5 mr-3" />
                            Sign in with Google
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}