const fs = require('fs');
const csv = require('csv-parser');
const { Product } = require('./data');

function readCSV(filePath) { 
    const products = []; 
    fs.createReadStream(filePath) // Open the CSV file
    .pipe(csv()) // Parse the CSV file
    .on('data', (row) => {
      const { name, image, price, ratings, saltyScalpRating } = row;
      const ratingsArray = ratings.split(',').map(Number);
      const product = new Product(name, image, price, ratingsArray, saltyScalpRating);
      products.push(product);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      console.log(products);  
    })
    .on('error', (err) => {
      console.error('Error reading the CSV file:', err);
    });
  return products; 
}

const products = readCSV('./data/products.csv'); 
