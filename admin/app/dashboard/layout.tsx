import React from "react";
import { auth } from "@clerk/nextjs/server";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { ThemeProvider } from "@/components/shared/themeProvider";
import { Toaster } from "sonner";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   const { userId } = auth();

  return (
    <>
      {/* //     <ThemeProvider
//       attribute="class"
//       defaultTheme="dark"
//       enableSystem
//       disableTransitionOnChange
//     > */}

      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />
          <main className="bg-muted/30 flex-1 overflow-y-auto p-4 md:p-6 dark:bg-slate-950/50">
            {children}
          </main>
        </div>
      </div>
      <Toaster position="top-right" />
      {/* //     </ThemeProvider> */}
    </>
  );
};

export default DashboardLayout;
