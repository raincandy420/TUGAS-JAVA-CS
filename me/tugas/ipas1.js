document.addEventListener("DOMContentLoaded", function () {
    const textbox = document.getElementById("textbox");
    const namebox = document.getElementById("namebox");
    const background = document.getElementById("classroom");
    const characterContainer = document.querySelector(".chracter");

    // Hide all Monika sprites initially
    document.querySelectorAll(".chracter img").forEach(img => img.style.display = "none");

    // Define characters and sprites
    const characters = {
        monika: {
            name: "Monika",
            sprites: {
                idle: "Mon1",
                talk: "Mon2",
                happy: "Mon10",
                happyTalk: "Mon11",
                teehee: "Mon12",
                pointIdle: "Ika1",
                pointTalk: "Ika2",
                sideIdle: "3aa",
                sideTalk: "3bb"
            }
        },
        player: { name: "", sprite: "" },
        kelompok: { name: "Kelompok", sprite: "" }
    };

    // Dialogue script
    const script = [
        { character: "player", text: "Halo, teman-teman! Sebelum kita mulai, aku ingin memperkenalkan seseorang yang akan membantu presentasi kami hari ini…" },
        { character: "player", text: "Perkenalkan, ini Monika!" },
        { character: "monika", text: "Ahaha~! Halo, semuanya! Senang bisa ada di sini!", sprite: "teehee" },
        { character: "monika", text: "Aku Monika, presiden Klub Sastra ini… dan kali ini, aku akan membantu presentasi ini agar lebih menyenangkan!", sprite: "talk" },
        { character: "monika", text: "Tentu saja, aku juga akan memastikan tidak ada yang tertidur selama presentasi ini… ahaha~!", sprite: "happyTalk" },
        { character: "player", text: "Dan bersama kelompok saya, hari ini kami akan mempresentasikan tentang…" },
        { character: "kelompok", text: "Dampak Pendidikan Terhadap Perubahan Sosial, Ekonomi, dan Budaya di Desa Sai!" },
        { character: "monika", text: "Luar biasa! Sepertinya ini akan menjadi topik yang menarik! Baiklah, ayo mulai!", sprite: "pointTalk" },

        // **Perubahan Sosial**
        { character: "player", text: "Mari kita mulai dengan perubahan sosial! Pendidikan di Desa Sai membawa perubahan besar dalam cara masyarakat berinteraksi dan memandang status sosial." },
        { character: "monika", text: "Ahaha~! Aku suka bagian ini!", sprite: "happy" },
        { character: "monika", text: "Jadi, dulunya di Desa Sai, status sosial seseorang ditentukan oleh seberapa luas tanah yang mereka miliki, kan?", sprite: "talk" },
        { character: "player", text: "Betul. Kalau kamu punya sawah luas, kamu otomatis dihormati. Tapi setelah pendidikan berkembang, masyarakat mulai menghargai ilmu lebih dari sekadar kekayaan." },
        { character: "monika", text: "Jadi, kalau di Klub Sastra, status kita ditentukan dari seberapa banyak puisi yang kita tulis… oh, tapi kalau begitu Sayori yang paling tinggi, ya? Ahaha~!", sprite: "sideTalk" },
        { character: "player", text: "Iya, mungkin begitu! Tapi kembali ke Desa Sai, sekarang mereka yang berpendidikan tinggi lebih dihormati, meskipun mereka tidak punya lahan pertanian." },
        { character: "monika", text: "Itu perubahan besar! Tapi aku penasaran… apakah semua orang di sana menerima perubahan ini dengan mudah?", sprite: "pointIdle" },
        { character: "player", text: "Tidak juga. Beberapa orang tua masih berpegang pada pandangan lama bahwa tanah adalah segalanya. Tapi generasi muda lebih terbuka terhadap perubahan ini!" },
        { character: "monika", text: "Wah, itu mirip dengan bagaimana beberapa orang lebih suka membaca buku cetak, sementara yang lain lebih suka membaca di internet. Dunia terus berubah, dan kita harus bisa beradaptasi, bukan?", sprite: "happyTalk" },
        { character: "player", text: "Tepat sekali, Monika! Sekarang, mari kita lanjut ke perubahan budaya!" },

        // **Perubahan Budaya (Background Change)**
        { character: "narrator", text: "(Slide berganti ke Perubahan Budaya...)", changeBg: "classroom2" },
        { character: "player", text: "Budaya di Desa Sai juga mengalami banyak perubahan akibat pendidikan. Misalnya, dalam penggunaan bahasa." },
        { character: "monika", text: "Ah, aku tahu ini!", sprite: "happy" },
        { character: "monika", text: "Dulu mereka hanya berbicara dalam bahasa daerah mereka, Bahasa Mbojo. Tapi sekarang, semakin banyak yang menggunakan Bahasa Indonesia, bahkan ada yang mulai belajar bahasa Inggris!", sprite: "talk" },
        { character: "player", text: "Benar. Tapi perubahan ini tidak selalu diterima dengan baik. Beberapa orang tua merasa kehilangan jati diri budaya mereka karena anak-anaknya lebih sering berbicara dalam bahasa lain." },
        { character: "monika", text: "Itu seperti bagaimana aku—ah… tunggu, aku hampir mengatakan sesuatu yang seharusnya tidak kukatakan! Ahaha~!", sprite: "happyTalk" },
        { character: "player", text: "Eh? Maksudmu apa?" },
        { character: "monika", text: "Oh, tidak apa-apa~! Lanjut saja, lanjut saja~!", sprite: "sideIdle" },
        { character: "player", text: "Selain bahasa, kesenian tradisional juga mulai ditinggalkan. Seni ukir dan lagu-lagu daerah yang dulu populer, kini mulai tergantikan oleh hiburan modern." },
        { character: "monika", text: "Aku mengerti… jadi seperti bagaimana orang-orang lebih suka mendengar musik pop dibanding lagu-lagu tradisional?", sprite: "talk" },
        { character: "player", text: "Tepat sekali! Tapi ini juga bagian dari perkembangan zaman. Yang penting, kita tidak melupakan akar budaya kita." },
        { character: "monika", text: "Kedengarannya seperti pesan moral di akhir novel… tapi kita belum selesai! Mari kita lanjut ke perubahan ekonomi!", sprite: "pointTalk" },

        // **Transition to ipas2.html**
        { character: "narrator", text: "(Slide berganti ke Perubahan Ekonomi...)", transition: "ipas2.html" }
    ];

    let currentIndex = 0;

    function updateDialogue() {
        if (currentIndex < script.length) {
            const line = script[currentIndex];
    
            console.log("Current character:", line.character);
            console.log("Sprite ID to show:", characters.monika.sprites[line.sprite]); // Debugging
    
            if (line.changeBg) {
                background.src = `ui/background/${line.changeBg}.webp`;
            }
    
            if (line.transition) {
                fadeOutAndRedirect(line.transition);
                return;
            }
    
            if (line.character === "player") {
                namebox.style.display = "none";
                document.querySelectorAll(".chracter img").forEach(img => img.style.display = "none");
            } else {
                namebox.style.display = "block";
                namebox.innerText = characters.monika.name;
    
                // Hide all sprites first
                document.querySelectorAll(".chracter img").forEach(img => img.style.display = "none");
    
                // Get the correct sprite ID and show it
                const spriteID = characters.monika.sprites[line.sprite];
                const sprite = document.getElementById(spriteID);
    
                if (sprite) {
                    sprite.style.display = "block";
                    sprite.style.opacity = "1";
                    sprite.style.transform = "scale(1.5)";
                    console.log("Sprite is now visible:", spriteID);
                } else {
                    console.warn("Sprite not found:", spriteID);
                }
            }
    
            textbox.innerText = line.text;
        }
    }
    

    function nextDialogue() {
        currentIndex++;
        updateDialogue();
    }

    document.addEventListener("click", nextDialogue);
    document.addEventListener("contextmenu", event => {
        event.preventDefault();
        nextDialogue();
    });

    updateDialogue();
});
document.querySelector("#Mon1").style.display = "block";
document.querySelector("#Mon1").style.opacity = "1";
