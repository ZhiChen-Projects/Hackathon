class Product { 
    constructor(name, brand, category, hairType, image = null) { 
        this.name = name; 
        this.brand = brand; 
        this.category = category;
        this.hairType = hairType; 
        this.image = image; 
        this.reviewText = [];
        this.rating = [];
    }
    
    static loadProducts() {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        return products.map(p => {
            const product = new Product(p.name, p.brand, p.category, p.hairType, p.image);
            product.reviews = p.reviews || []; // Load existing reviews
            product.ratings = p.ratings || []; // Load ratings
            return product;
        });
    }

    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    static addProduct(name, brand, category, hairType, imageFile) {
        const products = Product.loadProducts();
        const reader = new FileReader();

        reader.onload = function (event) {
            const newProduct = new Product(name, brand, category, hairType, event.target.result);
            products.push(newProduct);
            Product.saveProducts(products);
            Product.displayProducts();
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            const newProduct = new Product(name, brand, category, hairType, null);
            products.push(newProduct);
            Product.saveProducts(products);
            Product.displayProducts();
        }
    }

    static addReview(productName, rating, reviewText) {
        const products = Product.loadProducts();
        const product = products.find(p => p.name === productName);

        if (!product) {
            alert("Product not found!");
            return;
        }

        // Add rating to the product's ratings array
        product.ratings.push(rating);

        // Add review to the product's reviews array
        product.reviews.push({ rating, reviewText });

        Product.saveProducts(products);
        Product.displayProductReviews(productName);
    }

    // Calculate average rating
    static getAverageRating(product) {
        if (product.ratings.length === 0) return 0;
        const total = product.ratings.reduce((sum, rating) => sum + rating, 0);
        return (total / product.ratings.length).toFixed(1); // Return average rounded to 1 decimal place
    }

    static displayProducts() {
        const productContainer = document.getElementById("products");
        productContainer.innerHTML = "";

        Product.loadProducts().forEach((p, index) => {
            const averageRating = Product.getAverageRating(p);

            productContainer.innerHTML += `
                <div class="product">
                    <strong>${p.name} by ${p.brand} (${p.category})</strong>
                    <p><b>Hair Type:</b> ${p.hairType}</p>
                    <p><b>Ingredients:</b> ${p.ingredients}</p>
                    <p><b>Average Rating:</b> ${averageRating} / 5</p>
                    ${p.image ? `<img src="${p.image}" alt="Product Image">` : ""}
                    <br>
                    <a href="product.html?name=${encodeURIComponent(p.name)}">View Reviews</a>
                </div>
            `;
        });
    }

    static displayProductReviews(productName) {
        const product = Product.loadProducts().find(p => p.name === productName);
        const reviewContainer = document.getElementById("reviews");
        document.getElementById("productTitle").textContent = productName;

        if (!product) {
            reviewContainer.innerHTML = "<p>Product not found.</p>";
            return;
        }

        const averageRating = Product.getAverageRating(product);

        reviewContainer.innerHTML = `
            <h3>Average Rating: ${averageRating} / 5</h3>
            ${product.reviews.length
                ? product.reviews.map(r => `<p><b>${r.rating}/5</b>: ${r.reviewText}</p>`).join("")
                : "<p>No reviews yet.</p>"}
        `;
    }
}