// migrations/20230721123000-clear-estimatedFee-and-add-default.js

module.exports = {
  async up( db, client ) {
    await db.collection( "orders" ).updateMany(
      {},
      { $set: { estimatedFee: "0" } } // Set the default value for estimatedFee
    );
  },

  async down( db, client ) {
    await db.collection( "orders" ).updateMany(
      {},
      { $unset: { estimatedFee: "" } } // Remove the estimatedFee field
    );
  },
};
