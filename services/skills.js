const { v4: uuidv4 } = require('uuid');

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
        validApiKey: null
    }
]

module.exports = {
  createSkills: (username, xp) => {
    skills.push({
      id: uuidv4(),
      username,
      xp
    });
  },
  getAllSkills: () => skills,
  getSkillsById: (id) => skills.find(u => u.id == id),
  getSkillsByName: (username) => skills.find(u => u.username == username)

}