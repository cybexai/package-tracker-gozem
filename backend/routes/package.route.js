module.exports = app => {
    const packages = require("../controllers/package.controller.js");
  
    const router = require("express").Router();
  
    // Create a new Package
    router.post("/", packages.create);
  
    // Retrieve all Packages
    router.get("/", packages.findAll);
  
    // Retrieve a single Package with id
    router.get("/:id", packages.findOne);
  
    // Update a Package with id
    router.put("/:id", packages.update);
  
    // Delete a Package with id
    router.delete("/:id", packages.delete);
  
    // Create a new Package
    router.delete("/", packages.deleteAll);
  
    app.use("/api/package", router);
  };