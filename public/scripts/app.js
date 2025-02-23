import { readCSV } from "./csvreader.js";
import { Product } from "./data.js";

// Function to generate product cards and add them to the HTML
async function displayProducts() {
    const products = await readCSV("data/products.csv"); // Adjust the path if needed

    const section = document.getElementById("section2");

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Create HTML elements
        const title = document.createElement("h3");
        title.innerText = product.name;

        const image = document.createElement("img");
        image.src = `images/${product.image}`;
        image.alt = `${product.name} Image`;

        const price = document.createElement("p");
        price.classList.add("price");
        price.innerText = `Price: $${product.price.toFixed(2)}`;

        const stars = document.createElement("p");
        stars.classList.add("stars");
        stars.innerText = "💎".repeat(Math.round(product.averageRating()));

        const rating = document.createElement("p");
        rating.classList.add("salty_scalp_rating");
        rating.innerText = `Salty Scalp Rating: ${product.averageRating()}/10`;

        // Append everything to the card
        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(price);
        card.appendChild(stars);
        card.appendChild(rating);

        // Append the card to the section
        section.appendChild(card);
    });
}

// Run when the page loads
document.addEventListener("DOMContentLoaded", displayProducts);

function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

