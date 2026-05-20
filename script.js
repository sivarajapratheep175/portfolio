const name = prompt("Enter your name (to see who is viewing my portfolio):");

if (name) {
  console.log(`Visitor Name: ${name}`);
} else {
  console.log("Visitor did not enter a name.");
}
