const axios = require('axios');
const fs = require('fs');

// Base URL of the API endpoint
const baseURL = 'https://cms.proxify.io/api/members?page=';

async function fetchPage(page) {
  try {
    const response = await axios.get(`${baseURL}${page}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching data from page ${page}:`, error);
    return [];
  }
}


async function fetchAllData() {
  const allData = [];

  for (let page = 1; page <= 3; page++) {
    const pageData = await fetchPage(page);
    allData.push(...pageData);
  }

  const outputPath = './data.json';


  fs.writeFile(outputPath, JSON.stringify({ data: allData }, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('All data saved to', outputPath);
    }
  });
}

fetchAllData();
