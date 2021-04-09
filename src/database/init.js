const Database = require('./config');

const initDb = {
  init() {
    const db = await Database();

    await db.exec(`CREATE TABLE profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthly_budget INTEGER,
      days_per_week INTEGER,
      hours_per_day INTEGER,
      vacation_per_year INTEGER,
      value_hour INTEGER
    )`);

    await db.run(`INSERT INTO profile (
      name,
      avatar,
      monthly_budget,
      days_per_week,
      hours_per_day,
      vacation_per_year,
    ) VALUES (
      "Guilherme",
      "https://avatars.githubusercontent.com/u/60123147?v=4",
      3000,
      5,
      8,
      4
    )`);

    await db.exec(`CREATE TABLE jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      daily_hours INTEGER,
      total_hours INTEGER,
      created_at DATETIME
    )`);

    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "Pizzaria Brasil",
      2,
      10,
      1617514376018
    )`);

    await db.close();
  }
};

initDb.init();