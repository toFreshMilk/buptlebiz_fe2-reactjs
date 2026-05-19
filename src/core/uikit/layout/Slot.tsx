import React, { Suspense } from 'react';
import { useTenantComponent } from '@/core/hooks/useTenantModule';
import { LoadingBar } from '@/core/uikit/feedback/LoadingBar';
import type { StandardComponentKey } from '@/standard/registry';

interface SlotProps {
  name: StandardComponentKey;
  fallback?: React.ReactNode;
}

function SlotRenderer({ name }: { name: StandardComponentKey }) {
  const { Component } = useTenantComponent(name);
  return <Component />;
}

export function Slot({ name, fallback }: SlotProps) {
  return (
    <Suspense fallback={fallback ?? <LoadingBar />}>
      <SlotRenderer name={name} />
    </Suspense>
  );
}
