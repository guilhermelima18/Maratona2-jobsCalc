const express = require('express');
const routes = express.Router();

const basePath = __dirname + "/pages/";

const profile = {
  name: "Guilherme",
  avatar: "https://avatars.githubusercontent.com/u/60123147?v=4",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4
};

const jobs = [
  {
    id: 1,
    name: "Pizzaria Brasil",
    "daily-hours": 2,
    "total-hours": 60,
    created_at: Date.now()
  },
  {
    id: 2,
    name: "Pizzaria Outfit",
    "daily-hours": 3,
    "total-hours": 40,
    created_at: Date.now()
  }
];

routes.get("/", (req, res) => {
  // Dividindo o total de horas do projeto pelo total de horas trabalhadas por dia no Projeto
  const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

  // Pegando a hora exata da criação do projeto
  const createdDate = new Date(job.created_at);
  const dueDay = createdDate.getDate() + Number(remainingDays);

  res.render(basePath + "index", { jobs });
});
routes.get("/job", (req, res) => res.render(basePath + "job"));
routes.get("/job/edit", (req, res) => res.render(basePath + "job-edit"));
routes.get("/profile", (req, res) => res.render(basePath + "profile", { profile: profile }));

routes.post("/job", (req, res) => {
  // Pegar último ID do Array JOBS
  const lastId = jobs[jobs.length - 1]?.id || 1;

  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    "daily-hours": req.body["daily-hours"],
    "total-hours": req.body["total-hours"],
    created_at: Date.now()
  });

  return res.redirect("/");
});

module.exports = routes;