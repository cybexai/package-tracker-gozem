const db = require("../models");
const { ObjectId } = require("mongodb");
const Delivery = db.deliveries;
const Package = db.packages;

// Create and Save a new Delivery
exports.create = async (req, res) => {
  try {
    // Validate request
    if (
      !req.body.package_id ||
      !req.body.location ||
      !req.body.status
    ) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const myId = new ObjectId();

    // Create a Delivery
    const delivery = new Delivery({
      package_id: req.body.package_id,
      location: req.body.location,
      status: req.body.status,
      delivery_id: myId,
      _id: myId,
    });

    // Save Delivery in the database
    delivery
      .save(delivery)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Delivery.",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occured.",
    });
  }
};

// Retrieve all Deliveries from the database.
exports.findAll = async (req, res) => {
  try {
    const result = await Delivery.find();

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occured.",
    });
  }
};

// Find a single Delivery with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Delivery.findById(id);
    if (!result)
      res.status(404).send({ message: "Not found Delivery with id " + id });
    else {
      const packageResult = await Package.findById(result.package_id);
      const data = { delivery: result, package: packageResult };
      res.send(data);
    }
  } catch (error) {
      res.send();
    //   console.log(error);
  }
};

// Update a Delivery by the id in the request
exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }

    const id = req.params.id;

    const result = await Delivery.findByIdAndUpdate(id, req.body, {
      useFindAndModify: true,
    });
    if (!result) {
      res.status(404).send({
        message: `Cannot update Delivery with id=${id}. Maybe Delivery was not found!`,
      });
    } else {
      const packageResult = await Package.findById(result.package_id);
      const data = { delivery: req.body, package: packageResult };
      res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occured.",
    });
  }
};

// Delete a Delivery with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Delivery.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    if (!result) {
      res.status(404).send({
        message: `Cannot delete Delivery with id=${id}. Maybe Delivery was not found!`,
      });
    } else {
      res.send({
        message: "Delivery was deleted successfully!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occured.",
    });
  }
};

// Delete all Deliverys from the database.
exports.deleteAll = async (req, res) => {
  try {
    const result = await Delivery.deleteMany({});
    res.send({
      message: `${result.deletedCount} Deliverys were deleted successfully!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occured.",
    });
  }
};
