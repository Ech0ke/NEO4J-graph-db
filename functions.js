const {
  trainersData,
  traineesData,
  groupWorkoutsData,
  groupWorkoutSessionsData,
  gymsData,
  distancesSession1,
  distancesSession2,
} = require("./data");

const insertData = async (session) => {
  try {
    for (const trainer of trainersData) {
      await session.run("CREATE (:Trainer $trainer)", { trainer });
    }

    for (const trainee of traineesData) {
      await session.run("CREATE (:Trainee $trainee)", { trainee });
    }

    for (const groupWorkout of groupWorkoutsData) {
      await session.run("CREATE (:GroupWorkout $groupWorkout)", {
        groupWorkout,
      });
    }

    for (const groupWorkoutSession of groupWorkoutSessionsData) {
      await session.run("CREATE (:GroupWorkoutSession $groupWorkoutSession)", {
        groupWorkoutSession,
      });
    }

    for (const gym of gymsData) {
      await session.run("CREATE (:Gym $gym)", { gym });
    }

    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Error inserting data: ", error);
  }
};

const createRelationships = async (session) => {
  try {
    await session.run(`
    MATCH (t:Trainer {specialization: "Strength Training"}),
          (g:GroupWorkout {title: "Strength & Conditioning"})
    CREATE (t)-[:LEADS]->(g)
  `);

    await session.run(`
    MATCH (g:GroupWorkout {title: "Strength & Conditioning"}),
          (s:GroupWorkoutSession {date: "2023-11-16", time: "09:00"})
    CREATE (g)-[:HAS_SESSION]->(s)
  `);

    await session.run(`
    MATCH (s:GroupWorkoutSession {date: "2023-11-16", time: "09:00"}),
          (g:Gym {location: "Vilnius, Saltoniskiu g. 9"})
    CREATE (s)-[:HOSTED_AT]->(g)
  `);

    await session.run(`
    MATCH (t:Trainer {name: "Vidas Vidaitis"}),
        (tr:Trainee)
    WHERE tr.name IN ["Silvijus Silvaitis", "Ema Emonaite", "Urte Urtiene", "Luna Lunaite"]
    CREATE (t)-[:TRAINS_INDIVIDUAL]->(tr)`);

    for (const [trainee, distance] of Object.entries(distancesSession1)) {
      await session.run(`
        MATCH (s:GroupWorkoutSession {date: "2023-11-16", time: "09:00"}),
              (tr:Trainee {name: "${trainee}"})
        CREATE (tr)-[:ATTENDS_SESSION {distance: ${distance}}]->(s)
      `);
    }

    await session.run(`
    MATCH (t:Trainer {specialization: "Cardio Workouts"}),
          (g:GroupWorkout {title: "Cardio Blast"})
    CREATE (t)-[:LEADS]->(g)`);

    await session.run(`
    MATCH (g:GroupWorkout {title: "Cardio Blast"}),
        (s:GroupWorkoutSession {date: "2023-11-17", time: "10:00"})
    CREATE (g)-[:HAS_SESSION]->(s)`);

    await session.run(`
    MATCH (s:GroupWorkoutSession {date: "2023-11-17", time: "10:00"}),
        (g:Gym {location: "Vilnius, Ukmerges g. 256"})
    CREATE (s)-[:HOSTED_AT]->(g)`);

    await session.run(`
    MATCH (t:Trainer {name: "Markas Markaitis"}),
        (tr:Trainee)
    WHERE tr.name IN ["Jonas Jonaitis", "Neda Nedaite", "Matas Mataitis", "Redas Redaitis", "Karolis Karolietis"]
    CREATE (t)-[:TRAINS_INDIVIDUAL]->(tr)`);

    for (const [trainee, distance] of Object.entries(distancesSession2)) {
      await session.run(`
        MATCH (s:GroupWorkoutSession {date: "2023-11-17", time: "10:00"}),
              (tr:Trainee {name: "${trainee}"})
        CREATE (tr)-[:ATTENDS_SESSION {distance: ${distance}}]->(s)
      `);
    }

    console.log("Relationships successfully.");
  } catch (error) {
    console.error("Error creating relations: ", error);
  }
};

