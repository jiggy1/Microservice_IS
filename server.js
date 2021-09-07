const express =  require('express');
const morgan =  require('morgan');
const impotSalaire = require('./functions/impotSalaire');


const app = express();


const PORT = 8000

// log request
app.use(morgan('tiny'));



const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


// parse request 
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.get('/:id', (req, res) => {
    
     MongoClient.connect(url, { useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Microservice_is");
        const id = parseInt(req.params.id);
        dbo.collection("assures").findOne({
            id: id
        }, 
        function(err, result) {
            if (err) throw err;
            let assure = result;
            let {nom, montant_brut, id} = assure;
            let montantImpot = impotSalaire(montant_brut);
            res.json({
                'id': id,
                'nom': nom,
                'montant brut': montant_brut,
                'montant impot': montantImpot
            })
            
            db.close();
        });
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running http://localhost:${PORT}`)
})
