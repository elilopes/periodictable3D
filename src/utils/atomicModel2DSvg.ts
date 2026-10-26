import {ElementData, CATEGORY_COLORS} from '../data/elements';

const SHELL_NAMES = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

/**
 * Gera um SVG 2D vetorial de alta resolução do Modelo Rutherford-Bohr
 * com núcleo, camadas proporcionais e elétrons distribuídos exatamente
 * de acordo com a configuração eletrônica real do elemento químico.
 */
export function generateBohrSvg2D(element: ElementData): string {
  const size = 320;
  const center = size / 2;
  const shells = element.electronsPerShell.length > 0 ? element.electronsPerShell : [element.number];
  const maxRadius = 140;
  const minRadius = 38;
  const radiusStep = shells.length > 1 ? (maxRadius - minRadius) / (shells.length - 1) : 0;
  const catColor = CATEGORY_COLORS[element.category]?.hex || '#0284c7';

  // Gerar anéis orbitais e elétrons
  let orbitsSvg = '';
  let electronsSvg = '';
  let labelsSvg = '';

  shells.forEach((electronCount, shellIdx) => {
    const r = shells.length === 1 ? 80 : minRadius + shellIdx * radiusStep;
    const shellLetter = SHELL_NAMES[shellIdx] || `C${shellIdx + 1}`;

    // Círculo da órbita
    orbitsSvg += `
      <circle cx="${center}" cy="${center}" r="${r}" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="3,3" opacity="0.6" />
    `;

    // Rótulo da Camada
    labelsSvg += `
      <text x="${center}" y="${center - r - 4}" text-anchor="middle" font-size="9" font-weight="700" fill="#94a3b8" font-family="sans-serif">${shellLetter} (${electronCount}e⁻)</text>
    `;

    // Elétrons distribuídos uniformemente pela órbita
    for (let e = 0; e < electronCount; e++) {
      const angle = (2 * Math.PI * e) / electronCount - Math.PI / 2;
      const ex = center + r * Math.cos(angle);
      const ey = center + r * Math.sin(angle);

      electronsSvg += `
        <circle cx="${ex}" cy="${ey}" r="4.5" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5" filter="drop-shadow(0 0 2px rgba(56, 189, 248, 0.8))" />
      `;
    }
  });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="100%" height="220" style="background:#090d16; border-radius:12px; border:1px solid #1e293b;">
      <defs>
        <radialGradient id="bohrNucleusGlow_${element.number}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="1" />
          <stop offset="60%" stop-color="#ea580c" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#b45309" stop-opacity="0.2" />
        </radialGradient>
      </defs>

      <!-- Órbitas -->
      ${orbitsSvg}
      ${labelsSvg}

      <!-- Núcleo Central Atômico -->
      <circle cx="${center}" cy="${center}" r="22" fill="url(#bohrNucleusGlow_${element.number})" stroke="#fef08a" stroke-width="2" />
      <text x="${center}" y="${center + 5}" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff" font-family="sans-serif">${element.symbol}</text>
      <text x="${center}" y="${center + 18}" text-anchor="middle" font-size="8" font-weight="700" fill="#fde68a" font-family="sans-serif">Z=${element.number}</text>

      <!-- Elétrons em Órbita -->
      ${electronsSvg}
    </svg>
  `;
}

/**
 * Gera um SVG 2D vetorial de alta fidelidade do Modelo Orbital Quântico
 * (Nuvem Eletrônica de Schrödinger e Princípio da Incerteza de Heisenberg).
 */
export function generateQuantumOrbitalSvg2D(element: ElementData): string {
  const size = 320;
  const center = size / 2;
  const hasPOrbitals = element.number >= 5;
  const hasDOrbitals = element.number >= 21;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="100%" height="220" style="background:#090d16; border-radius:12px; border:1px solid #1e293b;">
      <defs>
        <!-- Gradiente da Nuvem s (esférica) -->
        <radialGradient id="sOrbitalCloud_${element.number}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0284c7" stop-opacity="0.9" />
          <stop offset="35%" stop-color="#0ea5e9" stop-opacity="0.6" />
          <stop offset="70%" stop-color="#38bdf8" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />
        </radialGradient>

        <!-- Gradientes dos Lobos p (halteres) -->
        <radialGradient id="pLobeGradient_${element.number}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#a855f7" stop-opacity="0.85" />
          <stop offset="50%" stop-color="#c084fc" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#7e22ce" stop-opacity="0" />
        </radialGradient>

        <!-- Gradiente dos Lobos d (trevos) -->
        <radialGradient id="dLobeGradient_${element.number}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.75" />
          <stop offset="60%" stop-color="#fb7185" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#e11d48" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Grade de Coordenadas Quânticas -->
      <line x1="20" y1="${center}" x2="${size - 20}" y2="${center}" stroke="#1e293b" stroke-width="1" stroke-dasharray="2,2" />
      <line x1="${center}" y1="20" x2="${center}" y2="${size - 20}" stroke="#1e293b" stroke-width="1" stroke-dasharray="2,2" />

      <!-- Nuvem Eletrônica Esférica (Orbital s) -->
      <circle cx="${center}" cy="${center}" r="110" fill="url(#sOrbitalCloud_${element.number})" />

      ${
        hasPOrbitals
          ? `
        <!-- Lobos do Orbital p_x e p_y -->
        <ellipse cx="${center - 50}" cy="${center}" rx="48" ry="30" fill="url(#pLobeGradient_${element.number})" />
        <ellipse cx="${center + 50}" cy="${center}" rx="48" ry="30" fill="url(#pLobeGradient_${element.number})" />
        <ellipse cx="${center}" cy="${center - 50}" rx="30" ry="48" fill="url(#pLobeGradient_${element.number})" />
        <ellipse cx="${center}" cy="${center + 50}" rx="30" ry="48" fill="url(#pLobeGradient_${element.number})" />
      `
          : ''
      }

      ${
        hasDOrbitals
          ? `
        <!-- Lobos diagonais do Orbital d_xy -->
        <g transform="rotate(45 ${center} ${center})">
          <ellipse cx="${center - 45}" cy="${center}" rx="42" ry="24" fill="url(#dLobeGradient_${element.number})" />
          <ellipse cx="${center + 45}" cy="${center}" rx="42" ry="24" fill="url(#dLobeGradient_${element.number})" />
          <ellipse cx="${center}" cy="${center - 45}" rx="24" ry="42" fill="url(#dLobeGradient_${element.number})" />
          <ellipse cx="${center}" cy="${center + 45}" rx="24" ry="42" fill="url(#dLobeGradient_${element.number})" />
        </g>
      `
          : ''
      }

      <!-- Ponto Central do Núcleo Atômico -->
      <circle cx="${center}" cy="${center}" r="6" fill="#f8fafc" stroke="#38bdf8" stroke-width="2" />

      <!-- Equação & Princípio Quântico -->
      <text x="14" y="26" font-size="9" font-weight="700" fill="#38bdf8" font-family="monospace">|ψ|² Densidade de Probabilidade</text>
      <text x="14" y="40" font-size="8" font-weight="600" fill="#a855f7" font-family="monospace">Δx · Δp ≥ ℏ/2 (Heisenberg)</text>
      <text x="${center}" y="${size - 14}" text-anchor="middle" font-size="9" font-weight="700" fill="#64748b" font-family="sans-serif">Nuvem eletrônica contínua sem órbitas rígidas</text>
    </svg>
  `;
}

