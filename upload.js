async function uploadPDF() {
  const fileInput = document.getElementById("pdfFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("Lütfen PDF seç");
    return;
  }

  const result = document.getElementById("result");
  result.innerHTML = "Uploading...";

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "x-filename": encodeURIComponent(file.name),
      },
      body: file,
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      result.innerHTML =
        "Hata: " + (data.error || "Upload başarısız");
      return;
    }

    result.innerHTML = `
      <p>Upload başarılı ✅</p>
      <p>${file.name}</p>
      <a href="/api/view-pdf?pathname=${encodeURIComponent(data.pathname)}" target="_blank">
  PDF Aç
</a>
    `;
  } catch (error) {
    console.error(error);
    result.innerHTML = "Hata: " + error.message;
  }
}