module.exports = {
  async up( db, client ) {
    await db.createCollection( 'SiteSettings', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: [ 'siteTitle', 'siteDescription' ],
          properties: {
            siteTitle: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            siteDescription: {
              bsonType: 'string',
              description: 'must be a string and is required'
            }
          }
        }
      }
    } );
  },

  async down( db, client ) {
    await db.collection( 'SiteSettings' ).drop();
  }
};
