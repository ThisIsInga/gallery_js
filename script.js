const gallery = document.getElementById('gallery');
const modal = document.querySelector('.modal');
const button = document.getElementById('button');
const modal_button = document.getElementById('modal_button');
const image_url = document.getElementById('image_url');
const button_add = document.getElementById('button_add');

const urlData = JSON.parse(localStorage.getItem('urlData')) || [];

function createImg(src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Изображение из js';
    img.loading = 'lazy';
    img.addEventListener('click', () => openModal(src)); 
    return img;
}

function openModal(src) {
    modal.innerHTML = `
        <img src="${src}" alt="Выбранное изображение">
        <button id="delete">Удалить</button>
    `;
    modal.style.display = 'block';
    const deleteImg = document.getElementById('delete');
    deleteImg.addEventListener('click', () => {
        deleteImage(src);
        modal.style.display = 'none';
    });
}

function saveToLocalStorage() {
    localStorage.setItem('urlData', JSON.stringify(urlData));
}

function deleteImage(src) {
    const index = urlData.indexOf(src);
    if (index > -1) {
        urlData.splice(index, 1);
        saveToLocalStorage();
        refreshGallery();
    }
}

function refreshGallery() {
    gallery.innerHTML = ''; 
    addImg(); 
}

modal.addEventListener('click', () => {
    modal.style.display = 'none'; 
});

button.addEventListener('click', () => {
    modal_button.style.display = 'flex';
});

button_add.addEventListener('click', () => {
    const url = image_url.value.trim(); // Remove whitespace
    if(url){
        // Add new image url at the start of array for left placement
        urlData.unshift(url);
        saveToLocalStorage();
        refreshGallery();
        image_url.value = '';
        modal_button.style.display = 'none'; 
    } else{
        alert('Пожалуйста, введите корректную ссылку!');
    }
});

function addImg() {
    // Add images in order from left to right by appending
    urlData.forEach(url => {
        const img = createImg(url);
        gallery.appendChild(img);
    });
}

addImg();
