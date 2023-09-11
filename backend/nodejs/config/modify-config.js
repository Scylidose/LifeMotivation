const fs = require('fs');

const newDatabasePath = process.env.GITHUB_ACTIONS ? '../../database/mock.db' : '../../database/abitmotivation.db';

const configFile = 'config/config.js';

fs.readFile(configFile, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading ${configFile}:`, err);
    process.exit(1);
  }

  const updatedData = data.replace(/databasePath:.*?,/, `databasePath: '${newDatabasePath}',`);
  
  fs.writeFile(configFile, updatedData, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing ${configFile}:`, err);
      process.exit(1);
    }
    
    console.log(`Updated ${configFile} with new databasePath: '${newDatabasePath}'`);
  });
});
