// app/account/layout.tsx
import React from "react";
import SidebarMenu from "@/app/component/layout/ProfileSettingSideBar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-6">
      {/* Sidebar Navigation */}
      <aside className="md:w-64 mb-6 md:mb-0">
        <SidebarMenu />
      </aside>

      {/* Main Content Area */}
      <main className="md:flex-1 md:pl-6">{children}</main>
    </div>
  );
}
