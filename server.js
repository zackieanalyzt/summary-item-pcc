// server.js
const app = require('./app');
const PORT = process.env.PORT || 3033;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});