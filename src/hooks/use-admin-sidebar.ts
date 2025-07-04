import { useState } from "react";

export function useAdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return { sidebarOpen, setSidebarOpen };
} 