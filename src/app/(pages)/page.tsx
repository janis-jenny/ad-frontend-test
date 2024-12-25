'use client';
import { Suspense } from 'react';
import Loading from '@/components/ui/Loading';
import CatalogView from '@/components/features/catalog/CatalogView';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CatalogView />
    </Suspense>
  );
}

