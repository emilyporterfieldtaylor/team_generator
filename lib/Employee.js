class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

getName() {
  return this.name;
}

getId() {
  return this.id;
}

getEmail() {
  return this.email;
}

getRole() {
  
}

}

const employee1 = new Employee ("Jerry Jones", 1, "jerry.jones@cowboys.com")

module.exports = {
  Employee
}