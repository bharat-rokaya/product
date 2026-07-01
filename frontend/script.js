const productCard = document.getElementById("productCard");

const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/product");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const products = await response.json();

    // Clear previous cards (optional)
    productCard.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h2>${product.name}</h2>
        <p>Price: $${product.price}</p>
        <p>${product.description}</p>
        <button class="btn">Add to Cart</button>
      `;

      productCard.appendChild(card);
    });

  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

fetchProducts();