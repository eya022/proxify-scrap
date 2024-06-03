const axios = require('axios');
const fs = require('fs');

// Base URL of the API endpoint
const baseURL = 'https://cms.proxify.io/api/seo-pages?page=';

// Function to fetch data from a specific page
async function fetchPage(page) {
  try {
    const response = await axios.get(`${baseURL}${page}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching data from page ${page}:`, error);
    return [];
  }
}

// Function to fetch all pages and save data
async function fetchAllData() {
  const allData = [];

  for (let page = 1; page <= 34; page++) {
    const pageData = await fetchPage(page);
    allData.push(...pageData);
  }

  // Extract the 'translatedUrls' information
  const translatedUrlsData = allData.map(item => {
    const { fallback, urls } = item.translatedUrls;
    return {
      fallback,
      urls
    };
  });

  // Define the output file path
  const outputPath = './seoPages.json';

  // Save aggregated data to a JSON file
  fs.writeFile(outputPath, JSON.stringify(translatedUrlsData, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('All data saved to', outputPath);
    }
  });
}

// Execute the function
fetchAllData();
