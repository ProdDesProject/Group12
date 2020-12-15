const hiscores = require('osrs-json-hiscores');
const db = require('../db');

module.exports = {
  getAllSkills: () => skills,
  getSkillsById: (id) => skills.find(u => u.id == id),
  getSkillsByName: (username) => {
    var q = "select * from players where username = '"+ username +"'";
    const result = db.query(q);
    console.log(result);
    if (result !== undefined){
      return result;
    }
  },
  getUserSkills: (username, id) => {

    var levels = [];
    var names = [];
    
    hiscores.getStats(username, 'full')
    .then(res => {
      var obj = res.main.skills;
      var quer = "update players set "
      names = Object.getOwnPropertyNames(obj);
      for(var i in obj){
        levels.push(obj[i]);
      }
      var userquer = "INSERT INTO players (username) VALUES ('"+ username +"')";
      console.log(userquer);
      db.query(userquer);
      
      for(var x in names){
        var querpart = names[x] + "Level = " + levels[x].level + ", " + names[x] + "XP = " + levels[x].xp +", ";
        quer = quer + querpart;
      }
      quer = quer.substring(0, quer.length - 2) + " WHERE username='" + username +"'"
      console.log("query:" + quer);
      db.query(quer);
    })
    .catch(err => console.log(err))
  },
  updateUserSkills: (username) => {
    var q1 = "select overallXP, overallGained from players where username = '"+ username +"'";
    var q2;
    var g;
    var obj = db.query(q1);
    var old_g;
    var gained;
    
    obj.then(function(result) {
      console.log(result[0].overallXP);
      old_g = result[0].overallXP;
      console.log(result[0].overallGained);
      gained = result[0].overallGained;
    })
    console.log(old_g);
    if(old_g !== undefined){
      hiscores.getStats(username, 'full')
      .then(res => {
        g = res.main.skills.overall.xp;
        console.log(g);

        if(gained !== null || gained !== NaN){
          gained = (g - old_g) + gained;
          console.log(gained);
        }
        else if(gained == null || gained !== NaN){
          gained = g - old_g;
          console.log(gained);
        }
        q2 = "update players set overallGained = " + gained + " WHERE username = '"+ username +"'";
        db.query(q2);
      })
    }
  },
  lookUpPlayer: (username) => {
    var q = "SELECT id FROM players WHERE username='" + username +"'";
    var res = db.query(q);
    res.then(function(result) {
      return result;
    })
  }
}