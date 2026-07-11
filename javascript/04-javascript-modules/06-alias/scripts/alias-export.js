const name = "Rivan Fadlani";

function sum(first, second) {
  return first + second;
}

class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello(name) {
    console.info(`Hello, ${name}! my name is ${this.name}`);
  }
}

export { name as nama, sum as hitung, Person as Orang }; // membuat alias di export, tidak direkomendasikan
