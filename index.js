const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Jenkins CI Pipeline Working!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
test('Dummy test', () => {
  expect(1 + 1).toBe(2);
});
"scripts": {
  "start": "node index.js",
  "test": "jest --ci --reporters=default --reporters=jest-junit",
  "build": "echo Build completed"
}
