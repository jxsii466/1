'use client';

import { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ICON_PATHS: Record<string, React.ReactElement> = {
  home: <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>,
  mail: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>,
  menu: <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
};

const Icon = memo(({ name, className = "w-5 h-5" }: { name: string; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">{ICON_PATHS[name]}</svg>
));
Icon.displayName = 'Icon';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', label: '创号助手', icon: 'home' },
  { path: '/mail', label: '临时邮箱', icon: 'mail' },
];

export const Navigation = memo(() => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-16 left-0 right-0 z-30 flex justify-center px-4">
      <div className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-[20px] shadow-2xl overflow-hidden">
        <div className="flex items-center gap-1 p-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-[14px] text-[15px] font-medium transition-all duration-200 touch-manipulation active:scale-95 ${
                  isActive
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon name={item.icon} className="w-4 h-4" />
                <span className="drop-shadow-md">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
});
Navigation.displayName = 'Navigation';
