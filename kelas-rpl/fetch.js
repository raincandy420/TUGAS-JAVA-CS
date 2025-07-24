// Replace this URL with your actual Replit backend URL
const BASE_URL = 'https://fatal-some-metadata.96nekotanker.repl.co';

function loadImages(kelas, containerId) {
  fetch(`${BASE_URL}/images/${kelas}`)
    .then(res => res.json())
    .then(images => {
      const container = document.getElementById(containerId);
      container.innerHTML = '';
      images.forEach(img => {
        const el = document.createElement('img');
        el.src = img.url;
        el.alt = img.name;
        el.className = 'gallery-img';
        container.appendChild(el);
      });
    })
    .catch(err => {
      console.error(`Failed to load images for ${kelas}:`, err);
    });
}

// Load images for each class
loadImages('X', 'img-X');
loadImages('XI', 'img-XI');
loadImages('XII', 'img-XII');