function uploadFile() {

```
const file =
document.getElementById("pdfUpload")
.files[0];

const status =
document.getElementById("status");

if(!file){

    status.innerHTML =
    "Please select a PDF file.";

    return;
}

status.innerHTML =
`Selected file: ${file.name}`;
```

}

