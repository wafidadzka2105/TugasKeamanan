// Data ancaman dengan STRIDE & DREAD
const threatDatabase = {
  "Server Database": {
    threatType: "SQL Injection",
    description: "Ancaman yang memungkinkan penyerang menyuntikkan perintah SQL untuk mengakses atau memodifikasi data sensitif.",
    strideCategories: ["Tampering", "Repudiation", "Information Disclosure"],
    dreadScores: {
      damage: 9,
      reproducibility: 8,
      exploitability: 7,
      affectedUsers: 10,
      discoverability: 6,
    },
  },
  "Web Application": {
    threatType: "Cross-Site Scripting (XSS)",
    description: "Serangan yang memungkinkan skrip berbahaya dijalankan pada browser pengguna.",
    strideCategories: ["Spoofing", "Information Disclosure"],
    dreadScores: {
      damage: 8,
      reproducibility: 9,
      exploitability: 8,
      affectedUsers: 7,
      discoverability: 8,
    },
  },
  "Network Gateway": {
    threatType: "Man-in-the-Middle (MITM)",
    description: "Penyerangan di mana penyerang memantau dan memanipulasi komunikasi antara dua pihak tanpa diketahui.",
    strideCategories: ["Tampering", "Information Disclosure", "Elevation of Privilege"],
    dreadScores: {
      damage: 7,
      reproducibility: 6,
      exploitability: 8,
      affectedUsers: 9,
      discoverability: 7,
    },
  },
  "API Gateway": {
    threatType: "API Abuse",
    description: "Penyalahgunaan API oleh pengguna yang tidak sah untuk mengakses data atau layanan.",
    strideCategories: ["Denial of Service", "Information Disclosure"],
    dreadScores: {
      damage: 8,
      reproducibility: 7,
      exploitability: 6,
      affectedUsers: 9,
      discoverability: 8,
    },
  },
};

// Handle dropdown change
document.getElementById("asset").addEventListener("change", function () {
  const asset = this.value;

  if (threatDatabase[asset]) {
    const data = threatDatabase[asset];
    const scores = data.dreadScores;

    // Hitung Risk Score
    const riskScore = (
      (scores.damage + scores.reproducibility + scores.exploitability + scores.affectedUsers + scores.discoverability) / 5
    ).toFixed(2);

    // Update UI dengan data ancaman
    document.getElementById("threatType").textContent = data.threatType;
    document.getElementById("description").textContent = data.description;
    document.getElementById("strideCategories").textContent = data.strideCategories.join(", ");
    document.getElementById("damage").textContent = scores.damage;
    document.getElementById("reproducibility").textContent = scores.reproducibility;
    document.getElementById("exploitability").textContent = scores.exploitability;
    document.getElementById("affectedUsers").textContent = scores.affectedUsers;
    document.getElementById("discoverability").textContent = scores.discoverability;
    document.getElementById("riskScore").textContent = riskScore;
  } else {
    alert("Data untuk asset ini tidak ditemukan.");
  }
});

// Menangani form submission
document.getElementById("threatForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const asset = document.getElementById("asset").value;
  if (!asset) {
    alert("Pilih asset terlebih dahulu.");
    return;
  }

  const dashboard = document.getElementById("threatDashboard");
  const threatDiv = document.createElement("div");
  threatDiv.classList.add("threat");
  threatDiv.innerHTML = `
    <h3>${asset} - ${document.getElementById("threatType").textContent}</h3>
    <p>${document.getElementById("description").textContent}</p>
    <p><strong>STRIDE Categories:</strong> ${document.getElementById("strideCategories").textContent}</p>
    <p><strong>DREAD Scores:</strong></p>
    <ul>
      <li>Damage: ${document.getElementById("damage").textContent}</li>
      <li>Reproducibility: ${document.getElementById("reproducibility").textContent}</li>
      <li>Exploitability: ${document.getElementById("exploitability").textContent}</li>
      <li>Affected Users: ${document.getElementById("affectedUsers").textContent}</li>
      <li>Discoverability: ${document.getElementById("discoverability").textContent}</li>
    </ul>
    <p><strong>Risk Score:</strong> ${document.getElementById("riskScore").textContent}</p>
  `;

  dashboard.appendChild(threatDiv);
});
