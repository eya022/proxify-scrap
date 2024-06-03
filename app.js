const axios = require('axios');
const fs = require('fs');

// Base URL of the API endpoint
const baseURL = 'https://cms.proxify.io/api/all-pages/url/hire-net-developers';

// Function to fetch data from the URL
async function fetchData() {
  try {
    // Fetch data from the URL
    const response = await axios.get(baseURL);
    const data = response.data.data;

    // Transform the data to the desired format
    const transformedData = data.map(item => ({
      id: item.id,
      title: item.title,
      url: item.url,
      // Add more fields here as needed
    }));

    // Define the output file path
    const outputPath = './allPages.json';

    // Save the data to a JSON file
    fs.writeFile(outputPath, JSON.stringify(transformedData, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Data saved to', outputPath);
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Execute the function
fetchData();
