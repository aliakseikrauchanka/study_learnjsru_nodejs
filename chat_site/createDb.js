let mongoose = require('libs/mongoose');
// mongoose.set('debug', true);

mongoose.connection.on('open', async function () {
    console.log('Connection is opened');
    const db = mongoose.connection.db;
    await db.dropDatabase();
    console.log('Db is dropped');

    var User = require('models/user').User;

    /* Following code was usefull in the past.
    * For some reason current .dropDatabase() method does not */
    await Object.keys(mongoose.models).map(key => {
        return mongoose.models[key].ensureIndexes();
    });

    var user1 = new mongoose.models.User({ username: 'Vasja', password: '1' });
    var user2 = new mongoose.models.User({ username: 'Petja', password: '2' });
    var user3 = new mongoose.models.User({ username: 'Sanchek', password: '3' });

    var results;
    try {
        results = await Promise.all([
            user1.save(),
            user2.save(),
            user3.save(),
        ]);
        console.log(results);
    } catch (e) {
        console.log(e);
    }

    await mongoose.disconnect();
});

