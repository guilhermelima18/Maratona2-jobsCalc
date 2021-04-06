module.exports = {
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
};