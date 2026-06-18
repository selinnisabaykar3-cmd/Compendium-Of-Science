async function uploadPDF() {

  const fileInput =
    document.getElementById("pdfFile");

  const file =
    fileInput.files[0];

  if (!file) {

    alert("Lütfen PDF seç");

    return;
  }

  document.getElementById("result")
    .innerHTML =
      "Uploading...";

  try {

    const response =
      await fetch(
        "/api/upload",
        {
          method: "POST",

          headers: {
            "x-filename":
              file.name
          },

          body: file
        }
      );

    const text =
  await response.text();

console.log(text);

document.getElementById("result")
  .innerHTML = text;

return;
    if (data.url) {

      document.getElementById("result")
        .innerHTML =
          `
          <p>Upload successful!</p>

          <a href="${data.url}"
             target="_blank">
             Open PDF
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