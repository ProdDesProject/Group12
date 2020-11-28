const { v4: uuidv4 } = require('uuid');

let gains = [
  {
    id : "1",
    username : "testi ukko",
    gained_xp : {
      overall : '351141',
      attack : '15267',
      defence : '15267',
      strength : '15267',
      hitpoints : '15267',
      ranged : '15267',
      prayer : '15267',
      magic : '15267',
      cooking : '15267',
      woodcutting : '15267',
      fletching : '15267',
      fishing : '15267',
      firemaking : '15267',
      crafting : '15267',
      smithing : '15267',
      mining : '15267',
      herblore : '15267',
      agility : '15267',
      thieving : '15267',
      slayer : '15267',
      farming : '15267',
      runecraft : '15267',
      hunter : '15267',
      construction : '15267'
    }
  }
]

let skills = [
  {
    id : "1",
    username : "testi ukko",
    xp : {
      overall : '40245234',
      attack : '2130300',
      defence : '2130300',
      strength : '2130300',
      hitpoints : '2130300',
      ranged : '2130300',
      prayer : '2130300',
      magic : '2130300',
      cooking : '2130300',
      woodcutting : '2130300',
      fletching : '2130300',
      fishing : '2130300',
      firemaking : '2130300',
      crafting : '2130300',
      smithing : '2130300',
      mining : '2130300',
      herblore : '2130300',
      agility : '2130300',
      thieving : '2130300',
      slayer : '2130300',
      farming : '2130300',
      runecraft : '2130300',
      hunter : '2130300',
      construction : '2130300'
    },
    level : {
      overall : '1840',
      attack : '80',
      defence : '80',
      strength : '80',
      hitpoints : '80',
      ranged : '80',
      prayer : '80',
      magic : '80',
      cooking : '80',
      woodcutting : '80',
      fletching : '80',
      fishing : '80',
      firemaking : '80',
      crafting : '80',
      smithing : '80',
      mining : '80',
      herblore : '80',
      agility : '80',
      thieving : '80',
      slayer : '80',
      farming : '80',
      runecraft : '80',
      hunter : '80',
      construction : '80'
    }
  }
]

module.exports = {
  createGains: (username) => {
    gains.push({
      id : uuidv4(),
      username,
      gained_xp : null
    });
  },
  getGainedXpById: (id) => gains.find(u => u.id == id),
  getGainedXpByName: (username) => gains.find(u => u.username == username),
  editGains: (username, gained_xp) => {
    const result = gains.find(t =>t.username == username)

    if(result !== undefined)
    {
      result.gained_xp = gained_xp;
    }
  },
  createSkills: (username, xp, level) => {
    skills.push({
      id: uuidv4,
      username,
      xp,
      level
    });
  },
  getAllSkills: () => skills,
  getSkillsById: (id) => skills.find(u => u.id == id),
  getSkillsByName: (username) => skills.find(u => u.username == username),
  editSkills: (username, xp, level) => {
    const result = skills.find(t =>t.username == username)

    if(result !== undefined)
    {
      result.xp = xp
      result.level = level
    }
  }
}