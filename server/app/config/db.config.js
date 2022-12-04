// *****For docker image******
// const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// module.exports = {
//   url: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
// };

// *****For cloud database******
// module.exports = {
//   url: "mongodb+srv://jo:password;@cluster0.ggirawc.mongodb.net/?retryWrites=true&w=majority",
// };

// ******For local database*******
module.exports = {
  url: "mongodb://localhost:27017/employees_database",
};
