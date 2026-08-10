'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-4xl font-black text-slate-800 mb-2">Something went wrong!</h1>
      <p className="text-slate-600 max-w-md mb-6">
        An unhandled error occurred. Please try again.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-5 rounded-xl transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2.5 px-5 rounded-xl transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
