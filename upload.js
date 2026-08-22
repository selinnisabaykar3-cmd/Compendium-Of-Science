function openUploadPanel() {
const libraryView = document.getElementById('libraryView');
const uploadView = document.getElementById('uploadView');

if (libraryView) {
libraryView.classList.add('hidden');
}

if (uploadView) {
uploadView.classList.remove('hidden');
}
}

function closeUploadPanel() {
const libraryView = document.getElementById('libraryView');
const uploadView = document.getElementById('uploadView');

if (uploadView) {
uploadView.classList.add('hidden');
}

if (libraryView) {
libraryView.classList.remove('hidden');
}
}


let selectedFolderColor = '#6366f1';

const DEFAULT_FOLDERS = [
  {
    id: 'biology',
    name: 'Biology',
    color: '#22c55e'
  },
  {
    id: 'physics',
    name: 'Physics',
    color: '#6366f1'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    color: '#ef4444'
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    color: '#f59e0b'
  },
  {
    id: 'astronomy',
    name: 'Astronomy',
    color: '#8b5cf6'
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    color: '#06b6d4'
  }
];


// -----------------------------
// FOLDERS
// -----------------------------

function getFolders() {
  const savedFolders = localStorage.getItem('researchFolders');

  if (!savedFolders) {
    localStorage.setItem(
      'researchFolders',
      JSON.stringify(DEFAULT_FOLDERS)
    );

    return DEFAULT_FOLDERS;
  }

  try {
    return JSON.parse(savedFolders);
  } catch (error) {
    console.error('Folder data error:', error);
    return DEFAULT_FOLDERS;
  }
}


function saveFolders(folders) {
  localStorage.setItem(
    'researchFolders',
    JSON.stringify(folders)
  );
}


function loadFolders() {
  const category = document.getElementById('category');

  if (!category) {
    return;
  }

  const folders = getFolders();

  category.innerHTML = '';

  folders.forEach(function (folder) {
    const option = document.createElement('option');

    option.value = folder.id;
    option.textContent = folder.name;

    category.appendChild(option);
  });
}


// -----------------------------
// NEW FOLDER
// -----------------------------

function openFolderCreator() {
  const modal = document.getElementById('folderModal');

  if (modal) {
    modal.classList.remove('hidden');
  }
}


function closeFolderCreator() {
  const modal = document.getElementById('folderModal');

  if (modal) {
    modal.classList.add('hidden');
  }
}


function createFolder() {
  const input = document.getElementById('newFolderName');

  if (!input) {
    return;
  }

  const name = input.value.trim();

  if (!name) {
    alert('Lütfen klasör adı gir.');
    return;
  }

  const folders = getFolders();

  const alreadyExists = folders.some(function (folder) {
    return folder.name.toLowerCase() === name.toLowerCase();
  });

  if (alreadyExists) {
    alert('Bu isimde bir klasör zaten var.');
    return;
  }

  let folderId = name
    .toLowerCase()
    .replace(/[^a-z0-9ğüşıöç]+/gi, '-')
    .replace(/^-+|-+$/g, '');

  if (!folderId) {
    folderId = 'folder-' + Date.now();
  }

  const newFolder = {
    id: folderId,
    name: name,
    color: selectedFolderColor
  };

  folders.push(newFolder);

  saveFolders(folders);
  loadFolders();

  const category = document.getElementById('category');

  if (category) {
    category.value = folderId;
  }

  input.value = '';

  closeFolderCreator();
}


// -----------------------------
// COLOR PICKER
// -----------------------------

function setupColorPicker() {
  const colorButtons =
    document.querySelectorAll('.color-option');

  colorButtons.forEach(function (button) {
    button.addEventListener('click', function () {

      colorButtons.forEach(function (item) {
        item.classList.remove('selected');
      });

      button.classList.add('selected');

      selectedFolderColor =
        button.getAttribute('data-color');
    });
  });
}


// -----------------------------
// FILE PICKER
// -----------------------------

function setupFilePicker() {
  const fileInput =
    document.getElementById('pdfFile');

  const selectedFiles =
    document.getElementById('selectedFiles');

  if (!fileInput || !selectedFiles) {
    return;
  }

  fileInput.addEventListener('change', function () {

    selectedFiles.innerHTML = '';

    const files =
      Array.from(fileInput.files);

    if (files.length === 0) {
      return;
    }

    files.forEach(function (file) {

      const item =
        document.createElement('div');

      item.className = 'selected-file';

      item.textContent =
        '📄 ' + file.name;

      selectedFiles.appendChild(item);
    });
  });
}


// -----------------------------
// UPLOAD
// -----------------------------

