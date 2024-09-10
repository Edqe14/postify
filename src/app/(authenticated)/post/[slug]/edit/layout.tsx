import { TooltipProvider } from '@/components/ui/tooltip';

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