/**
 * Gera um SVG 2D vetorial de alta resolução do Modelo de Esferas e Bastões (Ball-and-Stick).
 */
export function generateBallAndStickSvg2D(element: ElementData): string {
  const size = 320;
  const center = size / 2;
  const catColor = CATEGORY_COLORS[element.category]?.hex || '#0284c7';

  // Coordenadas dos ligantes ao redor do átomo central (representando geometria molecular/cristalina)
  const neighbors = [
    {x: center - 75, y: center - 50, label: element.symbol, color: catColor},
    {x: center + 75, y: center - 50, label: element.symbol, color: catColor},
    {x: center, y: center + 85, label: element.symbol, color: catColor},
  ];

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="100%" height="220" style="background:#090d16; border-radius:12px; border:1px solid #1e293b;">
      <defs>
        <!-- Gradiente da Esfera Central -->
        <radialGradient id="centralBallGrad_${element.number}" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
          <stop offset="40%" stop-color="${catColor}" stop-opacity="1" />
          <stop offset="90%" stop-color="#090d16" stop-opacity="1" />
        </radialGradient>

        <!-- Gradiente dos Bastões de Ligação -->
        <linearGradient id="stickBondGrad_${element.number}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#94a3b8" />
          <stop offset="50%" stop-color="#cbd5e1" />
          <stop offset="100%" stop-color="#64748b" />
        </linearGradient>

        <!-- Gradiente das Esferas Vizinhas -->
        <radialGradient id="neighborBallGrad_${element.number}" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#f1f5f9" stop-opacity="0.8" />
          <stop offset="45%" stop-color="${catColor}" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#020617" stop-opacity="1" />
        </radialGradient>
      </defs>

      <!-- Bastões de Ligação Química (Cilindros 3D) -->
      ${neighbors
        .map(
          (n) => `
        <line x1="${center}" y1="${center}" x2="${n.x}" y2="${n.y}" stroke="url(#stickBondGrad_${element.number})" stroke-width="9" stroke-linecap="round" />
      `
        )
        .join('')}

      <!-- Esferas Vizinhas Ligadas -->
      ${neighbors
        .map(
          (n) => `
        <circle cx="${n.x}" cy="${n.y}" r="22" fill="url(#neighborBallGrad_${element.number})" stroke="#334155" stroke-width="1.5" />
        <text x="${n.x}" y="${n.y + 4}" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff" font-family="sans-serif">${n.label}</text>
      `
        )
        .join('')}

      <!-- Ângulo de Ligação -->
      <path d="M ${center - 24} ${center - 16} A 28 28 0 0 1 ${center + 24} ${center - 16}" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2,2" />
      <text x="${center}" y="${center - 26}" text-anchor="middle" font-size="9" font-weight="700" fill="#f59e0b" font-family="sans-serif">120°</text>

      <!-- Esfera Central (Elemento) -->
      <circle cx="${center}" cy="${center}" r="32" fill="url(#centralBallGrad_${element.number})" stroke="#cbd5e1" stroke-width="2" />
      <text x="${center}" y="${center + 6}" text-anchor="middle" font-size="16" font-weight="900" fill="#ffffff" font-family="sans-serif">${element.symbol}</text>

      <!-- Legenda inferior -->
      <text x="${center}" y="${size - 14}" text-anchor="middle" font-size="9" font-weight="700" fill="#64748b" font-family="sans-serif">Esferas proporcionais e bastões de ligação covalente/metálica</text>
    </svg>
  `;
}

/**
 * Monta o bloco HTML completo com as 3 visualizações atômicas 2D lado a lado para o relatório em PDF.
 */
export function generateAllAtomicModelsSvgHtml(element: ElementData): string {
  return `
    <div style="margin-top:28px; margin-bottom:28px; page-break-inside:avoid;">
      <h3 style="color:#0f172a; font-size:16px; margin:0 0 6px 0; border-bottom:2px solid #0284c7; padding-bottom:6px; display:flex; align-items:center; gap:8px;">
        Modelos de Visualização Atômica 2D (Física & Química Quântica)
      </h3>
      <p style="color:#64748b; font-size:11px; margin:0 0 14px 0;">
        Representações bidimensionais esquemáticas dos 3 modelos atômicos fundamentais para o elemento <strong>${element.name} (${element.symbol})</strong>.
      </p>

      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px;">
        <!-- Card 1: Rutherford-Bohr -->
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; text-align:center;">
          <h4 style="color:#0284c7; font-size:12px; font-weight:700; margin:0 0 4px 0;">1. Rutherford-Bohr</h4>
          <p style="color:#64748b; font-size:10px; margin:0 0 10px 0; height:24px;">Órbitas circulares com níveis K, L, M... e elétrons de valência</p>
          ${generateBohrSvg2D(element)}
          <div style="margin-top:8px; font-size:10px; color:#475569; font-weight:600;">
            Configuração: <code style="background:#e2e8f0; padding:2px 4px; border-radius:4px;">${element.electronicConfiguration}</code>
          </div>
        </div>

        <!-- Card 2: Mecânica Quântica (Orbital) -->
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; text-align:center;">
          <h4 style="color:#7c3aed; font-size:12px; font-weight:700; margin:0 0 4px 0;">2. Mecânica Quântica</h4>
          <p style="color:#64748b; font-size:10px; margin:0 0 10px 0; height:24px;">Nuvem eletrônica probabilística de Heisenberg & Schrödinger</p>
          ${generateQuantumOrbitalSvg2D(element)}
          <div style="margin-top:8px; font-size:10px; color:#475569; font-weight:600;">
            Densidade Quântica: <code style="background:#e2e8f0; padding:2px 4px; border-radius:4px;">|ψ(r,θ,φ)|²</code>
          </div>
        </div>

        <!-- Card 3: Esferas e Bastões -->
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; text-align:center;">
          <h4 style="color:#059669; font-size:12px; font-weight:700; margin:0 0 4px 0;">3. Esferas e Bastões</h4>
          <p style="color:#64748b; font-size:10px; margin:0 0 10px 0; height:24px;">Geometria espacial, eixos e ângulos de ligação molecular</p>
          ${generateBallAndStickSvg2D(element)}
          <div style="margin-top:8px; font-size:10px; color:#475569; font-weight:600;">
            Coordenação: <code style="background:#e2e8f0; padding:2px 4px; border-radius:4px;">Raio & Ligações</code>
          </div>
        </div>
      </div>
    </div>
  `;
}