const clearDatabase = async (session) => {
  try {
    const deleteQuery = "MATCH (n) DETACH DELETE n";

    await session.run(deleteQuery);
    console.log("Database cleared.");
  } catch (error) {
    console.error("Error clearing database: ", error);
  }
};

const query1 = async (session) => {
  result = await session.run(
    `MATCH (t:Trainee) WHERE t.membership='Gold' RETURN t;`
  );

  const trainees = result.records.map((record) => record.get("t").properties);
  console.log(trainees);
  return;
};

const query2 = async (session) => {
  result =
    await session.run(`MATCH (t:Trainer {name: 'Vidas Vidaitis'})-[:TRAINS_INDIVIDUAL]->(trainee:Trainee)
  RETURN trainee;`);

  const trainees = result.records.map(
    (record) => record.get("trainee").properties
  );
  console.log(trainees);
  return;
};

const query3 = async (session) => {
  const result = await session.run(`
  MATCH (neda:Trainee {name: "Neda Nedaite"})-[:ATTENDS_SESSION]->(session:GroupWorkoutSession {date: "2023-11-17", time: "10:00"})
  MATCH (participants:Trainee)-[:ATTENDS_SESSION]->(session)
  WHERE participants <> neda
  RETURN participants;
`);

  const participants = result.records.map(
    (record) => record.get("participants").properties
  );

  console.log(participants);
};

const query4 = async (session) => {
  const result = await session.run(`
  MATCH (start:Trainee {name: 'Marsas Marsietis'}), (end:Trainee {name: 'Luna Lunaite'}),
        p = shortestPath((start)-[*]-(end))
  RETURN p;
`);

  const shortestPath = result.records[0].get("p").segments.map((segment) => {
    return {
      start: segment.start.properties,
      relationship: segment.relationship.type,
      end: segment.end.properties,
    };
  });

  console.log(shortestPath);
};

const query5 = async (session) => {
  const result = await session.run(`
  MATCH (start:Trainee {name: 'Marsas Marsietis'}), (end:Trainee {name: 'Luna Lunaite'})
  MATCH path = (start)-[*]-(end)
  UNWIND relationships(path) AS rel
  WITH collect(rel) AS rels, nodes(path) AS nodesInPath
  UNWIND nodesInPath AS node
  MATCH (node)-[:HOSTED_AT]->(gym)
  WITH COLLECT(DISTINCT {node: node, gym: gym}) AS nodeGyms, rels
  RETURN REDUCE(totalDistance = 0, r IN rels | totalDistance + r.distance) AS totalDistance, 
         COLLECT(DISTINCT nodeGyms) AS gymLocation;
`);

  console.log(
    result.records.map((record) => ({
      totalDistance: record.get("totalDistance"),
      gymLocation: JSON.stringify(
        record
          .get("gymLocation")
          .flatMap((item) =>
            item.map((innerItem) => innerItem.gym.properties.location)
          )
      ),
    }))
  );
};

const query8 = async (session) => {
  const result = await session.run(`
  MATCH (t:Trainee)-[:ATTENDS_SESSION]->(s:GroupWorkoutSession)
  RETURN s.date AS sessionDate, s.time AS sessionTime, s.location AS sessionLocation, COUNT(t) AS attendeeCount;
`);

  const sessionAttendeesCount = result.records.map((record) => {
    return {
      sessionDate: record.get("sessionDate"),
      sessionTime: record.get("sessionTime"),
      sessionLocation: record.get("sessionLocation"),
      attendeeCount: record.get("attendeeCount").toNumber(),
    };
  });

  console.log(sessionAttendeesCount);
};

const executeUserQuery = async (session, userQuery) => {
  try {
    await session.run(userQuery);
    console.log("Query executed successfully");
  } catch (error) {
    console.error("Query execution failed: ", error);
  }
};

module.exports = {
  insertData,
  createRelationships,
  clearDatabase,
  query1,
  query2,
  query3,
  query4,
  query5,
  query8,
  executeUserQuery,
};
