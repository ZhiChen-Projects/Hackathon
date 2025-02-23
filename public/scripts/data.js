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
    
    
}