/**
 * CheckIn.js
 *
 * @description A team member's log entry of their location. 
 */

module.exports = {
  attributes: {
    email: { type: "string", required: true, allowNull: false, unique: true, isEmail: true },
    time: { type: "ref", columnType: "datetime", autoCreatedAt: true },
    location: { type: "string", required: true, allowNull: false },
  },
};

