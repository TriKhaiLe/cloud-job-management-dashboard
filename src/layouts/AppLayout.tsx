import React from "react";
import hero from "../assets/hero.png";
import { Bell, Search, User } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  rightPanel,
}) => {
  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans text-gray-900">
      {/* Left Sidebar */}
      <aside className="flex w-55 flex-col border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <img src={hero} className="mr-4 h-8 w-8 rounded-full object-cover" />
          <h2 className="text-base font-medium">Cloud Platform</h2>
        </div>
        <nav className="flex flex-1 flex-col gap-2 px-3 py-4">
          <button className="flex items-center rounded-md px-3 py-2 text-left text-gray-600 hover:bg-gray-100">
            Dashboard
          </button>
          <button className="flex items-center rounded-md bg-gray-100 px-3 py-2 text-left font-medium text-gray-900">
            Jobs
          </button>
          <button className="flex items-center rounded-md px-3 py-2 text-left text-gray-600 hover:bg-gray-100">
            Billing
          </button>
        </nav>
        <div className="border-t border-gray-200 p-4">
          <button className="text-gray-600 hover:text-gray-900">
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
          <h1 className="text-2xl font-semibold">Jobs Dashboard</h1>
          <div className="flex items-center gap-6">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-90 rounded-md border border-gray-300 py-1.5 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="flex items-center gap-2">
              <User className="h-9 w-9 rounded-full border-2 border-gray-300" />
              <span className="text-base font-medium">User Name</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex flex-1 overflow-auto">
          <div className="flex-1 overflow-auto p-8">{children}</div>

          {/* Right Panel */}
          {rightPanel && (
            <aside className="w-100 overflow-auto border-l border-gray-200 bg-white">
              {rightPanel}
            </aside>
          )}
        </div>
      </main>
    </div>
  );
};
