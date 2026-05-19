const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to Home...');
  await page.goto('https://portfolio-fenty-next.vercel.app', { waitUntil: 'domcontentloaded', timeout: 60000 });
  // wait a bit for animations
  await new Promise(r => setTimeout(r, 4000));
  await page.screenshot({ path: 'home.png' });

  console.log('Navigating to Project Detail...');
  await page.goto('https://portfolio-fenty-next.vercel.app/projects/urban-living-space', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: 'project.png' });
  
  console.log('Scrolling down...');
  await page.evaluate(() => window.scrollBy(0, 1500));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'project_scroll.png' });

  console.log('Generating PDF...');
  const html = `
    <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 40px; color: #333; }
          h1 { color: #111; border-bottom: 2px solid #ddd; padding-bottom: 10px; font-size: 24px; }
          h2 { margin-top: 30px; color: #444; font-size: 18px; }
          p { line-height: 1.6; font-size: 14px; }
          img { max-width: 100%; border: 1px solid #eee; border-radius: 8px; margin-top: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
          .feature { margin-bottom: 30px; page-break-inside: avoid; }
          ul { font-size: 14px; line-height: 1.8; }
        </style>
      </head>
      <body>
        <h1>Laporan Pengembangan Fitur Premium - Portfolio Fenty</h1>
        <p>Dokumen ini merangkum penyelesaian UI/UX tingkat <em>agency</em> yang telah diimplementasikan, termasuk fitur-fitur interaktif dan animasi tingkat lanjut.</p>
        
        <h2>1. Halaman Beranda (Home)</h2>
        <div class="feature">
          <p><strong>Fitur:</strong> Hero section dengan Parallax, teks dinamis <em>SplitText</em>, <em>Magnetic Button</em>, dan <em>Custom Hover Cursor</em> yang bereaksi terhadap elemen di sekitarnya.</p>
          <img src="file://${process.cwd().replace(/\\/g, '/')}/home.png" />
        </div>

        <div style="page-break-before: always;"></div>

        <h2>2. Halaman Detail Proyek</h2>
        <div class="feature">
          <p><strong>Fitur:</strong> Layout editorial asimetris, Metadata Proyek yang terstruktur rapi, serta efek Zoom/Lightbox terintegrasi pada gambar sampul.</p>
          <img src="file://${process.cwd().replace(/\\/g, '/')}/project.png" />
        </div>

        <div class="feature">
          <p><strong>Navigasi Lanjutan:</strong> Tombol interaktif "Prev / Next Project" super ringkas di bagian bawah studi kasus yang dilengkapi efek *hover border emas*.</p>
          <img src="file://${process.cwd().replace(/\\/g, '/')}/project_scroll.png" />
        </div>

        <h2>3. Fitur Global & Sistem Inti</h2>
        <ul>
          <li><strong>Dark / Light Mode Transition:</strong> Perpindahan tema yang sangat mulus (smooth 0.4s) tanpa kilatan warna (jarring effect).</li>
          <li><strong>Cinematic Page Transitions:</strong> Efek transisi antar halaman ala tirai (curtain wipe) yang elegan berkat integrasi Framer Motion layout.</li>
          <li><strong>Back to Top & Sticky Nav:</strong> Tombol ke atas cerdas yang muncul sesuai progres scroll pengguna.</li>
          <li><strong>Footer Call-To-Action (CTA):</strong> "Punya Proyek? Mari Diskusi" untuk menutup semua halaman dan meningkatkan konversi.</li>
          <li><strong>SEO Teroptimasi:</strong> Sitemap XML & Robots.txt ter-*generate* otomatis untuk performa pencarian Google.</li>
        </ul>
      </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.pdf({ path: 'Portfolio_Fenty_Report.pdf', format: 'A4', printBackground: true, margin: { top: '20px', bottom: '20px' } });

  await browser.close();
  console.log('PDF generated successfully: Portfolio_Fenty_Report.pdf');
})();
