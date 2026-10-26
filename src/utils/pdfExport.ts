import {ElementData} from '../data/elements';
import {generateAllAtomicModelsSvgHtml} from './atomicModel2DSvg';

export function exportSectionToPDF(
  title: string,
  subtitle: string,
  details: Array<{label: string; value: string}>,
  extraHtml?: string
) {
  const printWindow = window.open('', '_blank', 'width=880,height=720');
  if (!printWindow) {
    alert('Por favor, permita pop-ups para exportar o relatório em PDF.');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>${title} - Relatório Químico 3D</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #1e293b;
            padding: 30px;
            max-width: 820px;
            margin: 0 auto;
            line-height: 1.5;
            background: #ffffff;
          }
          .header {
            border-bottom: 3px solid #0284c7;
            padding-bottom: 16px;
            margin-bottom: 24px;
          }
          h1 {
            color: #0f172a;
            font-size: 22px;
            margin: 0 0 6px 0;
          }
          .subtitle {
            color: #64748b;
            font-size: 13px;
            margin: 0;
          }
          .badge {
            display: inline-block;
            background: #e0f2fe;
            color: #0369a1;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 700;
            margin-top: 8px;
            letter-spacing: 0.5px;
          }
          .section {
            margin-bottom: 20px;
          }
          .row {
            display: flex;
            border-bottom: 1px solid #f1f5f9;
            padding: 8px 0;
          }
          .label {
            width: 220px;
            font-weight: 600;
            color: #475569;
            font-size: 12px;
          }
          .value {
            flex: 1;
            color: #0f172a;
            font-size: 12px;
          }
          .footer {
            margin-top: 40px;
            border-top: 1px solid #cbd5e1;
            padding-top: 15px;
            text-align: center;
            font-size: 10px;
            color: #64748b;
          }
          @media print {
            body { padding: 15px; max-width: 100%; }
            button { display: none; }
            .badge { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${title}</h1>
          <p class="subtitle">${subtitle}</p>
          <span class="badge">Tabela Periódica & Simulador 3D - Relatório Científico</span>
        </div>

        <div class="section">
          ${details
            .map(
              (item) => `
            <div class="row">
              <div class="label">${item.label}</div>
              <div class="value">${item.value}</div>
            </div>
          `
            )
            .join('')}
        </div>

        ${extraHtml || ''}

        <div class="footer">
          <p>Gerado pelo sistema de Tabela Periódica 3D e Simulador Rutherford-Bohr. Documento oficial para fins educacionais e científicos.</p>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

/**
 * Exporta um elemento químico completo para PDF incluindo a cópia 2D dos 3 modelos atômicos:
 * 1. Rutherford-Bohr (Camadas K, L, M...)
 * 2. Mecânica Quântica (Nuvem de probabilidade de Heisenberg & Schrödinger)
 * 3. Esferas e Bastões (Ball-and-Stick)
 */
export function exportElementWith2DModelsToPDF(
  element: ElementData,
  details: Array<{label: string; value: string}>
) {
  const modelsHtml = generateAllAtomicModelsSvgHtml(element);
  exportSectionToPDF(
    `${element.name} (${element.symbol}) - Elemento #${element.number}`,
    `Categoria: ${element.categoryLabel} | Massa Atômica: ${element.atomicMass} u`,
    details,
    modelsHtml
  );
}
