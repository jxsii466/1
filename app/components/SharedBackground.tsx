'use client';

import { useState, useEffect } from 'react';

export function SharedBackground() {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgUrl, setBgUrl] = useState('');

  useEffect(() => {
    // 只在首次加载时获取背景图片
    if (!bgUrl) {
      const timestamp = Date.now();
      setBgUrl(`https://loliapi.com/acg/?t=${timestamp}`);
    }
  }, [bgUrl]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
      {bgUrl && (
        <img
          src={bgUrl}
          alt="background"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="eager"
          onLoad={() => setBgLoaded(true)}
        />
      )}
    </div>
  );
}
