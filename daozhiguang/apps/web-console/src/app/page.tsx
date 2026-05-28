'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => { router.replace('/dashboard'); }, [router]);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] animate-pulse flex items-center justify-center text-2xl mb-4">道</div>
        <div className="text-[#94a3b8] text-sm">DZS-OS 加载中...</div>
      </div>
    </div>
  );
}
