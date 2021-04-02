const express = require('express');
const routes = express.Router();

const basePath = __dirname + "/pages/";

const Profile = {
  data: {
    name: "Guilherme",
    avatar: "https://avatars.githubusercontent.com/u/60123147?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
  },

  controllers: {
    index(req, res) {
      return res.render(basePath + "profile", { profile: Profile.data })
    },

    update(req, res) {
      const data = req.body;

      // Definindo quantas semanas tem em 1 ano = 52 semanas
      const weeksPerYear = 52;

      // Subtraindo as semanas de férias do ano
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

      // Total de horas trabalhadas na semana
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

      // Total de horas trabalhadas no mês
      const monthlyTotalHours = weekTotalHours * weeksPerMonth;

      // Valor da minha hora por trabalho
      const valueHour = data["monthly-budget"] / monthlyTotalHours;

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hour": valueHour
      };

      return res.redirect("/profile");
    }
  }
};

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Brasil",
      "daily-hours": 1,
      "total-hours": 6,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: "Pizzaria Outfit",
      "daily-hours": 3,
      "total-hours": 40,
      created_at: Date.now(),
    }
  ],

  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress';

        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
        };
      });
      return res.render(basePath + "index", { jobs: updatedJobs });
    },

    saveJob(req, res) {
      // Pegar último ID do Array JOBS
      const lastId = Job.data[Job.data.length - 1]?.id || 0;

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now()
      });
      return res.redirect("/");
    },

    createJob(req, res) {
      return res.render(basePath + "job");
    },

    show(req, res) {
      const jobId = req.params.id;
      const job = Job.data.find(job => Number(job.id) === Number(jobId));

      if (!job) return res.send("Job not found!");

      job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

      return res.render(basePath + "job-edit", { job });
    },

    update(req, res) {
      const jobId = req.params.id;
      const job = Job.data.find(job => Number(job.id) === Number(jobId));

      if (!job) return res.send("Job not found!");

      const updatedJob = {
        ...job,
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"]
      };

      Job.data = Job.data.map(job => {
        if (Number(job.id) === Number(jobId)) {
          job = updatedJob;
        }
        return job;
      })

      res.redirect("/job/" + jobId);
    },

    delete(req, res) {
      const jobId = req.params.id;

      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId));

      return res.redirect("/");
    }
  },

  services: {
    remainingDays(job) {
      // Dividindo o total de horas do projeto pelo total de horas trabalhadas por dia no Projeto
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

      // Pegando a hora exata da criação do projeto
      const createdDate = new Date(job.created_at);
      const dueDay = createdDate.getDate() + Number(remainingDays);
      const dueDateInMs = createdDate.setDate(dueDay);

      const timeDiffInMs = dueDateInMs - Date.now();

      // Transformar milisegundos em dias
      const dayInMs = 1000 * 60 * 60 * 24;
      const dayDiff = Math.floor(timeDiffInMs / dayInMs);

      return dayDiff;
    },

    calculateBudget: (job, valueHour) => valueHour * job['total-hours']
  }
};

routes.get("/", Job.controllers.index);
routes.get("/job", Job.controllers.createJob);
routes.post("/job", Job.controllers.saveJob);
routes.get("/job/:id", Job.controllers.show);
routes.post("/job/:id", Job.controllers.update);
routes.post("/job/delete/:id", Job.controllers.delete);
routes.get("/profile", Profile.controllers.index);
routes.post("/profile", Profile.controllers.update);

module.exports = routes;