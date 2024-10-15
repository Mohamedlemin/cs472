const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getNumbers(req) {
  let a, b;
  if (req.params.a && req.params.b) {
    a = parseFloat(req.params.a);
    b = parseFloat(req.params.b);
  } else if (req.query.a && req.query.b) {
    a = parseFloat(req.query.a);
    b = parseFloat(req.query.b);
  } else if (req.body.a && req.body.b) {
    a = parseFloat(req.body.a);
    b = parseFloat(req.body.b);
  }
  return { a, b };
}

const calculatorRouter = express.Router();

calculatorRouter.get('/addition/:a/:b', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a + b });
});

calculatorRouter.get('/addition', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a + b });
});

calculatorRouter.post('/addition', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a + b });
});

calculatorRouter.get('/subtraction/:a/:b', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a - b });
});

calculatorRouter.get('/subtraction', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a - b });
});

calculatorRouter.post('/subtraction', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a - b });
});

calculatorRouter.get('/multiplication/:a/:b', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a * b });
});

calculatorRouter.get('/multiplication', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a * b });
});

calculatorRouter.post('/multiplication', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a * b });
});

calculatorRouter.get('/division/:a/:b', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a / b });
});

calculatorRouter.get('/division', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a / b });
});

calculatorRouter.post('/division', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a / b });
});

calculatorRouter.get('/modulus/:a/:b', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a % b });
});

calculatorRouter.get('/modulus', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a % b });
});

calculatorRouter.post('/modulus', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a % b });
});

app.use('/', calculatorRouter);

app.listen(port, () => {
  console.log(`Calculator API is running on http://localhost:${port}`);
});