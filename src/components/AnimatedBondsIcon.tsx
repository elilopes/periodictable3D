import React from 'react';

interface AnimatedBondsIconProps {
  onClick?: () => void;
  className?: string;
}

export function AnimatedBondsIcon({onClick, className = ''}: AnimatedBondsIconProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-fuchsia-600 p-[1.5px] shadow-lg shadow-sky-500/25 transition-transform hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-sky-400 ${className}`}
      title="Abrir Simulador Interativo de Ligações Químicas 3D"
    >
      {/* Fundo interno escuro com glow */}
      <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center relative overflow-hidden">
        {/* Glow dinâmico no fundo */}
        <div className="absolute inset-0 bg-sky-500/10 group-hover:bg-sky-500/20 transition-colors animate-pulse" />

        {/* Animação vetorial SVG de ligações e orbitais atômicos */}
        <svg
          viewBox="0 0 40 40"
          className="w-8 h-8 relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Órbita 1 giratória */}
          <ellipse
            cx="20"
            cy="20"
            rx="16"
            ry="6"
            stroke="url(#bond-gradient-1)"
            strokeWidth="1.6"
            strokeDasharray="4 2"
            className="animate-spin origin-center"
            style={{animationDuration: '6s'}}
          />

          {/* Órbita 2 giratória inclinada em 60 graus */}
          <g transform="rotate(60 20 20)">
            <ellipse
              cx="20"
              cy="20"
              rx="16"
              ry="6"
              stroke="url(#bond-gradient-2)"
              strokeWidth="1.6"
              className="animate-spin origin-center"
              style={{animationDuration: '8s', animationDirection: 'reverse'}}
            />
          </g>

          {/* Órbita 3 giratória inclinada em 120 graus */}
          <g transform="rotate(120 20 20)">
            <ellipse
              cx="20"
              cy="20"
              rx="16"
              ry="6"
              stroke="#38bdf8"
              strokeWidth="1.2"
              opacity="0.6"
              className="animate-spin origin-center"
              style={{animationDuration: '10s'}}
            />
          </g>

          {/* Bastão da Ligação Molecular (conectando dois átomos centrais) */}
          <line
            x1="14"
            y1="20"
            x2="26"
            y2="20"
            stroke="#facc15"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Átomo A (Esfera azul à esquerda) */}
          <circle cx="14" cy="20" r="3.6" fill="#38bdf8" />
          <circle cx="13" cy="19" r="1.2" fill="#ffffff" opacity="0.8" />

          {/* Átomo B (Esfera rosa à direita) */}
          <circle cx="26" cy="20" r="3.6" fill="#f43f5e" />
          <circle cx="25" cy="19" r="1.2" fill="#ffffff" opacity="0.8" />

          {/* Elétron de valência compartilhado em trânsito */}
          <circle cx="20" cy="20" r="1.5" fill="#facc15" className="animate-ping" style={{animationDuration: '1.8s'}} />

          {/* Gradientes SVG */}
          <defs>
            <linearGradient id="bond-gradient-1" x1="4" y1="20" x2="36" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="bond-gradient-2" x1="4" y1="20" x2="36" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10b981" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </button>
  );
}
