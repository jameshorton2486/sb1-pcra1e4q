import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  Bell, 
  Mic, 
  FileText, 
  BarChart2, 
  Settings,
  Upload,
  HelpCircle,
  Book,
  Menu,
  Wifi,
  User,
  LogOut
} from 'lucide-react';
import { DepositionCalendar } from './DepositionCalendar';
import { TranscriptionWorkspace } from './TranscriptionWorkspace';
import { AudioEnhancement } from './AudioEnhancement';
import { SecurityPanel } from './SecurityPanel';
import { RecentWork } from './RecentWork';
import { PerformanceMetrics } from './PerformanceMetrics';
import { QuickActions } from './QuickActions';
import { Notifications } from './Notifications';

export function Dashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAudioSettings, setShowAudioSettings] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-900">LegalDepo Pro</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center text-green-500">
                <Wifi className="h-5 w-5" />
                <span className="ml-1 text-sm">Connected</span>
              </div>

              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              </button>

              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.email || '')}&background=0D8ABC&color=fff`}
                  alt="Profile"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {showNotifications && (
          <Notifications onClose={() => setShowNotifications(false)} />
        )}
      </header>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-gray-800 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out z-20`}>
        <nav className="mt-16 px-2 space-y-1">
          <SidebarLink icon={Calendar} text="Calendar" active />
          <SidebarLink icon={Mic} text="Transcription" />
          <SidebarLink icon={FileText} text="Documents" />
          <SidebarLink icon={BarChart2} text="Analytics" />
          <SidebarLink icon={Upload} text="Uploads" />
          <SidebarLink icon={Book} text="Resources" />
          <SidebarLink icon={Settings} text="Settings" onClick={() => setShowAudioSettings(!showAudioSettings)} />
          <SidebarLink icon={HelpCircle} text="Support" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 ${sidebarOpen ? 'ml-64' : ''} transition-margin duration-200 ease-in-out`}>
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Deposition Calendar */}
            <div className="col-span-12 xl:col-span-8">
              <DepositionCalendar />
            </div>

            {/* Quick Actions */}
            <div className="col-span-12 xl:col-span-4">
              <QuickActions />
            </div>

            {/* Active Transcription */}
            <div className="col-span-12">
              <TranscriptionWorkspace />
            </div>

            {/* Audio Enhancement Settings */}
            {showAudioSettings && (
              <div className="col-span-12 lg:col-span-6">
                <AudioEnhancement />
              </div>
            )}

            {/* Security Panel */}
            {showAudioSettings && (
              <div className="col-span-12 lg:col-span-6">
                <SecurityPanel />
              </div>
            )}

            {/* Recent Work */}
            <div className="col-span-12 lg:col-span-8">
              <RecentWork />
            </div>

            {/* Performance Metrics */}
            <div className="col-span-12 lg:col-span-4">
              <PerformanceMetrics />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon: Icon, text, active = false, onClick }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        active
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <Icon className="mr-3 h-6 w-6" />
      {text}
    </a>
  );
}