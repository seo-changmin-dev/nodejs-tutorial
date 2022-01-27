const express = require('express');
const db = require('./models/index.js');
const app = express();

app.use(express.json());

const { Member } = db;

app.get('/api/members', async (req, res) => {
  const { team } = req.query;
  if (team) {
    const teamMembers = await Member.findAll({where: { team: team } });
    res.send(teamMembers);
  } else {
    const members = await Member.findAll();
    res.send(members);
  }
})

app.get('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const member = await Member.findOne({ where : { id }});

  if(member) {
    res.send(member);
  } else {
    res.status(404).send({ message: 'There is no member with that id'});
  }
})

app.post('/api/members', async (req, res) => {
  const newMember = req.body;
  const member = Member.build(newMember);
  console.log(member.id);
  await member.save();
  res.send(member);
});

app.put('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const result = await Member.update(newInfo, { where: { id }});

  console.log(result);

  if(result[0]) {
    res.send({ message: `${result[0]} row(s) affected` });
  } else {
    res.status(404).send({ message: `There is no member with that id`});
  }
});

// app.put('/api/members/:id', async (req, res) => {
//   const { id } = req.params;
//   const newInfo = req.body;
//   const member = await Member.findOne({ where: { id } });
//   if (member) {
//     Object.keys(newInfo).forEach((prop) => {
//       member[prop] = newInfo[prop];
//     });
//     await member.save();
//     res.send(member);
//   } else {
//     res.status(404).send({ message: 'There is no member with that id!'});
//   }
// });

app.delete('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const deletedCount = await Member.destroy({ where: { id }});

  console.log(deletedCount);
  if (deletedCount) {
    res.send({ message: `${deletedCount} row(s) deleted` });
  } else {
    res.status(404).send({ message: 'There is no member with that id!' });
  }
});



app.listen(3030, () => {
  console.log('Server is listening...');
});