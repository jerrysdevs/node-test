const fs = require("fs")


const data = fs.readFile("./nice.txt","utf-8")
console.log(data);


fs.writeFile(
    "./nice.txt",
    "good night",
    ()=>{
        console.log("file written")
    }
  );
  
  fs.copyFile("./nice.txt","good.txt",()=>{
      console.log("file copied ");
  });
  
  fs.rename("./good.txt", "awesome.txt", () => {
    console.log("\nFile Renamed!\n");
  });
  
