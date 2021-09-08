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
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/:id', (req, res) => {
     MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Microservice_is");
        const id = parseInt(req.params.id);
        dbo.collection("assures").findOne({
            id: id
        },
        function(err, result) {
            if (err) throw err;

            if (result) {
                let {nom, montant_brut, id} = result;
                let montant_impot = impotSalaire(montant_brut);
                res.json({
                    'status': 200,
                    'result': {
                        'id': id,
                        'nom': nom,
                        'montant brut': montant_brut,
                        'montant impot': montant_impot
                    }
                })
            } else {
                res.json({
                    'status': 404,
                    'result': null
                })
            }
            
            db.close();
        });
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running http://localhost:${PORT}`)
})
