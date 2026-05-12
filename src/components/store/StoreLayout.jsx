import React from "react";
import { Outlet } from "react-router-dom";
import TopBanner from "@/components/launchMetro/TopBanner";
import MetroStoreHeader from "@/components/launchMetro/MetroStoreHeader";
import MetroLaunchFooter from "@/components/launchMetro/MetroLaunchFooter";

export default function StoreLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-main overflow-x-hidden" dir="rtl">
      <TopBanner />
      <MetroStoreHeader />
      <main className="flex-1 metro-theme bg-white text-foreground">
        <Outlet />
      </main>
      <MetroLaunchFooter />
    </div>
  );
}