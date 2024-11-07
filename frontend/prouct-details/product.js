// Get the product id from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');


async function loadProductDetails() {
  try {
    
    if (!productId) {
      throw new Error('Product ID is missing in the URL');
    }

    // Make the API request to get the product details
    const response = await fetch(`http://localhost:3000/api/store/product/${productId}`);

   
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const product = await response.json();

    
    const productDetailContainer = document.getElementById("product-detail-container");

    // Check if the product data exists
    if (!product || !product.name || !product.price) {
      throw new Error('Incomplete product data received.');
    }

    // Insert the product details into the container
    productDetailContainer.innerHTML = `
      <div class="product-detail">

      <div class="product">
        <div class="image">
          <img src="${product.image}" alt="${product.name} image" loading="lazy">
        </div>
        <div class="small-img">
            <div>
           <img src="${product.image}" alt="${product.name} image" loading="lazy">
         </div>
         <div>
           <img src="${product.image}" alt="${product.name} image" loading="lazy">

         </div>
         <div>
           <img src="${product.image}" alt="${product.name} image" loading="lazy">

         </div>
         <div>
           <img src="${product.image}" alt="${product.name} image" loading="lazy">

         </div>
        </div>
        
      </div>
        
        <div class=description>
            <p>${product.description}</p>
             <h2>${product.name}</h2>
             <p><strong>Price:</strong> $${product.price.toFixed(2)}
             </p>
            <div class="btn">
              <button class="cart">Add to Cart </button>

              <button class="buy">Buy Now </button>
            <div>

        </div>
      
      </div>
    `;
  } catch (error) {
    // Log the error message for debugging
    console.error("Error loading product details:", error);

    
    document.getElementById("product-detail-container").innerHTML = `
      <p>Failed to load product details. Please try again later. (${error.message})</p>
    `;
  }
}

// Load product details when the page is loaded
document.addEventListener("DOMContentLoaded", loadProductDetails);
