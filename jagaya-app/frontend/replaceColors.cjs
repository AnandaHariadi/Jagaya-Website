const fs = require('fs');
const path = 'c:/Users/ASUS TUF/Downloads/jagaya-website/jagaya-app/frontend/src/pages/HomePage.vue';
let content = fs.readFileSync(path, 'utf8');

// Tailwind classes replacement
content = content.replace(/text-orange-500/g, 'text-blue-600');
content = content.replace(/text-orange-400/g, 'text-blue-500');
content = content.replace(/text-red-500/g, 'text-indigo-600');
content = content.replace(/text-red-600/g, 'text-indigo-700');
content = content.replace(/text-red-400/g, 'text-indigo-500');
content = content.replace(/text-amber-500/g, 'text-cyan-500');
content = content.replace(/from-red-600 to-orange-500/g, 'from-indigo-700 to-blue-600');
content = content.replace(/from-orange-500 to-amber-400/g, 'from-blue-600 to-cyan-400');
content = content.replace(/from-red-500 to-rose-500/g, 'from-indigo-600 to-indigo-400');
content = content.replace(/from-amber-500 to-yellow-400/g, 'from-cyan-500 to-sky-400');
content = content.replace(/from-rose-500 to-red-600/g, 'from-indigo-500 to-indigo-700');
content = content.replace(/bg-orange-500/g, 'bg-blue-600');
content = content.replace(/bg-red-600/g, 'bg-indigo-700');
content = content.replace(/border-orange-500/g, 'border-blue-600');
content = content.replace(/text-orange-600/g, 'text-blue-700');

// Chart data
content = content.replace(/borderColor: '#f97316'/g, 'borderColor: \'#2563eb\'');
content = content.replace(/rgba\(249,115,22/g, 'rgba(37,99,235');
content = content.replace(/pointBackgroundColor: '#f97316'/g, 'pointBackgroundColor: \'#2563eb\'');
content = content.replace(/backgroundColor:\['#dc2626','#f97316','#fbbf24','#fb923c'\]/g, 'backgroundColor:[\'#4338ca\',\'#2563eb\',\'#0ea5e9\',\'#38bdf8\']');

// Hero overlay
content = content.replace(/rgba\(153, 27, 27, 0.92\) 0%, rgba\(180, 52, 23, 0.88\) 40%, rgba\(194, 65, 12, 0.82\)/g, 'rgba(30, 58, 138, 0.95) 0%, rgba(37, 99, 235, 0.88) 50%, rgba(56, 189, 248, 0.82)');

// Custom CSS Colors
content = content.replace(/color: #ea580c;/g, 'color: #1d4ed8;'); // btn-outline hover
content = content.replace(/color: #dc2626;/g, 'color: #1d4ed8;'); // btn-primary-hero
content = content.replace(/background: linear-gradient\(135deg, #dc2626, #f97316\);/g, 'background: linear-gradient(135deg, #4338ca, #2563eb);');
content = content.replace(/background: linear-gradient\(90deg, #dc2626, #f97316\);/g, 'background: linear-gradient(90deg, #4338ca, #2563eb);');
content = content.replace(/border-color: #f97316;/g, 'border-color: #2563eb;');
content = content.replace(/color: #f97316;/g, 'color: #2563eb;');
content = content.replace(/border-color: #fed7aa;/g, 'border-color: #bfdbfe;');
content = content.replace(/background: linear-gradient\(135deg, #fef2f2, #fff7ed\);/g, 'background: linear-gradient(135deg, #e0e7ff, #eff6ff);');
content = content.replace(/border: 1px solid #fed7aa;/g, 'border: 1px solid #bfdbfe;');
content = content.replace(/background: #f0fdf4;\\n  border: 1px solid #bbf7d0;/g, 'background: #eff6ff;\n  border: 1px solid #bfdbfe;');
content = content.replace(/border-color: #fdba74;/g, 'border-color: #93c5fd;');
content = content.replace(/background: linear-gradient\(90deg, #fdba74, #f3f4f6\);/g, 'background: linear-gradient(90deg, #60a5fa, #f3f4f6);');
content = content.replace(/linear-gradient\(180deg, #dc2626, #f97316\)/g, 'linear-gradient(180deg, #4338ca, #2563eb)');
content = content.replace(/linear-gradient\(90deg, #ef4444, #f97316\)/g, 'linear-gradient(90deg, #3b82f6, #0ea5e9)');
content = content.replace(/linear-gradient\(135deg, #b91c1c, #dc2626, #ea580c\)/g, 'linear-gradient(135deg, #1e3a8a, #3b82f6, #0ea5e9)');
content = content.replace(/linear-gradient\(135deg, #991b1b, #dc2626, #ea580c\)/g, 'linear-gradient(135deg, #1e3a8a, #2563eb, #38bdf8)');
content = content.replace(/rgba\(251,191,36,0\.2\)/g, 'rgba(56, 189, 248, 0.2)');
content = content.replace(/rgba\(127,29,29,0\.3\)/g, 'rgba(30, 58, 138, 0.3)');

// specific variables at top
content = content.replace(/--red-600: #dc2626;/g, '--red-600: #4338ca;');
content = content.replace(/--orange-500: #f97316;/g, '--orange-500: #2563eb;');
content = content.replace(/--amber-400: #fbbf24;/g, '--amber-400: #0ea5e9;');

// some text styles
content = content.replace(/status-kritis \{ background: #fef2f2; color: #b91c1c; \}/g, 'status-kritis { background: #e0e7ff; color: #3730a3; }');
content = content.replace(/status-siaga \{ background: #fff7ed; color: #c2410c; \}/g, 'status-siaga { background: #dbeafe; color: #1e40af; }');

// btn hovers
content = content.replace(/background: #fff7ed;/g, 'background: #eff6ff;');

fs.writeFileSync(path, content);
console.log("HomePage updated successfully");
