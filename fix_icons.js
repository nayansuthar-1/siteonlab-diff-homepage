const fs = require('fs');
const file = 'src/components/sections/WhatWeDo.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/iconColor: "([^"]+)"/g, (match, p1) => {
  const colorMatch = p1.match(/text-\[#([a-f0-9]+)\]/);
  const rgbaMatch = p1.match(/rgba\([^)]+\)/);
  if (!colorMatch || !rgbaMatch) return match;
  
  const hex = colorMatch[0];
  const rgba = rgbaMatch[0];
  
  const mobile = `${hex} [filter:drop-shadow(0_0_8px_${rgba})]`;
  const desktopBase = `md:text-[#8e95a3] md:[filter:none]`;
  const desktopHover = `md:group-hover:${hex} md:group-[&:hover]:[filter:drop-shadow(0_0_8px_${rgba})]`;
  
  return `iconColor: "${mobile} ${desktopBase} ${desktopHover}"`;
});

fs.writeFileSync(file, content);
console.log("Fixed iconColor");
