import React from 'react';
import Link from 'next/link';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <Link href="/" className="text-3xl font-bold text-blue-600">RupeSafe</Link>
            </div>
            <div className="w-full max-w-md space-y-8">
                {children}
            </div>
        </div>
    );
}
