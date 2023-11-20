const neo4j = require("neo4j-driver");
const functions = require("./functions");
const readline = require("readline");

// Neo4j connection credentials
const uri = "bolt://localhost:7687";
const username = "neo4j";
const password = "password";
const database = "GymDB";

const driver = neo4j.driver(uri, neo4j.auth.basic(username, password), {
  database: database,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const runProgram = async () => {
  const session = driver.session();
  let exitLoop = false;
  try {
    await functions.clearDatabase(session);
    await functions.insertData(session);
    await functions.createRelationships(session);

    while (!exitLoop) {
      console.log("\nEnter a number (1-7)");
      console.log(
        `1. Find all gym members that have 'Gold' membership
2. Find all trainees that trainer 'Vidas Vidaitis trains individually'
3. Find all other participants that were training together with 'Neda Nedaite' in Cardio Blast that occurred at '2023-11-17 10:00'
4. Find the shortest road between trainees homes that is connected to the gym group workout session 'Luna Lunaite' and 'Marsas Marsietis'
4. Find the shortest road between trainees 'Luna Lunaite' and 'Marsas Marsietis' homes that is connected to the same gym group workout session
5. Find the all the distances between trainees 'Luna Lunaite' and 'Marsas Marsietis' homes that is connected to the same gym group workout session
6. Execute your own query
7. Exit the app`
      );
      const userInput = await askQuestion("Enter your choice: ");
      switch (userInput) {
        case "1":
          await functions.query1(session);
          break;
        case "2":
          await functions.query2(session);
          break;
        case "3":
          await functions.query3(session);
          break;
        case "4":
          await functions.query4(session);
          break;
        case "5":
          await functions.query5(session);
          break;
        case "6":
          const userQuery = await askQuestion("Enter your query: ");
          await functions.executeUserQuery(session, userQuery);
          break;
        case "7":
          console.log("Exiting...");
          exitLoop = true;
          break;
        default:
          console.log("Invalid input. Please enter a number between 1 and 7.");
          break;
      }
    }
  } catch (error) {
    console.error("Error caught: ", error);
  } finally {
    session.close();
    driver.close();
    rl.close();
    if (exitLoop) {
      return; // Exit the runProgram function
    }
  }

  function askQuestion(question) {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }
};

runProgram();
