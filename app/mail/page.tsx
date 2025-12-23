'use client';

import { useState, useCallback, memo, useRef } from 'react';
import { Navigation } from '../components/Navigation';

const ICON_PATHS: Record<string, React.ReactElement> = {
  check: <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>,
  link: <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>,
  star: <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>,
  open: <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
};

const Icon = memo(({ name, className = "w-6 h-6" }: { name: string; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">{ICON_PATHS[name]}</svg>
));
Icon.displayName = 'Icon';

const haptic = (duration: number = 15) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(duration);
  }
};

interface TempMailSite {
  name: string;
  url: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

const TEMP_MAIL_SITES: TempMailSite[] = [
  {
    name: 'YOPmail',
    url: 'https://yopmail.com',
    description: '最经典的临时邮箱服务，无需注册，即时可用',
    features: ['无需注册', '邮件保存8天', '支持多国语言', '收件箱实时刷新'],
    recommended: true
  },
  {
    name: '10 Minute Mail',
    url: 'https://10minutemail.com',
    description: '10分钟有效期的临时邮箱，适合快速验证',
    features: ['10分钟自动销毁', '可延长时间', '简洁界面', '即时接收'],
    recommended: true
  },
  {
    name: 'Guerrilla Mail',
    url: 'https://www.guerrillamail.com',
    description: '支持发送邮件的临时邮箱服务',
    features: ['可发送邮件', '60分钟有效期', '支持附件', '多域名选择'],
  },
  {
    name: 'Temp Mail',
    url: 'https://temp-mail.org',
    description: '界面美观的临时邮箱，支持移动端',
    features: ['自动生成邮箱', '实时推送', 'API接口', '移动端友好'],
    recommended: true
  },
  {
    name: 'Mohmal',
    url: 'https://www.mohmal.com',
    description: '支持阿拉伯语的临时邮箱服务',
    features: ['45分钟有效期', '可自定义地址', '支持多语言', '无广告'],
  },
  {
    name: 'Mailinator',
    url: 'https://www.mailinator.com',
    description: '公共邮箱系统，任何人都可以查看',
    features: ['公共收件箱', '无需注册', '邮件保存数小时', 'API支持'],
  },
  {
    name: 'EmailOnDeck',
    url: 'https://www.emailondeck.com',
    description: '快速临时邮箱，界面简洁',
    features: ['即时生成', '实时接收', '支持多域名', '简洁UI'],
  },
  {
    name: 'ThrowAwayMail',
    url: 'https://www.throwawaymail.com',
    description: '48小时有效的临时邮箱',
    features: ['48小时有效', '可自定义前缀', '支持转发', '隐私保护'],
  },
  {
    name: 'Maildrop',
    url: 'https://maildrop.cc',
    description: '无限时长的临时邮箱，由Heluna提供',
    features: ['无时间限制', '支持别名', '垃圾邮件过滤', '开源项目'],
  },
  {
    name: 'FakeMail',
    url: 'https://www.fakemail.net',
    description: '快速生成假邮箱地址',
    features: ['即时生成', '多域名支持', '自动刷新', '简单易用'],
  },
  {
    name: 'TempMail.plus',
    url: 'https://tempmail.plus',
    description: '高级临时邮箱服务',
    features: ['无限邮箱', 'API访问', '邮件转发', '自定义域名'],
  },
  {
    name: 'Minute Inbox',
    url: 'https://www.minuteinbox.com',
    description: '分钟级临时邮箱',
    features: ['即时可用', '实时接收', 'RSS订阅', '移动优化'],
  },
];

const MailCard = memo(({ site, onVisit }: { site: TempMailSite; onVisit: (url: string) => void }) => {
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    haptic(30);
    try {
      await navigator.clipboard.writeText(site.url);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      setCopied(true);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      haptic(50);
    }
  }, [site.url]);

