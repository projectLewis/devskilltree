# Developers Skill Tree
DevSkillTree provides resources to get you started on your web development journey. <br />
Currently handles web development from HTML through database ORM tools.

## Table of contents
* [Technologies](#technologies)
* [Requirements](#requirements)
* [Setup/Scripts](#available-scripts)
* [About](#about)
* [Future Development](#future-development)

## Technologies

<table style="width:60%">
  <tr>
  </tr>
  <tr>
    <td class="subheading"><strong>Frontend</strong></td>
    <td>TypeScript</td> 
    <td>React</td>
    <td></td>
    <td></td>
  </tr>
  <tr rowspan="2">
    <td class="subheading"><strong>Backend</strong></td>
    <td>Node</td> 
    <td>Express</td>
    <td>MongoDB</td>
    <td>Mongoose</td>
  </tr> 
</table>

## Requirements
This project uses mongoDB, you will need mongo installed on your host machine to run it. Upon starting the node server mongo/mongoose will seed the DB with the all skills for future api requests. On future starts, it will check if the db is already seeded.

## Scripts
### `npm run start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run lint`
Runs the TypeScript linter.<br />

### `npm run start:dev`
Same as `npm run start` but runs the TypeScript linter first.<br />

### `npm run server`
Starts the Express server.

### `npm run server:dev`
Starts the Express server with nodemon for hot-reloading.

### `yarn build`
Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
This is necessary to test deployment of the frontend via the node server (as opposed to the webpack dev server).

## About
Provides a video quick start guide & three additional resources to get you started for any given skill. Upon marking a skill as complete, you'll get a notification about new skills available. Sometimes new skills are primarily in the current level, basic CSS unlocks Grid & Flex for example. If more than one skill in the next level are unlocked, you'll be given the opportunity for DevSkillTree to suggest a new skill to learn. Such as, deciding between NodeJS & React after basic JavaScript. It will also let you dismiss this and continue on learning however you choose.

## Future Development
### 2.0
* Will provide authentification, so that progress may persist between sessions.
* Ability to add additional skills to the database.

