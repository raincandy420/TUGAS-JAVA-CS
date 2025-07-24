// Data cerita (scene dan pilihan)
const story = [
    {
        background: 'ui/background/Class.webp',
        character: 'Mon1', // ID sprite Monika yang sesuai
        name: 'Kamu',
        text: "Halo, teman-teman! Sebelum kita mulai, aku ingin memperkenalkan seseorang yang akan membantu presentasi kami hari ini…",
        choices: []
    },
    {
        background: 'ui/background/Class.webp',
        character: 'Mon2', // ID sprite Monika yang sesuai
        name: 'Kamu',
        text: "Perkenalkan, ini Monika!",
        choices: []
    },
    {
        background: 'ui/background/Class.webp',
        character: 'Mon2', // ID sprite Monika yang sesuai
        name: 'Monika',
        text: "Ahaha~! Halo, semuanya! Senang bisa ada di sini! Aku Monika, presiden Klub Sastra ini… dan kali ini, aku akan membantu presentasi ini agar lebih menyenangkan!",
        choices: []
    },
    {
        background: 'ui/background/Class.webp',
        character: 'Mon2', // ID sprite Monika yang sesuai
        name: 'Monika',
        text: "Tentu saja, aku juga akan memastikan tidak ada yang tertidur selama presentasi ini… ahaha~!",
        choices: []
    },
    {
        background: 'ui/background/Class.webp',
        character: 'Mon1', // ID sprite Monika yang sesuai
        name: 'Kamu',
        text: "Dan bersama kelompok saya, hari ini kami akan mempresentasikan tentang…",
        choices: []
    },
    {
        background: 'ui/background/Class.webp',
        character: 'Mon1', // ID sprite Monika yang sesuai
        name: 'Kelompok',
        text: "Dampak Pendidikan Terhadap Perubahan Sosial, Ekonomi, dan Budaya di Desa Sai!",
        choices: []
    },
    {
        background: 'ui/background/Class.webp',
        character: 'Mon2', // ID sprite Monika yang sesuai
        name: 'Monika',
        text: "Luar biasa! Sepertinya ini akan menjadi topik yang menarik! Baiklah, ayo mulai!",
        choices: []
    },
    {
        background: 'ui/background/Class.webp',
        character: 'Mon1', // ID sprite Monika yang sesuai
        name: 'Kamu',
        text: "Mari kita mulai dengan perubahan sosial! Pendidikan di Desa Sai membawa perubahan besar dalam cara masyarakat berinteraksi dan memandang status sosial.",
        choices: []
    },
    {
        background: 'ui/background/Class.webp',
        character: 'Mon2', // ID sprite Monika yang sesuai
        name: 'Monika',
        text: "Ahaha~! Aku suka bagian ini! Jadi, dulunya di Desa Sai, status sosial seseorang ditentukan oleh seberapa luas tanah yang mereka miliki, kan?",
        choices: []
    },
    {
        background: 'ui/background/Class.webp',
        character: 'Mon1', // ID sprite Monika yang sesuai
        name: 'Kamu',
        text: "Betul. Kalau kamu punya sawah luas, kamu otomatis dihormati. Tapi setelah pendidikan berkembang, masyarakat mulai menghargai ilmu lebih dari sekadar kekayaan.",
        choices: []
    },
    {
        background: 'ui/background/Class.webp',
        character: 'Mon2', // ID sprite Monika yang sesuai
        name: 'Monika',
        text: "Jadi, kalau di Klub Sastra, status kita ditentukan dari seberapa banyak puisi yang kita tulis… oh, tapi kalau begitu Sayori yang paling tinggi, ya? Ahaha~!",
        choices: []
    },
    {
        background: 'ui/background/Class.webp',
        character: 'Mon1', // ID sprite Monika yang sesuai
        name: 'Kamu',
        text: "Iya, mungkin begitu! Tapi kembali ke Desa Sai, sekarang mereka yang berpendidikan tinggi lebih dihormati, meskipun mereka tidak punya lahan pertanian.",
        choices: []
    },
    {
        background: 'ui/background/Class.webp',
        character: 'Mon2', // ID sprite Monika yang sesuai
        name: 'Monika',
        text: "Itu perubahan besar! Tapi aku penasaran… apakah semua orang di sana menerima perubahan ini dengan mudah?",
        choices: []
    },
    {
        background: 'ui/background/Class.webp',
        character: 'Mon1', // ID sprite Monika yang sesuai
        name: 'Kamu',
        text: "Tidak juga. Beberapa orang tua masih berpegang pada pandangan lama bahwa tanah adalah segalanya. Tapi generasi muda lebih terbuka terhadap perubahan ini!",
        choices: []
    },
    {
        background: 'ui/background/Class.webp',
        character: 'Mon2', // ID sprite Monika yang sesuai
        name: 'Monika',
        text: "Wah, itu mirip dengan bagaimana beberapa orang lebih suka membaca buku cetak, sementara yang lain lebih suka membaca di internet. Dunia terus berubah, dan kita harus bisa beradaptasi, bukan?",
        choices: []
    },
    {
        background: 'ui/background/Class.webp',
        character: 'Mon1', // ID sprite Monika yang sesuai
        name: 'Kamu',
        text: "Tepat sekali, Monika! Sekarang, mari kita lanjut ke perubahan budaya!",
        choices: []
    }
];

let currentScene = 0;

// Elemen DOM
const bgElement = document.getElementById('bg-image');
const nameElement = document.getElementById('name-text');
const dialogueElement = document.getElementById('dialogue-text');
const choicesElement = document.getElementById('choices');

// Fungsi untuk memuat scene
function loadScene(sceneIndex) {
    const scene = story[sceneIndex];
    if (!scene) return;

    // Update background
    bgElement.src = scene.background;

    // Update karakter
    const allSprites = document.querySelectorAll('.monika-sprite');
    allSprites.forEach(sprite => sprite.classList.remove('active')); // Sembunyikan semua sprite
    const activeSprite = document.getElementById(scene.character);
    if (activeSprite) activeSprite.classList.add('active'); // Tampilkan sprite yang sesuai

    // Update nama dan teks dialog
    nameElement.textContent = scene.name;
    dialogueElement.textContent = scene.text;

    // Update pilihan
    choicesElement.innerHTML = '';
    if (scene.choices.length > 0) {
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                loadScene(choice.next);
            });
            choicesElement.appendChild(button);
        });
    }
}

// Tombol "Next" untuk melanjutkan cerita
document.addEventListener('click', () => {
    currentScene++;
    loadScene(currentScene);
});

// Mulai permainan
loadScene(0);