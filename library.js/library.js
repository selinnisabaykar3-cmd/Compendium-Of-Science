const resources =
  JSON.parse(
    localStorage.getItem("resources")
    || "[]"
  );

const container =
  document.getElementById("resources");

if (resources.length === 0) {

  container.innerHTML =
    "<p>No uploaded resources yet.</p>";

} else {

  resources.forEach(resource => {

    container.innerHTML += `
      <div class="resource-card">

        <h3>${resource.title}</h3>

        <p>Category: ${resource.category}</p>

        <a href="${resource.url}"
           target="_blank">

           Open PDF

        </a>

      </div>
    `;

  });

}