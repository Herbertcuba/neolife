'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Target, 
  Activity, 
  DollarSign, 
  Lightbulb,
  Menu,
  X,
  Brain
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/goals', label: 'Goals', icon: Target },
  { href: '/habits', label: 'Habits', icon: Activity },
  { href: '/finances', label: 'Finances', icon: DollarSign },
  { href: '/opportunities', label: 'Opportunities', icon: Lightbulb },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 neo-button p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full bg-neo-dark border-r border-neo-gray
          transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64
        `}
      >
        <div className="p-6 border-b border-neo-gray">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-neo-green" />
            <div>
              <h1 className="text-xl font-bold font-mono text-white">NeoLife</h1>
              <p className="text-xs text-gray-500">Personal Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm
                  transition-all duration-200
                  ${isActive 
                    ? 'bg-neo-green text-neo-black font-bold' 
                    : 'text-gray-400 hover:text-white hover:bg-neo-gray'
                  }
                `}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neo-gray">
          <div className="text-xs text-gray-500 text-center">
            Herbert Cuba Garcia<br />
            Last sync: {new Date().toLocaleDateString()}
          </div>
        </div>
      </aside>
    </>
  );
}