async function uploadPDF() {

  const fileInput =
    document.getElementById('pdfFile');

  const titleInput =
    document.getElementById('title');

  const category =
    document.getElementById('category');

  const result =
    document.getElementById('result');


  if (!fileInput || !category || !result) {
    return;
  }


  const files =
    Array.from(fileInput.files);


  if (files.length === 0) {
    alert('Lütfen en az bir PDF seç.');
    return;
  }


  const folderId =
    category.value;


  const folders =
    getFolders();


  const folder =
    folders.find(function (item) {
      return item.id === folderId;
    });


  if (!folder) {
    alert('Lütfen bir klasör seç.');
    return;
  }


  const title =
    titleInput
      ? titleInput.value.trim()
      : '';


  let successCount = 0;
  let failedCount = 0;

  const uploadedItems = [];


  for (let i = 0; i < files.length; i++) {

    const file = files[i];

    result.innerHTML =
      'Uploading ' +
      (i + 1) +
      '/' +
      files.length +
      ': ' +
      escapeHTML(file.name);


    try {

      /*
       * PDF Blob içinde şu şekilde saklanacak:
       *
       * biology/file.pdf
       * physics/file.pdf
       * my-folder/file.pdf
       */

      const filename =
        folder.id + '/' + file.name;


      const response =
        await fetch('/api/upload', {
          method: 'POST',

          headers: {
            'x-filename':
              encodeURIComponent(filename)
          },

          body: file
        });


     const responseText = await response.text();

let data = {};

try {
  data = responseText
    ? JSON.parse(responseText)
    : {};
} catch (error) {
  console.error(
    'API returned non-JSON:',
    responseText
  );

  data = {
    error:
      'API JSON döndürmedi. HTTP ' +
      response.status +
      ' - ' +
      responseText
  };
}


      console.log('Upload result:', data);


    if (!response.ok) {

  console.error('UPLOAD FAILED:', data);

  uploadedItems.push({
    fileName: file.name,
    error: data.error || 'Bilinmeyen hata'
  });

  failedCount++;

  continue;
}


      successCount++;


      uploadedItems.push({
        fileName: file.name,
        title: title || file.name,
        folderId: folder.id,
        folderName: folder.name,
        folderColor: folder.color,
        pathname: data.pathname,
        url: data.url
      });


    } catch (error) {

  console.error('Upload error:', error);

  result.innerHTML =
    '<p>PDF yüklenemedi ❌</p>' +
    '<p>Hata: ' +
    escapeHTML(error.message || 'Bilinmeyen hata') +
    '</p>';

  failedCount++;
}
  }



      '📄 ' +
      escapeHTML(item.fileName) +

      '<br>' +

      '<a href="/api/view-pdf?pathname=' +
      encodeURIComponent(item.pathname) +
      '" target="_blank">' +

      'PDF Aç' +

      '</a>' +

      '</div>';
  };


  result.innerHTML = resultHTML;


  // -----------------------------
  // RESULT
  // -----------------------------

// -----------------------------
// RESULT
// -----------------------------

let resultHTML =
  '<p><strong>' +
  successCount +
  '</strong> PDF başarıyla yüklendi ✅</p>';

if (failedCount > 0) {
  resultHTML +=
    '<p><strong>' +
    failedCount +
    '</strong> PDF yüklenemedi ❌</p>';
}

uploadedItems.forEach(function (item) {

 if (item.error) {

  resultHTML +=
    '<div class="selected-file">' +
    '📄 ' +
    escapeHTML(item.fileName) +
    '<br>' +
    '<strong>Hata:</strong> ' +
    escapeHTML(item.error) +
    '</div>';

  return;
}

if (!item.pathname) {
  return;
}

  resultHTML +=
    '<div class="selected-file">' +
    '📄 ' +
    escapeHTML(item.fileName) +
    '<br>' +
    '<a href="/api/view-pdf?pathname=' +
    encodeURIComponent(item.pathname) +
    '" target="_blank">' +
    'PDF Aç' +
    '</a>' +
    '</div>';
});

result.innerHTML = resultHTML;

saveUploadedResources(uploadedItems);



// -----------------------------
// SAVE RESOURCES
// -----------------------------

function saveUploadedResources(items) {

  const savedResources =
    localStorage.getItem('uploadedResources');

  let resources = [];


  try {

    if (savedResources) {
      resources =
        JSON.parse(savedResources);
    }

  } catch (error) {

    console.error(
      'Resource data error:',
      error
    );

    resources = [];
  }


  resources.push.apply(
    resources,
    items
  );


  localStorage.setItem(
    'uploadedResources',
    JSON.stringify(resources)
  );
}


// -----------------------------
// HTML SAFETY
// -----------------------------

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


// -----------------------------
// START
// -----------------------------

document.addEventListener(
  'DOMContentLoaded',
  function () {

    loadFolders();

    setupColorPicker();

    setupFilePicker();

    loadUploadedResources();

  }
);

function loadUploadedResources() {
  const savedResources =
    localStorage.getItem('uploadedResources');

  const emptyMessage =
    document.getElementById('emptyMessage');

  const resourceList =
    document.getElementById('resourceList');

  if (!emptyMessage || !resourceList) {
    return;
  }

  if (!savedResources) {
    emptyMessage.textContent =
      "You don't have any uploaded PDFs yet.";

    return;
  }

  let resources = [];

  try {
    resources = JSON.parse(savedResources);
  } catch (error) {
    resources = [];
  }

  if (resources.length === 0) {
    emptyMessage.textContent =
      "You don't have any uploaded PDFs yet.";

    return;
  }

  emptyMessage.textContent =
    "Your research resources";

  resourceList.innerHTML = '';

  resources.forEach(function (item) {

    const resource =
      document.createElement('div');

    resource.className =
      'selected-file';

    resource.innerHTML =
      '📄 ' +
      escapeHTML(item.fileName) +
      '<br>' +
      '<a href="/api/view-pdf?pathname=' +
      encodeURIComponent(item.pathname) +
      '" target="_blank">' +
      'PDF Aç' +
      '</a>';

    resourceList.appendChild(resource);
  });
}