const express = require('express');
const path = require('path');
const app = express();

// React build folder ko serve karna
app.use(express.static(path.join(__dirname, 'client_build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client_build', 'index.html'));
});

// Port set karna (Heroku ke liye)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
