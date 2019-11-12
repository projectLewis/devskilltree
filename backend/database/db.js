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
  resources: [
    [{
      type: String,
      unique: true
    }, {
      type: String,
      unique: true
    }]
  ],
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

const findUnlockedSkillsByLevel = async (level, unlockedFoundations) => {
  try {
    const skills = await SkillCategory.find({
      level: { $lte: level },
      foundation: { $in: unlockedFoundations }
    })
    const filteredSkills = [];
    skills.forEach(skill => {
      const doNotInclude = skill.foundation.some((foundation) => {
        if (!unlockedFoundations.includes(foundation)) {
          return true;
        }
        return false;
      })
      if (doNotInclude) {
        return undefined;
      } else {
        const formattedSkill = {};
        formattedSkill["name"] = skill.name;
        formattedSkill["level"] = skill.level;
        formattedSkill["_id"] = skill._id;
        filteredSkills.push(formattedSkill)
      }
    })
    return filteredSkills;
  } catch (error) {
    return `error of, ${ error }`
  }
};

const findSkillsByTrack = async track => {
  try {
    const skills = await SkillCategory.find({ track: { $all: [track] } })
    return skills;
  } catch (error) {
    return `error of, ${ error }`
  }
};

const findSkillsByFoundation = async foundation => {
  try {
    const skills = await SkillCategory.find({ foundation: { $all: [foundation] } })
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
  findUnlockedSkillsByLevel,
  findSkillsByTrack,
  findSkillsByFoundation
}
