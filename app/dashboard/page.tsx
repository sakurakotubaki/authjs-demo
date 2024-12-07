'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/login'
    });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Sign out
            </button>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">
              Welcome, {session?.user?.email}!
            </p>
            <div className="bg-gray-50 p-4 rounded">
              <h2 className="font-semibold text-gray-700">Your JWT Token:</h2>
              <p className="mt-2 text-sm text-gray-500 break-all">
                {session?.user?.token || 'No token available'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
