var express = require('express');
var app = express();
var tasks = new Array ();
var index = 1;
const bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.sendFile( __dirname + "/" + "Aufgabenverwaltung.html" );
});

app.listen(process.env.PORT || 3000, function () {
	console.log('Example app listening on port !');
});

app.post('/addTask', function (req, res) {
	console.log(req.body);
	var taskString = req.body.name;
	var taskArray = [];
	taskArray = taskString.split('p$,3os-');
	console.log(taskArray);
	console.log(typeof taskArray);
	taskArray.forEach(task => {
	    newTask = {id: index, name: task, isOpen: "todo"};
        index = index + 1;
        tasks.push(newTask);
        console.log(newTask);
        console.log(tasks);
	});
	res.send(JSON.stringify(tasks));
});

app.post('/close', function (req, res) {
	console.log(req.body.id);
	
	tasks.forEach(function(task){
		console.log(task.id);
		if(task.id == req.body.id)
		{
			
			task.isOpen = "done";
			console.log(tasks);
			
		}
	});
	res.send(JSON.stringify(tasks));
});

app.post('/open', function (req, res) {
	console.log(req.body.id);
	
	tasks.forEach(function(task){
		console.log(task.id);
		if(task.id == req.body.id)
		{
			
			task.isOpen = "todo";
			console.log(tasks);
			
		}
	});
	res.send(JSON.stringify(tasks));
});

app.get('/selectionT', function (req, res) {
	var rueckgabe = new Array ();
	tasks.forEach(function(task){
		console.log(task.isOpen);
		if(task.isOpen == "todo")
		{
			rueckgabe.push(task);
		}
	});
	res.send(JSON.stringify(rueckgabe));
});

app.get('/selectionD', function (req, res) {
	var rueckgabe = new Array ();
	tasks.forEach(function(task){
		console.log(task.isOpen);
		if(task.isOpen == "done")
		{
			rueckgabe.push(task);
		}
	});
	res.send(JSON.stringify(rueckgabe));
});


