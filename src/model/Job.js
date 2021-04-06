let data = [
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
];

module.exports = {
  get() {
    return data;
  }
};