'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';

export const GoBack = () => {
  const router = useRouter();

  return (
    <Button variant="outline" className="mb-8" onClick={() => router.back()}>
      <ArrowLeft size={16} className="mr-2" /> Go back
    </Button>
  );
};
