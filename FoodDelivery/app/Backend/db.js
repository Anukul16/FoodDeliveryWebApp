const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://FoodDelivery:Food16@cluster0.egxfnyo.mongodb.net/FoodDelivery?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected Successfully');

        const food_items = await mongoose.connection.db.collection("food_items").find({}).toArray();

        const foodCategory = await mongoose.connection.db.collection("food_category").find({}).toArray();
        // console.log("First",foodCategory);
        global.food_items = food_items;
        global.foodCategory = foodCategory;

    } catch (err) {
        console.error('---', err);
    }
};


mongoose.set('strictQuery', false);

module.exports = mongoDB;
