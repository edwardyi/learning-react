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

app.post('/users', (req, res) => {
	console.log('this post is from  log',req.body.username);
	const {username} = req.body;
	chatkit.createUser({
		name:username,
		id:username
	})
		.then(()=> res.sendStatus(201))
		.catch(error=>{
			console.log(error)
			// 如果不是用戶已經存在的類型,就用其他類型的錯誤來紀錄錯誤訊息
			if (error.error === 'services/chatkit/user_already_exists') {
				res.sendStatus(200);
			} else {
				res.status(error.statusCode).json(error);
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