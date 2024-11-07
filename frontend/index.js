// Fetch products from the API
async function loadProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/store/products");
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();
    const container = document.getElementById("products-container");
    container.innerHTML = ""; // Clear container before appending products

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";

      // Create a link to the product detail page in the product-details folder, passing the product id
      const productLink = document.createElement('a');
      productLink.href = `./prouct-details/product-detail.html?id=${product._id}`; // Link to product-details folder

      productDiv.innerHTML = `
        <div class="image">
        <p class="red"> &#10084;</p>

          <img src="${product.image}" alt="${product.name} image" loading="lazy">
        </div>
        <div class="rating"><p>&#9733;&#9733;&#9733;&#9734;&#9734;</p></div>
        <h2>${product.name}</h2>
        <p>$${product.price.toFixed(2)}</p>
      `;

      // Append the productDiv to the link element
      productLink.appendChild(productDiv);

      container.appendChild(productLink);
    });
  } catch (error) {
    console.error("Error loading products:", error);
    document.getElementById("products-container").innerHTML = "<p>Failed to load products. Please try again later.</p>";
  }
}

// Load products when the page is loaded
document.addEventListener("DOMContentLoaded", loadProducts);
