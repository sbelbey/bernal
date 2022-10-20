const express = require('express');
const app = express();

//Setting the port
app.set('port', process.env.PORT || 8080);

//Listening the port
app.listen(app.get('port'), () => console.log('Server running on http://localhost:' + app.get('port')));
