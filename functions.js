const {
  trainersData,
  traineesData,
  groupWorkoutsData,
  groupWorkoutSessionsData,
  gymsData,
} = require("./data");

const insertData = async (session) => {
  try {
    // Loop through trainersData and create Trainer nodes
    for (const trainer of trainersData) {
      await session.run("CREATE (:Trainer $trainer)", { trainer });
    }

    // Loop through traineesData and create Trainee nodes
    for (const trainee of traineesData) {
      await session.run("CREATE (:Trainee $trainee)", { trainee });
    }

    // Loop through groupWorkoutsData and create GroupWorkout nodes
    for (const workout of groupWorkoutsData) {
      await session.run("CREATE (:GroupWorkout $workout)", { workout });
    }

    // Loop through groupWorkoutSessionsData and create GroupWorkoutSession nodes
    for (const sessionData of groupWorkoutSessionsData) {
      await session.run("CREATE (:GroupWorkoutSession $sessionData)", {
        sessionData,
      });
    }

    // Loop through gymsData and create Gym nodes
    for (const gym of gymsData) {
      await session.run("CREATE (:Gym $gym)", { gym });
    }

    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

const clearDatabase = async (session) => {
  try {
    // Cypher query to delete all nodes and relationships
    const deleteQuery = "MATCH (n) DETACH DELETE n";

    // Execute the delete query to clear all data
    await session.run(deleteQuery);
    console.log("Database cleared.");
  } catch (error) {
    console.error("Error clearing database:", error);
  }
};

module.exports = { insertData, clearDatabase };
