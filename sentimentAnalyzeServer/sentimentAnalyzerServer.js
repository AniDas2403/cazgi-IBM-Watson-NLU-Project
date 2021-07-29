const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const NaturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return NaturalLanguageUnderstanding;
}

function A_E_Url (url,res)
{
    const NLU = getNLUInstance();
    const param = {
        'url': url,
        'features':{
            'emotion':{
            }
        }
    };
    NLU.analyze(param)
    .then(R =>{
        console.log(JSON.stringify(R, space=2));
        res.send(R.result.emotion.document.emotion);
    })
    .catch(E =>{
        console.log(E)
        res.send(E)
    });
}

function A_S_Url (url,res)
{
    const NLU = getNLUInstance();
    const param = {
        'url': url,
        'features':{
            'sentiment':{
                
            }
        }
    };
    NLU.analyze(param)
    .then(R =>{
        console.log(JSON.stringify(R, space=2));
        res.send(R.result.sentiment.document.label);
    })
    .catch(E =>{
        console.log(E)
        res.send(E)
    });
}

function A_E_Text (text,res)
{
    const NLU = getNLUInstance();
    const param = {
        'html': text,
        'features':{
            'emotion':{
            }
        }
    };
    NLU.analyze(param)
    .then(R =>{
        console.log(JSON.stringify(R, space=2));
        res.send(R.result.emotion.document.emotion);
    })
    .catch(E =>{
        console.log(E)
        res.send(E)
    });
}

function A_S_Text (text,res)
{
    const NLU = getNLUInstance();
    const param = {
        'html': text,
        'features':{
            'sentiment':{
            }
        }
    };
    NLU.analyze(param)
    .then(R =>{
        console.log(JSON.stringify(R, space=2));
        res.send(R.result.sentiment.document.label);
    })
    .catch(E =>{
        console.log(E)
        res.send(E)
    });
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    A_E_Url(req.query.url,res);
});

app.get("/url/sentiment", (req,res) => {
    A_S_Url(req.query.url,res);
});

app.get("/text/emotion", (req,res) => {
    A_E_Text(req.query.text,res);
});

app.get("/text/sentiment", (req,res) => {
    A_S_Text(req.query.text,res);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})