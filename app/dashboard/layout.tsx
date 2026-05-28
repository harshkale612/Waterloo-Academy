import type { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { ToastProvider } from '@/components/ui/toast';
import { SidebarProvider } from '@/components/layout/sidebar-context';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ToastProvider>
      <SidebarProvider>
        <div className="flex h-screen bg-background overflow-hidden transition-colors duration-300">
          <Sidebar notificationCount={3} />
          <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </ToastProvider>
  );
}
