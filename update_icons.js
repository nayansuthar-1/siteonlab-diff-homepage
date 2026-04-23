const fs = require('fs');
const file = 'src/components/sections/WhatWeDo.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/iconBg: "([^"]+)"/g, (match, p1) => {
  const mobile = p1.replace(/group-hover:/g, '');
  const desktopHover = p1.replace(/group-hover:/g, 'md:group-hover:');
  const desktopBase = 'md:bg-[#181818] md:border-[rgba(255,255,255,0.12)] md:shadow-none';
  return `iconBg: "${mobile} ${desktopBase} ${desktopHover}"`;
});

content = content.replace(/iconColor: "([^"]+)"/g, (match, p1) => {
  const mobile = p1.replace(/group-hover:/g, '').replace(/group-\\[&:hover\\]:/g, '');
  const desktopHover = p1.replace(/group-hover:/g, 'md:group-hover:').replace(/group-\\[&:hover\\]:/g, 'md:group-[&:hover]:');
  const desktopBase = 'md:text-[#8e95a3] md:[filter:none]';
  return `iconColor: "${mobile} ${desktopBase} ${desktopHover}"`;
});

fs.writeFileSync(file, content);
console.log("Updated icons");
