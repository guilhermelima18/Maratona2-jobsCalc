const Profile = require('../model/Profile');

module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() })
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

    Profile.update({
      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour
    });

    return res.redirect("/profile");
  }
};