const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/admin/AdminDashboard.tsx',
  'src/pages/provider/ProviderDashboard.tsx',
  'src/pages/provider/ServicesPage.tsx',
  'src/data/providerDashboard.ts'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace ? followed by a digit with ₹ followed by the digit
    // Note: The previous powershell command replaced $ with ?.
    // In ServicesPage.tsx, we had $120+ -> ?120+
    content = content.replace(/\?(\d)/g, '₹$1');
    
    // Some corrupted characters may have also crept in at the beginning of files depending on PS BOM encoding
    // Let's strip out PS BOM if it was added incorrectly
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    
    // Write back with UTF-8 encoding
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed', file);
  }
});
