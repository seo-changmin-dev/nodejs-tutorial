'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Members', [
    {
      id: 1,
      name: "Bob",
      team: "Networks",
      admissionDate: '2020/02/02',
      birthday: "1989/11/11",
    },
    {
      id: 2,
      name: "Alice",
      team: "Networks",
      admissionDate: '2019/02/02',
      birthday: "1999/01/19",
    },
    {
      id: 3,
      name: "Julie",
      team: "Servers",
      admissionDate: '2017/03/18',
      birthday: "1978/08/19",
    },
    {
      id: 4,
      name: "Hei",
      team: "Secures",
      admissionDate: '2015/03/14',
      birthday: "1993/07/24",
    },
    {
      id: 5,
      name: "Eugene",
      team: "Servers",
      admissionDate: '2012/03/04',
      birthday: "1977/05/16",
    },
    {
      id: 6,
      name: "Jamie",
      team: "Servers",
      admissionDate: '2020/05/09',
      birthday: "1999/12/17",
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Members', null, {});
  }
};
