module.exports = app => {
    const deliveries = require("../controllers/delivery.controller.js");
  
    const router = require("express").Router();
  
    // Create a new Delivery
    router.post("/", deliveries.create);
  
    // Retrieve all Deliverys
    router.get("/", deliveries.findAll);
  
    // Retrieve a single Delivery with id
    router.get("/:id", deliveries.findOne);
  
    // Update a Delivery with id
    router.put("/:id", deliveries.update);
  
    // Delete a Delivery with id
    router.delete("/:id", deliveries.delete);
  
    // Create a new Delivery
    router.delete("/", deliveries.deleteAll);
  
    app.use("/api/delivery", router);
  };