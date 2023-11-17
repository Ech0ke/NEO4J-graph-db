const neo4j = require("neo4j-driver");
const functions = require("./functions");
// Neo4j connection credentials
const uri = "bolt://localhost:7687";
const username = "neo4j";
const password = "password";
const database = "GymDB";

const driver = neo4j.driver(uri, neo4j.auth.basic(username, password), {
  database: database,
});

const runProgram = async () => {
  const session = driver.session();
  try {
    await functions.clearDatabase(session);
    await functions.insertData(session);
  } catch (error) {
    console.error("Error caught: ", error);
  } finally {
    session.close();
    driver.close();
  }
};

runProgram();