  const handleVisit = useCallback(() => {
    haptic(20);
    onVisit(site.url);
  }, [site.url, onVisit]);

  return (
    <div className="bg-black/30 rounded-[20px] border border-white/20 overflow-hidden shadow-xl hover:border-white/30 transition-all duration-300 group">
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-[18px] font-bold text-white tracking-tight drop-shadow-md">
                {site.name}
              </h3>
              {site.recommended && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-[#FF9500]/20 border border-[#FF9500]/40 rounded-full">
                  <Icon name="star" className="w-3 h-3 text-[#FF9500]" />
                  <span className="text-[11px] font-semibold text-[#FF9500]">推荐</span>
                </div>
              )}
            </div>
            <p className="text-[14px] text-white/70 leading-relaxed drop-shadow-sm">
              {site.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {site.features.map((feature, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-white/10 rounded-full text-[12px] text-white/80 border border-white/10 drop-shadow-sm"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={handleVisit}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#007AFF]/90 to-[#0055b3]/90 rounded-[14px] text-white font-semibold text-[15px] shadow-lg border border-white/20 active:scale-[0.97] transition-all touch-manipulation group-hover:shadow-[0_0_20px_rgba(0,122,255,0.4)]"
          >
            <Icon name="open" className="w-4 h-4" />
            <span className="drop-shadow-md">访问网站</span>
          </button>

          <button
            onClick={handleCopy}
            className={`px-4 py-3 rounded-[14px] font-semibold text-[15px] border transition-all active:scale-95 touch-manipulation ${
              copied
                ? 'bg-[#34C759]/30 border-[#34C759]/40 text-[#34C759]'
                : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/20'
            }`}
          >
            {copied ? (
              <Icon name="check" className="w-5 h-5" />
            ) : (
              <Icon name="link" className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
});
MailCard.displayName = 'MailCard';

export default function MailPage() {
  const handleVisit = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div className="min-h-screen relative font-sans text-white pb-10 selection:bg-blue-400/30 overflow-x-hidden">

      {/* 内容层 */}
      <div className="relative z-10">

        {/* 头部 */}
        <header className="fixed top-0 left-0 right-0 h-[52px] z-40 flex items-center justify-between px-4 pt-2 transition-all duration-300">
          <h1 className="text-[17px] font-semibold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            临时邮箱大全
          </h1>
        </header>

        {/* 导航 */}
        <Navigation />

        {/* 主内容 */}
        <main className="max-w-[1200px] mx-auto px-5 pt-32 pb-10 space-y-6">

          {/* 说明卡片 */}
          <div className="bg-black/30 rounded-[20px] border border-white/20 p-5 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="bg-[#007AFF]/20 p-2 rounded-xl shrink-0">
                <Icon name="link" className="w-5 h-5 text-[#007AFF]" />
              </div>
              <div className="flex-1">
                <h2 className="text-[16px] font-semibold text-white mb-1.5 drop-shadow-md">
                  什么是临时邮箱？
                </h2>
                <p className="text-[14px] text-white/70 leading-relaxed drop-shadow-sm">
                  临时邮箱是一种即用即弃的电子邮件服务，无需注册即可使用。适合用于网站注册、接收验证码等场景，保护您的真实邮箱免受垃圾邮件骚扰。
                </p>
              </div>
            </div>
          </div>

          {/* 邮箱列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TEMP_MAIL_SITES.map((site, idx) => (
              <MailCard
                key={idx}
                site={site}
                onVisit={handleVisit}
              />
            ))}
          </div>

          {/* 页脚提示 */}
          <div className="text-center pt-8 space-y-2">
            <p className="text-[13px] text-white/60 drop-shadow-sm">
              提示：临时邮箱仅用于接收验证邮件，请勿用于重要账号注册
            </p>
            <p className="text-[12px] text-white/80 font-medium tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              已收录 {TEMP_MAIL_SITES.length} 个临时邮箱服务
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
