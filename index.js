const express = require('express')
const path = require('path');
const skills = require('./services/skills');
const app = express();
const port = 7373;

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
app.get('/skills/id=:id', (req, res) => {
  const t = skills.getSkillsById(req.params.id)
      if(t !== undefined){
        res.json(t)
      }
      else{
        res.sendStatus(404)
      }
})

app.get('/skills/username=:username', (req, res) => {
  const t = skills.getSkillsByName(req.params.username)
      if(t !== undefined){
        res.json(t)
      }
      else{
        res.sendStatus(404)
      }
})

app.post('/skills', (req, res) => {

  if('username' in req.body == false ) {
    return res.status(400).json({
        status: 'error',
        error: 'Missing username value from body'
    });
  }
  if('xp' in req.body == false ) {
      return res.status(400).json({
          status: 'error',
          error: 'Missing xp value from body'
      });
  }

  skills.createSkills(req.body.username, req.body.xp)

  res.sendStatus(201)
})

app.use(express.static('public', options));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})