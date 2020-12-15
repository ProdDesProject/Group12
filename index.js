const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const skills = require('./services/skills');
const app = express();
const port = 7373;

app.use(bodyParser.json());

const options = {
  index: 'index.html'
};

app.get('/', (req, res) => {
  res.redirect('/index.html');
})

app.get('/skills', (req, res) => {
  const t = skills.getAllSkills();
        res.json(t);
})

app.get('/data', (req, res) => {
  if(req.query.player != null){
    var q = "SELECT id FROM players WHERE username='" + req.query.player +"'";
    skills.getQuery(q, req.query.player);
  }
  else{
    console.log("player field is null");
    res.sendStatus(404);
  }
  
  res.sendStatus(200);
})

app.get('/skills/username=:username', (req, res) => {
  const u = skills.getSkillsByName(req.params.username);
  if(u !== undefined){
    u.then(function(result) {
      res.json(result[0]);
   })
  }
  else{
    res.sendStatus(404);
  }
})

app.get('/gains/username=:username', (req, res) => {
  const u = skills.getGainedXpByName(req.params.username);
  if(u !== undefined){
    res.json(u);
  }
  else{
    res.sendStatus(404);
  }
})

app.use(express.static('public', options)),

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})