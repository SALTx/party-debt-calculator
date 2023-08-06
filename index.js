import chalk from 'chalk';
import fs from 'fs';
import Person from './person.js';

// ! Globals
const fileName = 'expenditure.txt';

// ! 1. check if file exists, if not create it print a message then exit
fs.readFile(fileName, 'utf-8', (err, data) => {
  if (err) {
    fs.writeFileSync(
        fileName,
        '# Add a new person for every new line as person:amount\n',
        'utf-8',
    );
    console.log(chalk.green(`File ${fileName} created`));
  } else {
    const lines = data.split('\n').filter((line) => !line.startsWith('#'));
    const expenditure = lines
        .filter((line) => line.trim() !== '' && line.includes(':'))
        .map((line) => {
          const [name, amount] = line.split(':').map((str) => str.trim());
          return new Person(name, amount);
        });

    // ! 2. print the total amount spent
    const totalAmountSpent = expenditure.reduce(
        (total, person) => total + Number(person.amountSpent),
        0,
    );
    console.log(chalk.red(`Total amount spent: $${totalAmountSpent}`));

    // 3. print the amount each person spent
    console.log(chalk.green('Amount spent by each person:'));
    expenditure.forEach((person) => {
      console.log(`${person.name}: $${person.amountSpent}`);
    });

    // ! 3. Calculate the least number of transactions required
    console.log(chalk.blue('Transactions:'));
    const totalAmountOwed = expenditure.reduce(
        (total, person) => total + Number(person.amountSpent),
        0,
    );
    const amountOwedToEachPerson = expenditure.reduce((obj, person) => {
      obj[person.name] = Number(person.amountSpent);
      return obj;
    }, {});
    const averageAmountOwed = totalAmountOwed / expenditure.length;
    const differences = expenditure.map((person) => {
      return {
        name: person.name,
        difference: amountOwedToEachPerson[person.name] - averageAmountOwed,
      };
    });
    differences.sort((a, b) => a.difference - b.difference);
    let i = 0;
    let j = differences.length - 1;
    while (i < j) {
      const from = differences[i];
      const to = differences[j];
      const amount = Math.min(-from.difference, to.difference);
      console.log(`${from.name} -> ${to.name} $${amount.toFixed(2)}`);
      amountOwedToEachPerson[from.name] += amount;
      amountOwedToEachPerson[to.name] -= amount;
      if (from.difference + amount === 0) {
        i++;
      }
      if (to.difference - amount === 0) {
        j--;
      }
    }
  }
});
