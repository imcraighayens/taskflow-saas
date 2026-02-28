import React from 'react';
import { STATUS_GRADS } from '../../constants';

interface TaskPreviewProps {
  tag: string;
  status: string;
  id: number;
}

export default function TaskPreview({ tag, status, id }: TaskPreviewProps) {
  const stops = (STATUS_GRADS[status] || STATUS_GRADS['todo']).match(/#[0-9A-Fa-f]{6}/g) || ['#4A6CF7', '#8B5CF6'];
  
  const shapes: Record<string, React.ReactNode> = {
    design: (
      <>
        <rect x="8%" y="18%" width="36%" height="64%" rx="7" fill="rgba(255,255,255,0.1)"/>
        <rect x="50%" y="18%" width="42%" height="29%" rx="7" fill="rgba(255,255,255,0.15)"/>
        <rect x="50%" y="54%" width="42%" height="12%" rx="5" fill="rgba(255,255,255,0.1)"/>
        <circle cx="72%" cy="25%" r="9" fill="rgba(255,255,255,0.25)"/>
        <text x="22%" y="55%" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle" fontFamily="Plus Jakarta Sans">Aa</text>
      </>
    ),
    dev: (
      <>
        <rect x="8%" y="28%" width="84%" height="9" rx="4" fill="rgba(255,255,255,0.2)"/>
        <rect x="8%" y="43%" width="60%" height="7" rx="3" fill="rgba(255,255,255,0.13)"/>
        <rect x="8%" y="56%" width="72%" height="7" rx="3" fill="rgba(255,255,255,0.1)"/>
        <rect x="8%" y="69%" width="40%" height="7" rx="3" fill="rgba(255,255,255,0.08)"/>
        <circle cx="86%" cy="52%" r="16" fill="rgba(255,255,255,0.12)"/>
        <text x="86%" y="57%" fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="middle" fontFamily="JetBrains Mono">{'{}'}</text>
      </>
    ),
    data: (
      <>
        <rect x="8%"  y="62%" width="14%" height="28%" rx="3" fill="rgba(255,255,255,0.28)"/>
        <rect x="26%" y="45%" width="14%" height="45%" rx="3" fill="rgba(255,255,255,0.2)"/>
        <rect x="44%" y="28%" width="14%" height="62%" rx="3" fill="rgba(255,255,255,0.24)"/>
        <rect x="62%" y="50%" width="14%" height="40%" rx="3" fill="rgba(255,255,255,0.16)"/>
        <rect x="80%" y="38%" width="12%" height="52%" rx="3" fill="rgba(255,255,255,0.2)"/>
      </>
    ),
    mgmt: (
      <>
        <rect x="8%"  y="20%" width="42%" height="22%" rx="7" fill="rgba(255,255,255,0.15)"/>
        <rect x="55%" y="20%" width="37%" height="22%" rx="7" fill="rgba(255,255,255,0.1)"/>
        <rect x="8%"  y="50%" width="84%" height="11%" rx="5" fill="rgba(255,255,255,0.12)"/>
        <rect x="8%"  y="68%" width="56%" height="11%" rx="5" fill="rgba(255,255,255,0.08)"/>
      </>
    ),
    qa: (
      <>
        <circle cx="50%" cy="50%" r="30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
        <circle cx="50%" cy="50%" r="18" fill="rgba(255,255,255,0.12)"/>
        <circle cx="50%" cy="50%" r="8" fill="rgba(255,255,255,0.25)"/>
        <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
        <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
      </>
    ),
    docs: (
      <>
        <rect x="22%" y="12%" width="56%" height="76%" rx="8" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <rect x="30%" y="26%" width="40%" height="5" rx="2.5" fill="rgba(255,255,255,0.35)"/>
        <rect x="30%" y="37%" width="32%" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
        <rect x="30%" y="47%" width="36%" height="4" rx="2" fill="rgba(255,255,255,0.16)"/>
        <rect x="30%" y="57%" width="28%" height="4" rx="2" fill="rgba(255,255,255,0.12)"/>
      </>
    )
  };

  return (
    <div className="h-[38px] relative overflow-hidden border-b-0 shrink-0">
      <svg viewBox="0 0 200 38" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full block">
        <defs>
          <linearGradient id={`pg${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stops[0]}/>
            <stop offset="100%" stopColor={stops[1] || stops[0]}/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#pg${id})`}/>
        {shapes[tag] || shapes.dev}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#181C27] pointer-events-none"></div>
      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[8px] font-bold text-white/65 uppercase tracking-wider font-sans">
        {tag}
      </div>
    </div>
  );
}
