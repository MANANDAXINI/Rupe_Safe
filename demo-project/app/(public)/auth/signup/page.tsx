'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/lib/validators';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';

import { Button } from '@/components/ui/button';
import GoogleAuthButton from '@/components/auth/GoogleAuthButton';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useAuth(); // ADD THIS LINE

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    async function onSubmit(data: SignupFormValues) {
        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Something went wrong');
            }

            setUser(result.user); // ADD THIS LINE - Update context immediately
            toast.success('Account created successfully!');
            router.push('/'); // Redirect to home or dashboard
            router.refresh(); // Refresh to update auth state
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full border-none shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                <CardDescription className="text-center">
                    Enter your email below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="m@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="******" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign Up
                        </Button>
                    </form>
                </Form>
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-gray-900 px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <GoogleAuthButton text="Sign up with Google" />
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link href="/auth/signin" className="text-primary hover:underline font-medium">
                        Sign in
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
