const bcrypt = require('bcryptjs');

async function check() {
  const hash = "$2b$12$s2HjN1g3O4FZCq3dopuT/OxbtdLItGNDtGW.tEkOBFUXFOlykae.C";
  const valid = await bcrypt.compare('Zenith@2580', hash);
  console.log("Current hash valid:", valid);
  
  const newHash = await bcrypt.hash('Zenith@2580', 12);
  console.log("New hash:", newHash);
}
check();
