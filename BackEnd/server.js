const path = require('path');
const app = require(path.join(__dirname, './app'));
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
