
async function getAllProducts() {
    try {
         const response = await fetch("http://localhost:3000/api/store/products"); 
        const products = await response.json();
        console.log(products);

        let 
            
    } catch (error) {

        console.error(error.message)
        
    }
    

}
getAllProducts();