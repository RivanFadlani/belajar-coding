export class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello(name) {
    console.info(`Hi, ${name}, my name is ${this.name}`);
  }
}
