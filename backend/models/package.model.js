module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      package_id: String,
      active_delivery_id: String,
      description: String,
      weight: Number,
      width: Number,
      height: Number,
      depth: Number,
      from_name: String,
      from_address: String,
      from_location: Object,
      to_name: String,
      to_address: String,
      to_location: Object,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.package_id = _id;
    return object;
  });

  const Package = mongoose.model("packages", schema);
  return Package;
};
