const express = require('express');
const { Member } = require('./models/index');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome!");
});

app.get('/api/members', async (req, res) => {
  const members = await Member.findAll();
  res.send(members);
});

app.get('/api/members/:id', async (req, res) => {
  const id = req.params.id;
  const members = await Member.findAll({where: { id }});

  if(members[0]) {
    res.send(members[0]);
  } else {
    res.status(404).send({ message: 'There is no member with that id!' });
  }
});

app.post('/api/members', async (req, res) => {
  const { body } = req;
  const newMember = await Member.create(body);

  res.send(body);
})

app.put('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const modifiedMember = await Member.update(body, { where: { id } });
  if(modifiedMember[0]) {
    res.send(body);
  } else {
    res.status(404).send({ message: 'There is no member with that id!' });
  }
})

app.delete('/api/members/:id', async (req, res) => {
  const { id } = req.params;

  Member.destroy({ where: { id } });
  res.send(`Member with ${id} being deleted on DB`);
});

app.listen(3030, () => {
  console.log("Server is Listening...");
});