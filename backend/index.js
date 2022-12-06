const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const db = require("./models");
const EVENT_TYPES = require("./enums/event.enum");

const deliveries = require("./controllers/delivery.controller.js");
const STATUS_ENUM = require("./enums/status.enum");

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const Delivery = db.deliveries;
const Package = db.packages;

require("./routes/package.route")(app);
require("./routes/delivery.route")(app);

async function updateDelivery(data) {
  const item = JSON.parse(data);
  const currentTime = new Date().valueOf();
  if (item.status === STATUS_ENUM.PICKED_UP) {
    item.pickup_time = currentTime;
  } else if (item.status === STATUS_ENUM.IN_TRANSIT) {
    item.start_time = currentTime;
  } else {
    item.end_time = currentTime;
  }
  const result = await Delivery.findByIdAndUpdate(item.delivery_id, item, {
    useFindAndModify: true,
  });
  if (result) {
    const packageResult = await Package.findById(result.package_id);
    const res = { delivery: item, package: packageResult };
    socketIO.emit(EVENT_TYPES.DELIVERY_UPDATED, JSON.stringify(res));
  }
}

socketIO.on("connection", (socket) => {
  socket.on(EVENT_TYPES.STATUS_CHANGED, async (data) => {
    updateDelivery(data);
  });

  socket.on(EVENT_TYPES.LOCATION_CHANGED, async (data) => {
    console.log(data);
    // updateDelivery(data);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

const PORT = process.env.PORT || 4053;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
