var express= require("express");
var app = express();
var path = require("path");

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(express.static(path.join(__dirname,"public")))

app.get('/',(req,res) => {
    
    res.render('Vasanti.ejs', {
        'text': ""
    });
   
});

app.listen(8080); 