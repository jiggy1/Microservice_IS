const express =  require('express');
const morgan =  require('morgan');
const impotSalaire = require('./functions/impotSalaire');


const app = express();

const PORT = 8001;

// log request
app.use(morgan('tiny'));

const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


// parse request 
app.use(express.urlencoded({extended: true}));



app.get('/api/microservice-is/:AS_ID', (req, res) => {
     MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Microservice_is");
        const AS_ID = parseInt(req.params.AS_ID);
        dbo.collection("assures").findOne({
            AS_ID: AS_ID
        },
        
        function(err, result) {
            if (err) throw err;

            if (result) {
                let {AS_NOM, MONTANT_BRUT, AS_ID} = result;
                let montant_impot = impotSalaire(MONTANT_BRUT);
                res.json({
                    'status': 200,
                    'result': {
                        'AS_ID': AS_ID,
                        'nom': AS_NOM,
                        'montant brut': MONTANT_BRUT,
                        'montant impot': montant_impot
                    }
                })
            } else {
                res.json({
                    'status': 404,
                    'result': null
                })
            }
            console.log(typeof AS_ID)
            db.close();
        });
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running http://localhost:${PORT}`)
})
