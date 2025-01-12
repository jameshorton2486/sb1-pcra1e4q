import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard, Calendar, MessageSquare, FileText, 
  Settings, HelpCircle, LogOut, Menu, ChevronLeft,
  User, Bell
} from 'lucide-react';

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
}

export function MainNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const navigationItems: NavigationItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Calendar', path: '/calendar', icon: Calendar },
    { label: 'Messages', path: '/messages', icon: MessageSquare, badge: 3 },
    { label: 'Resources', path: '/resources', icon: FileText },
    { label: 'Settings', path: '/settings', icon: Settings },
    { label: 'Support', path: '/support', icon: HelpCircle }
  ];

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      setIsOpen(!isMobileView);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 bg-[var(--sidebar-bg)] transform transition-all duration-300 ease-in-out
          ${isOpen ? 'w-[var(--sidebar-width-expanded)]' : 'w-[var(--sidebar-width-collapsed)]'}
          ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 bg-[var(--sidebar-active)]">
          <div className="flex items-center text-white">
            <User className="h-8 w-8" />
            <span className={`ml-2 font-semibold transition-opacity duration-200 ${
              isOpen ? 'opacity-100' : 'opacity-0 hidden lg:block'
            }`}>
              LegalDepo Pro
            </span>
          </div>
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft className={`h-5 w-5 transform transition-transform duration-200 ${
                isOpen ? '' : 'rotate-180'
              }`} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2 space-y-1" role="navigation">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                isMobile && setIsOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2 rounded-md transition-colors relative group
                ${location.pathname === item.path
                  ? 'bg-[var(--sidebar-active)] text-white'
                  : 'text-[var(--sidebar-text-muted)] hover:bg-[var(--sidebar-hover)] hover:text-white'
                }`}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className={`ml-3 transition-opacity duration-200 ${
                isOpen ? 'opacity-100' : 'opacity-0 hidden lg:block'
              }`}>
                {item.label}
              </span>
              {item.badge && (
                <span className={`absolute right-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 transition-opacity duration-200 ${
                  isOpen ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'
                }`}>
                  {item.badge}
                </span>
              )}
              {!isOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--sidebar-border)]">
          <div className={`flex items-center mb-4 ${!isOpen && 'justify-center'}`}>
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            {isOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium text-white truncate">{user?.email}</p>
                <p className="text-xs text-[var(--sidebar-text-muted)]">{user?.role || 'User'}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleSignOut}
            className={`w-full flex items-center px-3 py-2 rounded-md text-[var(--sidebar-text-muted)] hover:bg-[var(--sidebar-hover)] hover:text-white transition-colors ${
              !isOpen && 'justify-center'
            }`}
          >
            <LogOut className="h-5 w-5" />
            {isOpen && <span className="ml-3">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${
        isOpen ? 'lg:ml-[var(--sidebar-width-expanded)]' : 'lg:ml-[var(--sidebar-width-collapsed)]'
      }`}>
        {/* Your existing content */}
      </div>
    </>
  );
}