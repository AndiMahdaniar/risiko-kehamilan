// 1. KNOWLEDGE BASE (Basis Pengetahuan + Penanganan)
const listFaktor = [
    { id: "F01", text: "Usia < 20 tahun atau > 35 tahun", skor: 2, penanganan: "Makan makanan bergizi tinggi kalsium/protein, istirahat 8 jam, jalan ringan 20 menit/hari" },
    { id: "F02", text: "Pernah melahirkan 4 kali atau lebih", skor: 4, penanganan: "Diet zat besi ekstra seperti bayam/daging, hindari angkat berat, tidur miring kiri" },
    { id: "F03", text: "Jarak kehamilan < 2 thn atau > 10 thn", skor: 2, penanganan: "Suplemen folat rutin, minum 8 gelas air, catat berat badan mingguan" },
    { id: "F04", text: "Pernah melahirkan bayi meninggal (Stillbirth)", skor: 4, penanganan: "Hindari stres dan lakukan relaksasi/yoga hamil, makan sayur buah, pantau gerak janin harian" },
    { id: "F05", text: "Pernah melahirkan bayi < 2500 gram (BBLR)", skor: 4, penanganan: "Tambah protein 100g/hari seperti telur/ikan, timbang mingguan (naik 0.5 kg), istirahat siang" },
    { id: "F06", text: "Tekanan darah ≥140/90 mmHg", skor: 4, penanganan: "Diet rendah garam, jalan pagi 15 menit, ukur tekanan darah 2x/minggu, hindari kopi" },
    { id: "F07", text: "Kadar Hemoglobin (Hb) < 11 gr%", skor: 4, penanganan: "Makan bagian hati/daging 2x/minggu, minum jus jeruk (vit C), Fe tablet sesuai anjuran dan hindari minum teh" },
    { id: "F08", text: "Lingkar Lengan Atas (LiLA) < 23.5 cm", skor: 4, penanganan: "Pemberian makanan tambahan(PMT) 3x/hari, konsumsi susu + biskuit gizi, sayur 300g/hari; ukur LILA bulanan" },
    { id: "F09", text: "Riwayat Diabetes Melitus / GDM", skor: 4, penanganan: "Konsumsi karbo kompleks (nasi merah), cek gula puasa mandiri, olahraga ringan 30 menit" },
    { id: "F10", text: "Riwayat Infeksi (TORCH, HIV, Sifilis)", skor: 4, penanganan: "Cuci tangan rutin, hindari kontak orang sakit, makan buah vit A/C, vaksin jika direkomendasikan" },
    { id: "F11", text: "Kaki bengkak + Tekanan darah naik + protein urine (+) (Preeklamsia)", skor: 6, penanganan: "Bed rest kiri, konsumsi rendah garam, pantau bengkak kaki, lapor pusing/mual" },
    { id: "F12", text: "Plasenta menutupi jalan lahir (Plasenta Previa)", skor: 4, penanganan: "Istirahat absolut, hindari hubungan intim/aktivitas, pantau darah keluar" },
    { id: "F13", text: "Janin posisi sungsang (Trimester 3)", skor: 4, penanganan: "Berenang/posisi lutut-dada 10 menit/hari, hindari duduk lama, minum banyak air" },
    { id: "F14", text: "Mengeluarkan darah dari jalan lahir", skor: 4, penanganan: "Berbaring segera, jangan gerak, hubungi bidan darurat, pantau volume darah dan Bedrest total" },
    { id: "F15", text: "Kehamilan Kembar (2 janin atau lebih)", skor: 4, penanganan: "Tambah 500 kcal seperti susu 2 gelas dan protein ekstra, istirahat 10 jam, pantau bengkak/nyeri" }
];


// 2. LOGIKA USER INTERFACE
function showView(viewId) {
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

function validateInput() {
    renderQuestions();
    showView('view-questions');
}

function renderQuestions() {
    const container = document.getElementById('question-list');
    container.innerHTML = ""; 
    
    listFaktor.forEach(f => {
        container.innerHTML += `
            <div class="question-item">
                <input type="checkbox" id="${f.id}" value="${f.skor}">
                <label for="${f.id}">${f.text}</label>
            </div>
        `;
    });
}


// 3. INFERENCE ENGINE & PENANGANAN
function prosesForwardChaining() {
    let totalSkor = 0;
    let daftarPenanganan = []; 
    let adaYangDipilih = false;
    
    let terdeteksiF11 = document.getElementById('F11').checked;
    
    listFaktor.forEach(f => {
        if(document.getElementById(f.id).checked) {
            totalSkor += f.skor;
            daftarPenanganan.push(`<li>${f.penanganan}</li>`);
            adaYangDipilih = true;
        }
    });

    if (!adaYangDipilih) {
        alert("⚠️ Peringatan: Harap pilih minimal satu kondisi skrining sebelum melihat hasil diagnosis.");
        return;
    }

    let klasifikasi = "";
    let cssClass = "";
    let deskripsi = "";

    if (terdeteksiF11 || totalSkor >= 6) {
        klasifikasi = "KRST (Kehamilan Risiko Sangat Tinggi)";
        cssClass = "KRST";
        deskripsi = "⚠️ PERINGATAN: Memerlukan penanganan segera dan pengawasan ketat oleh dokter spesialis.";
    } else if (totalSkor >= 4 && totalSkor < 6) {
        klasifikasi = "KRT (Kehamilan Risiko Tinggi)";
        cssClass = "KRT";
        deskripsi = "⚠️ Kehamilan memiliki risiko tinggi. Disarankan melakukan pemeriksaan lebih rutin.";
    } else {
        klasifikasi = "KRR (Kehamilan Risiko Rendah)";
        cssClass = "KRR";
        deskripsi = "✅ Kehamilan tergolong risiko rendah. Tetap lakukan pemeriksaan kehamilan secara rutin.";
    }

    let htmlPenanganan = "";
    if (daftarPenanganan.length > 0) {
        htmlPenanganan = `
            <div class="rekomendasi-box">
                <h4>💡 Penanganan Mandiri Berdasarkan Gejala:</h4>
                <ul>
                    ${daftarPenanganan.join("")}
                </ul>
            </div>
        `;
    }

    const resultDisplay = document.getElementById('result-display');
    resultDisplay.className = "result-box " + cssClass;
    
    let rawNama = document.getElementById('nama').value.trim();
    let rawUsia = document.getElementById('usia_input').value.trim();

    let namaPasien = rawNama === "" ? "Ibu Hamil" : rawNama;
    let infoUsia = rawUsia === "" ? "" : ` (Usia: ${rawUsia} tahun)`;

    resultDisplay.innerHTML = `
        <h3>${klasifikasi}</h3>
        <p>📊 Total Skor Faktor Risiko: <strong>${totalSkor}</strong></p>
        <p>${deskripsi}</p>
        ${htmlPenanganan}
        <hr>
        <small>👩 Data Pasien: <strong>${namaPasien}</strong>${infoUsia}</small>
    `;
    
    showView('view-result');
}