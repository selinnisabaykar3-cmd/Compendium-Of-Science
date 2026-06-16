async function uploadPDF() {

  const fileInput =
    document.getElementById("pdfFile");

  const file =
    fileInput.files[0];

  if (!file) {
    alert("PDF seç");
    return;
  }

  const formData =
    new FormData();

  formData.append("file", file);

  const response =
    await fetch("/api/upload", {
      method: "POST",
      body: formData
    });

  const data =
    await response.json();

  document.getElementById("result")
    .innerHTML =
      data.url || data.error;

}