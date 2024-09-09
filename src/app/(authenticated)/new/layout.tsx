import { TooltipProvider } from '@/components/ui/tooltip';

export default function NewLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider
      disableHoverableContent
      delayDuration={500}
      skipDelayDuration={0}
    >
      {children}
    </TooltipProvider>
  );
}
