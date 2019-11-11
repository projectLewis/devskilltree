const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log(`we're connected!`);
});

const SkillCategorySchema = new mongoose.Schema({
    // level in tree
    level: Number,
    name: {
        type: String,
        unique: true
    },
    // Youtube Resource
    video: String,
    // articles
    resource_link1: String,
    resource_link2: String,
    resource_link3: String,
    // Javascript, CSS, HTML, DB, Node
    foundation: String
});

const SkillCategory = mongoose.model("SkillCategory", SkillCategorySchema);

