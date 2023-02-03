const express = require('express');
const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./routes/routes')(app);

app.listen(process.env.PORT || 3000, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
