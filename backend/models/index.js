const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.packages = require("./package.model.js")(mongoose);
db.deliveries = require("./delivery.model.js")(mongoose);

module.exports = db;