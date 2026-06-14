function uploadFile() {

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

let resources =
JSON.parse(
    localStorage.getItem("resources")
) || [];

resources.push(file.name);

localStorage.setItem(
    "resources",
    JSON.stringify(resources)
);

status.innerHTML =
`${file.name} uploaded successfully.`;

loadResources();


}

function loadResources(){


const list =
document.getElementById("resourceList");

let resources =
JSON.parse(
    localStorage.getItem("resources")
) || [];

list.innerHTML = "";

resources.forEach(resource => {

    list.innerHTML += `
        <li>${resource}</li>
    `;

});


}

window.onload = loadResources;
