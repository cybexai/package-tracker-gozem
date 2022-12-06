module.exports = (mongoose) => {

  const schema = mongoose.Schema(
    {
      pickup_time: String,
      delivery_id: String,
      package_id: String,
      start_time: Number,
      end_time: Number,
      location: Object,
      status: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.delivery_id = _id;
    return object;
  });

  const Package = mongoose.model("delivery", schema);
  return Package;
};
