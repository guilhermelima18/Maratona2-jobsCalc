const Job = require('../model/Job');
const jobUtils = require('../utils/jobUtils');
const Profile = require('../model/Profile');

module.exports = {
  index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();

    const updatedJobs = jobs.map((job) => {
      const remaining = jobUtils.remainingDays(job);
      const status = remaining <= 0 ? 'done' : 'progress';

      return {
        ...job,
        remaining,
        status,
        budget: jobUtils.calculateBudget(job, profile["value-hour"])
      };
    });

    return res.render("index", { jobs: updatedJobs });
  },

  saveJob(req, res) {
    const jobs = Job.get();
    // Pegar último ID do Array JOBS
    const lastId = jobs[jobs.length - 1]?.id || 0;

    jobs.push({
      id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now()
    });
    return res.redirect("/");
  },

  createJob(req, res) {
    return res.render("job");
  },

  show(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();
    const jobId = req.params.id;
    const job = jobs.find(job => Number(job.id) === Number(jobId));

    if (!job) return res.send("Job not found!");

    job.budget = jobUtils.calculateBudget(job, profile["value-hour"])

    return res.render("job-edit", { job });
  },

  update(req, res) {
    const jobs = Job.get();
    const jobId = req.params.id;
    const job = jobs.find(job => Number(job.id) === Number(jobId));

    if (!job) return res.send("Job not found!");

    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"]
    };

    jobs = jobs.map(job => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }
      return job;
    })

    res.redirect("/job/" + jobId);
  },

  delete(req, res) {
    const jobs = Job.get();
    const jobId = req.params.id;

    jobs = jobs.filter(job => Number(job.id) !== Number(jobId));

    return res.redirect("/");
  }
};