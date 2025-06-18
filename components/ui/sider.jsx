import { LayoutDashboard, ShoppingCart, FileText, Diamond, Heart, Edit, Settings, Trash, LogOut } from 'lucide-react';
import { useState } from 'react';



const defaultNavItems = [
  { 
    id: 'dashboard',
    name: 'Dashboard', 
    icon: <LayoutDashboard className="h-5 w-5" />,
    component: <div>Dashboard Content</div>
  },
  { 
    id: 'courses',
    name: 'My Courses', 
    icon: <ShoppingCart className="h-5 w-5" />,
    component: <div>My Courses Content</div>
  },
  // ... other items
  { 
    id: 'logout',
    name: 'Sign Out', 
    icon: <LogOut className="h-5 w-5" />,
    component: <div>Sign Out Confirmation</div>,
    isDestructive: true
  },
];

export function Sider({ 
  className = '', 
  navItems = defaultNavItems,
  defaultActiveId = 'dashboard'
}) {
  const [activeId, setActiveId] = useState(defaultActiveId);

  const activeComponent = navItems.find(item => item.id === activeId)?.component;

  return (
    <div className={`flex gap-4 ${className}`}>
      <div className="p-3 xl:p-0 lg:border border-gray-300 rounded-lg flex-none w-64">
        <div className="rounded-lg p-4 w-full">
          <nav className="space-y-1 z-50">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              const baseClasses = 'flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer';
              const activeClasses = isActive 
                ? 'text-white bg-brand' 
                : item.isDestructive 
                  ? 'text-red-400 hover:bg-red-900 hover:bg-opacity-25 hover:text-red-300' 
                  : 'text-gray-800 hover:bg-brand hover:text-white';

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`${baseClasses} ${activeClasses}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

     
    </div>
  );
}