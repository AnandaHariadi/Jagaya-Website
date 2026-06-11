const fs = require('fs');
const path = require('path');

const vueDir = 'c:/Users/ASUS TUF/Downloads/jagaya-website/jagaya-app/frontend/src';

const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}]/gu;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove emojis
  content = content.replace(emojiRegex, '');

  if (filePath.endsWith('HomePage.vue')) {
    content = content.replace(/text-blue-600/g, 'text-orange-500');
    content = content.replace(/text-blue-500/g, 'text-orange-400');
    content = content.replace(/text-indigo-600/g, 'text-red-500');
    content = content.replace(/text-indigo-700/g, 'text-red-600');
    content = content.replace(/text-indigo-500/g, 'text-red-400');
    content = content.replace(/text-cyan-500/g, 'text-amber-500');
    content = content.replace(/from-indigo-700 to-blue-600/g, 'from-red-600 to-orange-500');
    content = content.replace(/from-blue-600 to-cyan-400/g, 'from-orange-500 to-amber-400');
    content = content.replace(/from-indigo-600 to-indigo-400/g, 'from-red-500 to-rose-500');
    content = content.replace(/from-cyan-500 to-sky-400/g, 'from-amber-500 to-yellow-400');
    content = content.replace(/from-indigo-500 to-indigo-700/g, 'from-rose-500 to-red-600');
    content = content.replace(/bg-blue-600/g, 'bg-orange-500');
    content = content.replace(/bg-indigo-700/g, 'bg-red-600');
    content = content.replace(/border-blue-600/g, 'border-orange-500');
    content = content.replace(/text-blue-700/g, 'text-orange-600');

    content = content.replace(/borderColor: '#2563eb'/g, "borderColor: '#f97316'");
    content = content.replace(/rgba\(37,99,235/g, 'rgba(249,115,22');
    content = content.replace(/pointBackgroundColor: '#2563eb'/g, "pointBackgroundColor: '#f97316'");
    content = content.replace(/backgroundColor:\['#4338ca','#2563eb','#0ea5e9','#38bdf8'\]/g, "backgroundColor:['#dc2626','#f97316','#fbbf24','#fb923c']");

    content = content.replace(/rgba\(30, 58, 138, 0\.95\) 0%, rgba\(37, 99, 235, 0\.88\) 50%, rgba\(56, 189, 248, 0\.82\)/g, 'rgba(153, 27, 27, 0.92) 0%, rgba(180, 52, 23, 0.88) 40%, rgba(194, 65, 12, 0.82)');

    content = content.replace(/color: #1d4ed8;/g, 'color: #ea580c;'); 
    content = content.replace(/background: linear-gradient\(135deg, #4338ca, #2563eb\);/g, 'background: linear-gradient(135deg, #dc2626, #f97316);');
    content = content.replace(/background: linear-gradient\(90deg, #4338ca, #2563eb\);/g, 'background: linear-gradient(90deg, #dc2626, #f97316);');
    content = content.replace(/border-color: #2563eb;/g, 'border-color: #f97316;');
    content = content.replace(/color: #2563eb;/g, 'color: #f97316;');
    content = content.replace(/border-color: #bfdbfe;/g, 'border-color: #fed7aa;');
    content = content.replace(/background: linear-gradient\(135deg, #e0e7ff, #eff6ff\);/g, 'background: linear-gradient(135deg, #fef2f2, #fff7ed);');
    content = content.replace(/border: 1px solid #bfdbfe;/g, 'border: 1px solid #fed7aa;');
    content = content.replace(/background: #eff6ff;\n  border: 1px solid #bfdbfe;/g, 'background: #f0fdf4;\n  border: 1px solid #bbf7d0;');
    content = content.replace(/border-color: #93c5fd;/g, 'border-color: #fdba74;');
    content = content.replace(/background: linear-gradient\(90deg, #60a5fa, #f3f4f6\);/g, 'background: linear-gradient(90deg, #fdba74, #f3f4f6);');
    content = content.replace(/linear-gradient\(180deg, #4338ca, #2563eb\)/g, 'linear-gradient(180deg, #dc2626, #f97316)');
    content = content.replace(/linear-gradient\(90deg, #3b82f6, #0ea5e9\)/g, 'linear-gradient(90deg, #ef4444, #f97316)');
    content = content.replace(/linear-gradient\(135deg, #1e3a8a, #3b82f6, #0ea5e9\)/g, 'linear-gradient(135deg, #b91c1c, #dc2626, #ea580c)');
    content = content.replace(/linear-gradient\(135deg, #1e3a8a, #2563eb, #38bdf8\)/g, 'linear-gradient(135deg, #991b1b, #dc2626, #ea580c)');
    content = content.replace(/rgba\(56, 189, 248, 0\.2\)/g, 'rgba(251,191,36,0.2)');
    content = content.replace(/rgba\(30, 58, 138, 0\.3\)/g, 'rgba(127,29,29,0.3)');

    content = content.replace(/--red-600: #4338ca;/g, '--red-600: #dc2626;');
    content = content.replace(/--orange-500: #2563eb;/g, '--orange-500: #f97316;');
    content = content.replace(/--amber-400: #0ea5e9;/g, '--amber-400: #fbbf24;');

    content = content.replace(/status-kritis \{ background: #e0e7ff; color: #3730a3; \}/g, 'status-kritis { background: #fef2f2; color: #b91c1c; }');
    content = content.replace(/status-siaga \{ background: #dbeafe; color: #1e40af; \}/g, 'status-siaga { background: #fff7ed; color: #c2410c; }');

    content = content.replace(/background: #eff6ff;/g, 'background: #fff7ed;');
    content = content.replace(/linear-gradient\(135deg, #1e3a8a, #2563eb, #38bdf8\)/g, 'linear-gradient(135deg, #991b1b, #dc2626, #ea580c)');

  } else if (filePath.endsWith('Navbar.vue')) {
    content = content.replace(/from-blue-600 to-indigo-600/g, 'from-orange-500 to-red-600');
    content = content.replace(/shadow-\[0_5px_15px_rgba\(37,99,235,0\.2\)\]/g, 'shadow-[0_5px_15px_rgba(249,115,22,0.2)]');
    content = content.replace(/shadow-\[0_8px_20px_rgba\(37,99,235,0\.3\)\]/g, 'shadow-[0_8px_20px_rgba(249,115,22,0.3)]');
    content = content.replace(/text-blue-600/g, 'text-orange-600');
    content = content.replace(/bg-blue-50/g, 'bg-orange-50');
    content = content.replace(/bg-blue-600/g, 'bg-orange-600');
    content = content.replace(/bg-blue-700/g, 'bg-orange-700');
    content = content.replace(/shadow-blue-500\/20/g, 'shadow-orange-500/20');
  } else if (filePath.endsWith('DeveloperPage.vue')) {
    content = content.replace(/text-blue-600/g, 'text-orange-500');
    content = content.replace(/bg-blue-600/g, 'bg-orange-500');
    content = content.replace(/bg-blue-50/g, 'bg-orange-50');
    content = content.replace(/bg-blue-100/g, 'bg-orange-100');
    content = content.replace(/border-blue-600/g, 'border-orange-500');
    content = content.replace(/border-blue-300/g, 'border-orange-300');
    content = content.replace(/text-blue-400/g, 'text-orange-400');
    content = content.replace(/hover:bg-blue-700/g, 'hover:bg-orange-600');
    content = content.replace(/hover:text-blue-600/g, 'hover:text-orange-500');
    content = content.replace(/hover:border-blue-600/g, 'hover:border-orange-500');
    content = content.replace(/hover:text-blue-400/g, 'hover:text-orange-400');
    content = content.replace(/from-blue-600 to-indigo-600/g, 'from-red-600 to-orange-500');
    content = content.replace(/hover:from-blue-600 hover:to-indigo-600/g, 'hover:from-red-600 hover:to-orange-500');
  } else if (filePath.endsWith('LandingPage.vue')) {
    content = content.replace(/--zedag-blue-dark: #0f172a;/g, '--zedag-blue-dark: #450a0a;'); 
    content = content.replace(/--zedag-blue: #1e3a8a;/g, '--zedag-blue: #991b1b;'); 
    content = content.replace(/--zedag-blue-light: #2563eb;/g, '--zedag-blue-light: #ea580c;'); 
    content = content.replace(/--zedag-green: #10b981;/g, '--zedag-green: #f97316;'); 
    content = content.replace(/--zedag-green-hover: #059669;/g, '--zedag-green-hover: #ea580c;');
    content = content.replace(/text-blue-600/g, 'text-orange-500');
    content = content.replace(/text-blue-700/g, 'text-orange-600');
    content = content.replace(/bg-blue-600/g, 'bg-orange-500');
    content = content.replace(/bg-blue-50/g, 'bg-orange-50');
    content = content.replace(/bg-blue-100/g, 'bg-orange-100');

    // Make buttons interactive
    if (!content.includes('transform: translateY(-2px);')) {
      content = content.replace(/\.btn-zedag \{([^}]*)\}/, '.btn-zedag {$1\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.btn-zedag:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 25px -5px rgba(249,115,22,0.4);\n}');
    }

    // Services card interactive
    if (!content.includes('box-shadow: 0 15px 30px -5px rgba(249,115,22,0.1);')) {
       // just add a global class modifier for services-zedag__right image box
       content = content.replace(/\.services-zedag__right \.bg-white \{/g, '.services-zedag__right .bg-white {\n  transition: all 0.4s ease;\n}\n.services-zedag__right .bg-white:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 20px 40px -10px rgba(249,115,22,0.15);\n');
    }
  }

  fs.writeFileSync(filePath, content);
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.vue')) {
      processFile(fullPath);
    }
  }
}

traverse(vueDir);
// Also check markdown walkthroughs in root maybe? User said "web", so .vue is enough.

console.log("Reverted colors and removed emojis successfully!");
