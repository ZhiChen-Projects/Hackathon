class Product { 
    constructor(name, brand, category, price, hairType, image = null) { 
        this.name = name; 
        this.brand = brand; 
        this.category = category;
        this.price = price; 
        this.hairType = hairType; 
        this.image = image; 
        this.reviewText = [];
        this.rating = [];
        this.avgRating = 0; 
    }

    getAverageRating() { 
        const sum = this.rating.reduce((acc, rating) => acc + rating, 0)
        return (sum / this.ratings.length).toFixed(1);
    }

}

export { Product }; 