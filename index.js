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

app.get('/skills/username=:username', (req, res) => {
  const u = skills.getSkillsByName(req.params.username);
  if(u !== undefined){
    res.json(u);
  }
  else{
    res.sendStatus(404);
  }
})

app.post('/startgains', (req, res) => {

  if('username' in req.body == false ) {
    return res.status(400).json({
        status: 'error',
        error: 'Missing username value from body'
    });
  }
  skills.createGains(req.body.username);
}),

app.post('/gains', (req, res) => {

  if('username' in req.body == false ) {
    return res.status(400).json({
        status: 'error',
        error: 'Missing username value from body'
    });
  }
  if('gained_xp' in req.body == false ) {
    return res.status(400).json({
        status: 'error',
        error: 'Missing gained_xp value from body'
    });
  }

  skills.editGains(req.body.username, req.body.gained_xp);
}),

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
  if('level' in req.body == false ) {
        return res.status(400).json({
            status: 'error',
            error: 'Missing level value from body'
      });
  }

  skills.createSkills(req.body.username, req.body.xp, req.body.level)

  res.sendStatus(201);
}),

app.put('/skills', (req, res) => {
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
  if('level' in req.body == false ) {
        return res.status(400).json({
            status: 'error',
            error: 'Missing level value from body'
      });
  }

  skills.editSkills (req.body.username, req.body.xp, req.body.level);
  res.sendStatus(200);
}),

app.use(express.static('public', options)),

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})