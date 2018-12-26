const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('pusher-chatkit-server');
const app = express();

// init
const chatkit = new Chatkit.default({
	instanceLocator: 'v1:us1:4d3bbbd8-e862-4dc2-8728-4c6fe0a18c84',
	key: '58b3279f-33fe-468e-aece-48b8befe406d:C52odH/OJwH7a+L2nKkK23JsQUk7qZAq934dtIdLa9U='
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.post('/users', (req,res) => {
	const {username} = req.body;
	chatkit.createGlobalRole({
		name:username,
		id:username
	})
		.then(()=>sendStatus(201))
		.catch(err=>{
			if (err.error_type == 'services/chatkit/user/user_already_exists') {
				res.sendStatus(200);
			} else {
				res.status(err.statusCode).json(err);
			}
		});
});

const PORT = 3001;
app.listen(PORT, err=>{
	if(err) {
		console.log(err);
	} else {
		console.log(`${PORT}正在運行`);
	}
});