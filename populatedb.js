require("dotenv").config();
const mongoose = require("mongoose");
const userModel = require("./models/users");
const storyModel = require("./models/stories");

const usersData = require("./users.json");

const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected.");

        
        await userModel.deleteMany();
        console.log("users empty");
        await userModel.create(usersData);
        console.log("users inserted");

        const users = await userModel.find({});
        const members = users.filter(user => user.isMember===true);

        await storyModel.deleteMany();
        console.log("stories empty");
        await createAllStories(members);
        console.log("stories added");

        console.log("success");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
main();


async function createStory(title, content, author){
    await storyModel.create({
        title: title,
        content: content,
        author: author
    });
}


async function createAllStories(members){
    await Promise.all([
        createStory(
            "Quote",
            "Fake it till you make it",
            members[0]
        ),
        createStory(
            "Just something",
            "la la la laaaa... la la laa",
            members[1]
        ),
        createStory(
            "Title",
            "Duh.",
            members[2]
        )

    ]);
};