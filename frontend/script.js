// =====================
// DOM Elements
// =====================
const productCard = document.getElementById("productCard");
const productForm = document.getElementById("productForm");

const addProductButton = document.getElementById("addProduct");
const submitButton = document.getElementById("addProductBtn");

const successPopup = document.getElementById("successPopup");

const inputs = {
    name: document.getElementById("productName"),
    price: document.getElementById("productPrice"),
    description: document.getElementById("productDescription"),
    image: document.getElementById("productImage")
};

const priceError = document.getElementById("priceError");

const API_URL = "http://localhost:3000/api/product";
const IMAGE_URL = "http://localhost:3000/uploads";


// =====================
// Popup
// =====================
function showSuccessPopup() {
    successPopup.style.display = "block";

    clearTimeout(showSuccessPopup.timeout);

    showSuccessPopup.timeout = setTimeout(() => {
        successPopup.style.display = "none";
    }, 4000);
}


// =====================
// Modal
// =====================
function openModal() {
    productForm.style.display = "flex";
    document.body.classList.add("modal-open");
}

function closeModal() {
    productForm.style.display = "none";
    document.body.classList.remove("modal-open");
}

addProductButton.addEventListener("click", openModal);

productForm.addEventListener("click", (e) => {
    if (e.target === productForm) {
        closeModal();
    }
});


// =====================
// Validation
// =====================
function clearPriceError() {
    priceError.textContent = "";
    priceError.style.display = "none";
}

function validatePrice() {
    const value = Number(inputs.price.value);

    if (
        inputs.price.value === "" ||
        Number.isNaN(value) ||
        value < 0
    ) {
        priceError.textContent = "Price cannot be empty or negative.";
        priceError.style.display = "block";
        return false;
    }

    clearPriceError();
    return true;
}

inputs.price.addEventListener("input", clearPriceError);


// =====================
// API
// =====================
async function createProduct(formData) {
    const response = await fetch(API_URL, {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
    }

    return response.json();
}

async function getProducts() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}


// =====================
// Form Submission
// =====================
async function submitProductForm(e) {
    e.preventDefault();

    if (!validatePrice()) return;

    const formData = new FormData();

    formData.append("name", inputs.name.value.trim());
    formData.append("price", inputs.price.value);
    formData.append("description", inputs.description.value.trim());

    if (inputs.image.files.length > 0) {
        formData.append("image", inputs.image.files[0]);
    }

    try {
        await createProduct(formData);

        productForm.reset();
        clearPriceError();

        closeModal();
        showSuccessPopup();

        fetchProducts();
    } catch (error) {
        console.error(error);
    }
}

submitButton.addEventListener("click", submitProductForm);
productForm.addEventListener("submit", submitProductForm);


// =====================
// Product Card
// =====================
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <img
            src="${IMAGE_URL}/${product.image}"
            class="product-image"
            alt="${product.name}"
        >

        <h2>${product.name}</h2>

        <p class="price-text">
            <strong>Price:</strong> $${product.price}
        </p>

        <p class="card-description">
            ${product.description}
        </p>

        <button class="btn">
            Add to Cart
        </button>
    `;

    return card;
}


// =====================
// Render Products
// =====================
async function fetchProducts() {
    try {
        const products = await getProducts();

        productCard.innerHTML = "";

        products.forEach(product => {
            productCard.appendChild(createProductCard(product));
        });

    } catch (error) {
        console.error(error);
    }
}


// =====================
// Init
// =====================
fetchProducts();