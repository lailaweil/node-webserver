const express = require ('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials'); // donde voy a tener mis partials
app.set('view engine', 'hbs');

//Log de requests de paginas
app.use((req, res, next)=>{ 
    var now = new Date().toString();
    var log =  `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{ 
        if(err){
            console.log('unable to append to server.log');
        }
    });
    next();
});

// //Página en mantenimiento
// app.use((req,res,next) =>{ //no deja que se rendeerie el codigo, no tengo next()
//     res.render('maintance.hbs');
// });

//Cargo mis archivos estáticos
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => { //registro un helper (seria como una funcion)
    return new Date().getFullYear(); 
});

//helper pasa a mayusculas
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

//rendereo home page
app.get('/', (req, res)=>{ 
    res.render('home.hbs', {
        pageTitle: 'Home',//template
        welcomeMessage: 'Hello, welcome to my webpage!!'
    });
});

//rendereo about page
app.get('/about', (req,res)=>{ 
    res.render('about.hbs',{
        pageTitle: 'About pages',
    });
});
//rendereo menu page
app.get('/about', (req,res)=>{ 
    res.render('menu.hbs',{
        pageTitle: 'Menu',
    });
});

//seteo el puerto
app.listen(port, ()=>{ 
    console.log(`Server is running on port: ${port}`);
});
