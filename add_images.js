const fs = require('fs');
let code = fs.readFileSync('js/data.js', 'utf8');

const images = {
  'manali': 'https://images.unsplash.com/photo-1626714486580-08709e99a341?q=80&w=1600&auto=format&fit=crop',
  'shimla': 'https://images.unsplash.com/photo-1596522521191-44755106828f?q=80&w=1600&auto=format&fit=crop',
  'spiti': 'https://images.unsplash.com/photo-1605649487212-4dcb18c0cb8db?q=80&w=1600&auto=format&fit=crop',
  'dharamshala': 'https://images.unsplash.com/photo-1622308644420-a6e545dff66e?q=80&w=1600&auto=format&fit=crop',
  'kasol': 'https://images.unsplash.com/photo-1521651201144-634f700b36ef?q=80&w=1600&auto=format&fit=crop',
  'kinnaur': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop',
  'dalhousie': 'https://images.unsplash.com/photo-1513220556209-66c30ddde66f?q=80&w=1600&auto=format&fit=crop',
  'bir': 'https://images.unsplash.com/photo-1610444583163-9a3d45c55209?q=80&w=1600&auto=format&fit=crop',
  'chamba': 'https://images.unsplash.com/photo-1628126235206-5260b9ea6441?q=80&w=1600&auto=format&fit=crop',
  'kullu': 'https://images.unsplash.com/photo-1636173268840-058df89ff658?q=80&w=1600&auto=format&fit=crop',
  
  'hampta': 'https://images.unsplash.com/photo-1605649487212-4dcb18c0cb8db?q=80&w=1600&auto=format&fit=crop',
  'bhrigu': 'https://images.unsplash.com/photo-1600010991807-657abeb552ed?q=80&w=1600&auto=format&fit=crop',
  'kheerganga': 'https://images.unsplash.com/photo-1622308644420-a6e545dff66e?q=80&w=1600&auto=format&fit=crop',
  'triund': 'https://images.unsplash.com/photo-1596522521191-44755106828f?q=80&w=1600&auto=format&fit=crop',
  'pinparvati': 'https://images.unsplash.com/photo-1626714486580-08709e99a341?q=80&w=1600&auto=format&fit=crop',
  'prashar': 'https://images.unsplash.com/photo-1521651201144-634f700b36ef?q=80&w=1600&auto=format&fit=crop',
  'chandrakhani': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop',
  'beaskund': 'https://images.unsplash.com/photo-1610444583163-9a3d45c55209?q=80&w=1600&auto=format&fit=crop'
};

for (const [id, url] of Object.entries(images)) {
  const regex = new RegExp(`({ id:'${id}',)`, 'g');
  code = code.replace(regex, `$1 image:'${url}',`);
}

fs.writeFileSync('js/data.js', code);
console.log('Images injected successfully.');
