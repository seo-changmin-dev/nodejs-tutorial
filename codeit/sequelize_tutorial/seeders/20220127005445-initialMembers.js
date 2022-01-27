'use strict';

const { BLOB } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Members', [
    {
      id: 1,
      name: "Bob",
      team: "Networks",
      position: "Tele-communicator",
      emailAddress: "Bob@AliceLover.com",
      phoneNumber: "010-xxxx-xxxx",
      admissionDate: '2020/02/02',
      birthday: "1989/11/11",
      profileImage: "profile1.png",
    },
    {
      id: 2,
      name: "Alice",
      team: "Networks",
      position: "Tele-communicator",
      emailAddress: "Alice@BobLover.com",
      phoneNumber: "010-xxxx-xxxx",
      admissionDate: '2019/02/02',
      birthday: "1999/01/19",
      profileImage: "profile2.png",
    },
    {
      id: 3,
      name: "Julie",
      team: "Servers",
      position: "BackEnd",
      emailAddress: "Julie@BackBack.com",
      phoneNumber: "010-xxxx-xxxx",
      admissionDate: '2017/03/18',
      birthday: "1978/08/19",
      profileImage: "profile3.png",
    },
    {
      id: 4,
      name: "Hei",
      team: "Secures",
      position: "Guard",
      emailAddress: "Hei@BlackGuard.com",
      phoneNumber: "010-xxxx-xxxx",
      admissionDate: '2015/03/14',
      birthday: "1993/07/24",
      profileImage: "profile4.png",
    },
    {
      id: 5,
      name: "Eugene",
      team: "Servers",
      position: "BackEnd",
      emailAddress: "Eugene@BackBack.com",
      phoneNumber: "010-xxxx-xxxx",
      admissionDate: '2012/03/04',
      birthday: "1977/05/16",
      profileImage: "profile5.png",
    },
    {
      id: 6,
      name: "Jamie",
      team: "Servers",
      position: "FrontEnd",
      emailAddress: "Jamie@BackBack.com",
      phoneNumber: "010-xxxx-xxxx",
      admissionDate: '2020/05/09',
      birthday: "1999/12/17",
      profileImage: "profile6.png",
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Members', null, {});
  }
};
