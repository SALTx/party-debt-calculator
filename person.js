/**
 * Person class
 * @class
 * @param {string} name the name of the person
 * @param {number} amountSpent the amount spent by the person
 */
export default class Person {
  /**
   * @constructor
   * @param {string} name the name of the person
   * @param {number} amountSpent the amount spent by the person
   */
  constructor(name, amountSpent) {
    this.name = name;
    this.amountSpent = amountSpent;
  }

  /**
   * @param {Person} sender the person who is sending the money
   * @param {Person} receiver the person who is receiving the money
   * @param {number} amount the amount of money being transferred
   */
  static transferMoney(sender, receiver, amount) {
    sender.amountSpent += amount;
    receiver.amountSpent -= amount;
  }
}
