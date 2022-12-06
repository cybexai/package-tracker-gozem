const db = require("../models");
const { ObjectId } = require("mongodb");
const Package = db.packages;
const Delivery = db.deliveries;

// Create and Save a new Package
exports.create = async (req, res) => {
  try {
    // Validate request
    if (
      !req.body.description ||
      !req.body.from_name ||
      !req.body.from_address ||
      !req.body.from_address ||
      !req.body.to_name ||
      !req.body.to_address
    ) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const myId = new ObjectId();

    // Create a Package
    const package = new Package({
      description: req.body.description,
      weight: req.body.weight,
      width: req.body.width,
      height: req.body.height,
      depth: req.body.depth,
      from_name: req.body.from_name,
      from_address: req.body.from_address,
      from_location: req.body.from_location,
      to_name: req.body.to_name,
      to_address: req.body.to_address,
      to_location: req.body.to_location,
      package_id: myId,
      _id: myId,
    });

    // Save Package in the database

    const result = await package.save(package);

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occured.",
    });
  }
};

// Retrieve all Packages from the database.
exports.findAll = async (req, res) => {
  try {
    const result = await Package.find();
    res.send(result);
  } catch (error) {
    // console.log(error);
    res.send();
  }
};

// Find a single Package with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Package.findById(id);
    if (!result) {
      res.status(404).send({ message: "Not found Package with id " + id });
    } else {
      const deliveryResult = await Delivery.find({
        package_id: result.package_id,
      });

      const data = { package: result };
      if (deliveryResult.length) {
        data.delivery = deliveryResult[0];
      }
      res.send(data);
    }
  } catch (error) {
    // console.log(error);
    res.send();
  }
};

// Update a Package by the id in the request
exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }

    const id = req.params.id;

    const result = await Package.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    if (!result) {
      res.status(404).send({
        message: `Cannot update Package with id=${id}. Maybe Package was not found!`,
      });
    } else res.send({ message: "Package was updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occured.",
    });
  }
};

// Delete a Package with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Package.findByIdAndRemove(id, {
      useFindAndModify: false,
    });

    res.send({
      message: "Package was deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occured.",
    });
  }
};

// Delete all Packages from the database.
exports.deleteAll = async (req, res) => {
  try {
    const result = await Package.deleteMany({});

    res.send({
      message: `${result.deletedCount} Packages were deleted successfully!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occured.",
    });
  }
};
