const mongoose = require("mongoose");
const skills = require("./skills").skills;

const host = "localhost"
// const host = "mongo"
mongoose.connect(`mongodb://${ host }:27017/skill_categories`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("we're connected!");
});

const SkillCategorySchema = new mongoose.Schema({
    // level in tree
    level: Number,
    name: {
        type: String,
        unique: true
    },
    name_uppercase: {
        type: String,
        unique: true
    },
    // Youtube Resource
    video: String,
    video_embed: String,
    // articles
    resource_link1: String,
    resource_link2: String,
    resource_link3: String,
    // Javascript, CSS, HTML, Node, etc
    foundation: [String],
    // frontend, backend, language, etc
    track: [String]
});
SkillCategorySchema.index(
    {
        name: 1
    }
)

const SkillCategory = mongoose.model("SkillCategory", SkillCategorySchema);

const findSkillByName = async name => {
    try {
        const skill = await SkillCategory.findOne(name)
        return skill;
    } catch (error) {
        return `error of, ${ error }`
    }
};

const findSkillsByLevel = async level => {
    try {
        const skills = await SkillCategory.find(level)
        return skills;
    } catch (error) {
        return `error of, ${ error }`
    }
};

// TODO
const findSkillsByTrack = async track => {
    try {
        const skills = await SkillCategory.find({ track: { $all: [track] } })
        return skills;
    } catch (error) {
        return `error of, ${ error }`
    }
};

// TODO
const findSkillsByFoundation = async foundation => {
    try {
        const skills = await SkillCategory.find({ prereqs: { $all: [foundation] } })
        return skills;
    } catch (error) {
        return `error of, ${ error }`
    }
};


// SEED DB
const seedSkillsDB = async skill => {
    try {
        const data = await SkillCategory.insertMany(skill)
        console.log("...Saved products to database...");
        return data;
    } catch (error) {
        console.log("...product saving err... ");
        return error;
    }
}

let initialized = false;
const initializeProducts = async () => {
    await seedSkillsDB(skills);
    initialized = true;
    return initialized;
};

if (!initialized) {
    initializeProducts();
}

module.exports = {
    findSkillByName,
    findSkillsByLevel,
    findSkillsByTrack,
    findSkillsByFoundation
}
