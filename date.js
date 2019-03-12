const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

(async function() {
  // Connection URL
  const url = 'mongodb://localhost:27017/test';
  // Database Name
  const dbName = 'myproject';
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    // Get the collection
    const col = db.collection('dates');


    let res = await db.collection('dates').insertOne({date: new Date()});
    assert.equal(1, res.insertedCount);

    // Insert multiple documents
    const r = await col.insert({date:2});
    assert.equal(&, r.insertedCount);

    // Get the cursor
    const cursor = col.find();

    // Iterate over the cursor
    while(await cursor.hasNext()) {
      const doc = await cursor.next();
      console.dir(doc);
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
})();
