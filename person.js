export default class Person {
  constructor(name, amountSpent) {
    this.name = name;
    this.amountSpent = amountSpent;
  }

  static transferMoney(sender, receiver, amount) {
    sender.amountSpent += amount;
    receiver.amountSpent -= amount;
  }
}
