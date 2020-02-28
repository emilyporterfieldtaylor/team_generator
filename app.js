const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

let employees = [];
let roleOptions = ["Manager", "Engineer", "Intern"];

function GenerateTeamMember() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your full name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is your Employee ID number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your work email address?"
    },
    {
      type: "list",
      name: "getRole",
      message: "What is your role?",
      choices: roleOptions
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is your office number?",
      when: function( answers ) {
        // Only run if user set a name
        return answers.getRole === "Manager";
      }
    },
    {
      type: "input",
      name: "githubUsername",
      message: "What is your github username?",
      when: function( answers ) {
        // Only run if user set a name
        return answers.getRole === "Engineer";
      }
    },
    {
      type: "input",
      name: "school",
      message: "What is the name of your school?",
      when: function( answers ) {
        // Only run if user set a name
        return answers.getRole === "Intern";
      }
    }
  ]).then(answer => {
    if (answer.getRole === "Manager") {
      let manager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
      employees.push(manager);

      roleOptions = ["Engineer", "Intern"];
    } else if (answer.getRole === "Engineer") {
      let engineer = new Engineer(answer.name, answer.id, answer.email, answer.githubUsername);
      employees.push(engineer);
    } else {
      let intern = new Intern(answer.name, answer.id, answer.email, answer.school);
      employees.push(intern);
    }

    checkMoreEmployees();
  });
}


function getOfficeNumber() {
  inquirer.prompt([
    {
      type: "input",
      name: "officeNumber",
      message: "What is your office number?"
    }
  ]).then(answer => {
    return answer.officeNumber;
  });
}

function checkMoreEmployees() {
  inquirer.prompt([
    {
      type: "list",
      name: "moreEmployees",
      message: "Are there more employees?",
      choices: ["Yes", "No"]
    }
  ]).then(answer => {
    if (answer.moreEmployees === "Yes") {
      GenerateTeamMember();
    }
    else if (answer.moreEmployees === "No") {
      var htmlResult = render(employees);
      fs.writeFileSync("result.html", htmlResult);
    }
  });
}

GenerateTeamMember();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```