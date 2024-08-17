var express = require('express');
var mysql = require('mysql2');
var path = require('path');
const bodyParser = require('body-parser');
var port = process.env.PORT || 8080 || 5000;

const app = express();

// SET OUR VIEWS AND VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database!");
});

// START OF PAGES
app.get('/', function(req, res) {
    res.render('index');
});

app.post('/', function(req, res) {
    var post = req.body;
    var name = post.name;
    var email = post.email;
    var phone = post.phone;
    const query = `INSERT INTO information (name,email,phone) VALUES ('${name}','${email}', '${phone}')`;
    con.query(query, (error, results) => {
      console.log('Inserted Row ID:', results.insertId);
      res.render('index');
    });
});


app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
