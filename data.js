const trainersData = [
  { name: "Vidas Vidaitis", specialization: "Strength Training" },
  { name: "Markas Markaitis", specialization: "Cardio Workouts" },
];

const traineesData = [
  { name: "Jonas Jonaitis", membership: "Gold", phone: 37065555501 },
  { name: "Ema Emonaite", membership: "Silver", phone: 37065555502 },
  { name: "Silvijus Silvaitis", membership: "Silver", phone: 37065555503 },
  { name: "Neda Nedaite", membership: "Silver", phone: 37065555504 },
  { name: "Monika Monikaite", membership: "Gold", phone: 37065555505 },
  { name: "Nedas Nedaitis", membership: "Gold", phone: 37065555506 },
  { name: "Matas Mataitis", membership: "Gold", phone: 37065555507 },
  { name: "Redas Redaitis", membership: "Silver", phone: 37065555508 },
  { name: "Kostas Kostaitis", membership: "Gold", phone: 37065555509 },
  { name: "Karolis Karolietis", membership: "Silver", phone: 37065555510 },
  { name: "Meda Mediene", membership: "Gold", phone: 37065555511 },
  { name: "Tadas Tadaitis", membership: "Gold", phone: 37065555512 },
  { name: "Nerijus Nerijaitis", membership: "Gold", phone: 37065555513 },
  { name: "Urte Urtiene", membership: "Silver", phone: 37065555514 },
  { name: "Mazvydas Mazvydaitis", membership: "Gold", phone: 37065555515 },
  { name: "Marsas Marsietis", membership: "Gold", phone: 37065555516 },
  { name: "Luna Lunaite", membership: "Gold", phone: 37065555517 },
];

const groupWorkoutsData = [
  { title: "Cardio Blast", description: "High-intensity cardio session" },
  { title: "Strength & Conditioning", description: "Full-body workout" },
  {
    title: "Muscle pump",
    description: "Weighted and body-weight medium intensity workout",
  },
  { title: "Zumba", description: "Dance cardio session" },
  { title: "Yoga", description: "Stretch and mobility, mind control session" },
];

const groupWorkoutSessionsData = [
  { date: "2023-11-16", time: "09:00", location: "Vilnius, Saltoniskiu g. 9" },
  { date: "2023-11-17", time: "10:00", location: "Vilnius, Ukmerges g. 256" },
];

const gymsData = [
  { name: "Fitness Center X", location: "Vilnius, Saltoniskiu g. 9" },
  { name: "Gym Palace", location: "Vilnius, Kalvariju g. 88" },
  { name: "Gym+", location: "Vilnius, Ukmerges g. 256" },
  { name: "Gym+ ", location: "Kaunas, Pramones. pr. 25" },
  { name: "Gym+", location: "Klaipeda, Vingio g. 31" },
];

const distancesSession1 = {
  "Nerijus Nerijaitis": 6.5,
  "Mazvydas Mazvydaitis": 9.4,
  "Urte Urtiene": 7.0,
  "Luna Lunaite": 5.4,
  "Neda Nedaite": 4.2,
  "Marsas Marsietis": 8.9,
};

const distancesSession2 = {
  "Luna Lunaite": 2.6,
  "Silvijus Silvaitis": 5.1,
  "Neda Nedaite": 6.0,
  "Monika Monikaite": 10.2,
  "Nedas Nedaitis": 1.5,
  "Meda Mediene": 0.3,
  "Kostas Kostaitis": 6,
  "Marsas Marsietis": 3.6,
};

module.exports = {
  trainersData,
  traineesData,
  groupWorkoutsData,
  groupWorkoutSessionsData,
  gymsData,
  distancesSession1,
  distancesSession2,
};
