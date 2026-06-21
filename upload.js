async function uploadPDF() {

  const title =
    document.getElementById("title").value;

  const category =
    document.getElementById("category").value;

  const fileInput =
    document.getElementById("pdfFile");

  const file =
    fileInput.files[0];

  if (!title) {
    alert("Başlık giriniz");
    return;
  }

  if (!file) {
    alert("Lütfen PDF seç");
    return;
  }

  document.getElementById("result").innerHTML =
    "Uploading...";

  try {

    const response =
      await fetch(
        "/api/upload",
        {
          method: "POST",

          headers: {
            "x-filename":
              encodeURIComponent(file.name)
          },

          body: file
        }
      );

    const data =
      await response.json();

    console.log(data);

    if (data.success) {

      document.getElementById("result")
        .innerHTML =
        `
        <p>✅ Upload başarılı</p>

        <p><b>${title}</b></p>

        <p>Kategori: ${category}</p>

        <a href="${data.url}"
           target="_blank">
           PDF Aç
        </a>
        `;

    } else {

      document.getElementById("result")
        .innerHTML =
        data.error;

    }

  } catch (error) {

    document.getElementById("result")
      .innerHTML =
      error.message;

  }

}