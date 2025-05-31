const fs = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');
const util = require('util');

// Convert rimraf to promise-based
const rmrf = util.promisify(rimraf);

async function copyBuild() {
  try {
    const webDistPath = path.join(__dirname, 'web-dist');
    const distTempPath = path.join(__dirname, 'dist-temp');

    // Remove directories if they exist
    if (fs.existsSync(webDistPath)) {
      await rmrf(webDistPath);
    }

    // Copy from dist-temp to web-dist
    await fs.copy(distTempPath, webDistPath);
    
    // Clean up dist-temp
    if (fs.existsSync(distTempPath)) {
      await rmrf(distTempPath);
    }

    console.log('Build files copied successfully to web-dist!');
  } catch (err) {
    console.error('Error copying build files:', err);
    process.exit(1);
  }
}

copyBuild();