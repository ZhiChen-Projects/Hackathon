const csv = require('csv-parser');
import  { Product } from './data.js';

export function readCSV(filePath) { 
    const products = []; 
    fetch(filePath)
        .then((response) => response.text()) // Convert CSV file to text
        .then((data) => {
            // Parse CSV data using PapaParse
            Papa.parse(data, {
                complete: (result) => {
                    result.data.forEach((row) => {
                        const { name, image, price, ratings, saltyScalpRating } = row;
                        const ratingsArray = ratings.split(',').map(Number);
                        const product = new Product(name, image, price, ratingsArray, saltyScalpRating);
                        products.push(product);
                    });
                    console.log('CSV file successfully processed');
                    console.log(products);
                },
                error: (err) => {
                    console.error('Error parsing CSV file:', err);
                },
            });
        })
        .catch((err) => {
            console.error('Error reading the CSV file:', err);
        });

    return products;
    
    // fs.createReadStream(filePath) // Open the CSV file
    // .pipe(csv()) // Parse the CSV file
    // .on('data', (row) => {
    //     const { name, image, price, ratings, saltyScalpRating } = row;
    //     const ratingsArray = ratings.split(',').map(Number);
    //     const product = new Product(name, image, price, ratingsArray, saltyScalpRating);
    //     products.push(product);
    // })
    // .on('end', () => {
    //   console.log('CSV file successfully processed');
    //   console.log(products);  
    // })
    // .on('error', (err) => {
    //   console.error('Error reading the CSV file:', err);
    // });
    // return products; 
}