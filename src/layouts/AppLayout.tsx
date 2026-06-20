import React from "react";
import hero from "../assets/hero.png";
import { Bell, Search, User } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <img
            src={hero}
            alt="User avatar"
            className="w-8 h-8 mr-4 rounded-full object-cover"
          />
          <span className="text-xl font-bold">Cloud Platform</span>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-2 px-3">
          <button className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-gray-100 text-left">
            Dashboard
          </button>
          <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-900 font-medium rounded-md text-left">
            Jobs
          </button>
          <button className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-gray-100 text-left">
            Billing
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button className="text-gray-600 hover:text-gray-900">
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-2xl font-semibold">Jobs Dashboard</h1>
          <div className="flex items-center gap-6">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="border border-gray-300 rounded-md pl-10 pr-4 py-1.5 w-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-2">
              <User className="w-9 h-9 border-2 border-gray-300 rounded-full" />
              <span className="text-base font-medium">User Name</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-auto p-8">{children}</div>
      </main>
    </div>
  );
};
