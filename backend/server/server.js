// external modules
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/../../build/")));

// internal
const db = require("../database/db")

const PORT = 3023;

app.get("/api/skills/skill/:name_uppercase", async (req, res) => {
  try {
    const name = req.params;
    name.name_uppercase = name.name_uppercase.toUpperCase();
    const result = await db.findSkillByName(name);
    if (!result.name) {
      throw new Error("not found");
    }
    res.send(result)
  } catch (error) {
    res.status(400).send("couldnt find that record");
  }
})

app.get("/api/skills/level/:level", async (req, res) => {
  if (req.query.hasOwnProperty("unlocked")) {
    try {
      const unlockedSkills = req.query.unlocked.split(",");
      const level = req.params.level;
      const result = await db.findUnlockedSkillsByLevel(level, unlockedSkills);
      if (result.length === 0) {
        throw new Error("not found");
      }
      res.send(result)
    } catch (error) {
      res.status(400).send("couldn't find that record");
    }
  } else {
    try {
      const level = req.params;
      level.level = Number(level.level);
      const result = await db.findSkillsByLevel(level);
      if (result.length === 0) {
        throw new Error("not found");
      }
      res.send(result)
    } catch (error) {
      res.status(400).send("couldnt find that record");
    }
  }
})

app.get("/api/skills/track/:name", async (req, res) => {
  try {
    const track = req.params.name;
    const result = await db.findSkillsByTrack(track);
    if (result.length === 0) {
      throw new Error("not found");
    }
    res.send(result)
  } catch (error) {
    res.status(400).send("couldnt find that record");
  }

})

app.get("/api/skills/foundation/:name", async (req, res) => {
  try {
    const foundation = req.params.name;
    const result = await db.findSkillsByFoundation(foundation);
    if (result.length === 0) {
      throw new Error("not found");
    }
    res.send(result)
  } catch (error) {
    res.status(400).send("couldnt find that record");
  }

})

app.get("/", (req, res) => {
  res.send("test good")
})

app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${ PORT }...`);
});
