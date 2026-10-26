export function exportSectionToPDF(title: string, subtitle: string, details: Array<{label: string; value: string}>) {
  const printWindow = window.open('', '_blank', 'width=800,height=600');
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
            padding: 40px;
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.6;
          }
          .header {
            border-bottom: 3px solid #0284c7;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          h1 {
            color: #0f172a;
            font-size: 24px;
            margin: 0 0 8px 0;
          }
          .subtitle {
            color: #64748b;
            font-size: 14px;
            margin: 0;
          }
          .badge {
            display: inline-block;
            background: #e0f2fe;
            color: #0369a1;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 600;
            margin-top: 10px;
          }
          .section {
            margin-bottom: 24px;
          }
          .row {
            display: flex;
            border-bottom: 1px solid #f1f5f9;
            padding: 10px 0;
          }
          .label {
            width: 220px;
            font-weight: 600;
            color: #475569;
            font-size: 13px;
          }
          .value {
            flex: 1;
            color: #0f172a;
            font-size: 13px;
          }
          .footer {
            margin-top: 50px;
            border-top: 1px solid #cbd5e1;
            padding-top: 15px;
            text-align: center;
            font-size: 11px;
            color: #64748b;
          }
          @media print {
            body { padding: 20px; }
            button { display: none; }
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
