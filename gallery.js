let items = JSON.parse(localStorage.getItem('images')) || [];

// Function to render the gallery
function renderGallery() {
  let gallery = '';
  items.forEach(image => {
    gallery += `
      <div class="image-card" data-id="${image.id}">
        <img src="${image.src}" alt="Image">
        <button class="delete-button" onclick="deleteImage(${image.id})">X</button>
      </div>
    `;
  });
  document.querySelector('.js-image-grid').innerHTML = gallery;
}

// Delete image
function deleteImage(id) {
  items = items.filter(img => img.id !== id);
  localStorage.setItem('images', JSON.stringify(items));
  renderGallery();
}

// Handle file upload
document.getElementById('fileInput').addEventListener('change', function() {
  const file = this.files[0];
 if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      items.push({ src: e.target.result, id: Date.now() }); // Base64 string
      localStorage.setItem('images', JSON.stringify(items));
      renderGallery();
    };
    reader.readAsDataURL(file); // ✅ Converts file to Base64
  }

  const approxSizeKB = (JSON.stringify(items).length * 2) / 1024;
if (approxSizeKB >= 5000) {
  alert("Storage full. Please delete some images.");
  return;
}

});

renderGallery();

