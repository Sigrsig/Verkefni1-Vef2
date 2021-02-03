/*
Átti í vandræðum með að fá json gögnin til að lesast. Reyndi tvær aðferðir, ein úr heimadæmunum (videos.js) og hin úr Verkefni 1 sýnilausninni frá því í fyrra (vids.js). Einhverra hluta vegna fæ ég áfram alltaf villur þegar ég reyni að importa inná index.js (náði hinsvegar að lesa json skjalið þegar videos.js var keyrt eitt og sér)

Setti upp eins mikið og ég gat af síðunni, útlit, virkni, error síður, osfr. 
Hægt er að skoða sample myndbandsvef með því að smella á "skoða videovef" á forsíðunni.
*/ 

import express from 'express';

//import test á vids.js:
//import * as textdata from './vids.js';

const app = express();

app.locals.importantize = str => `${str}!`;

app.set('views', 'src');
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Forsíða
app.get('/', (req, res) => {
    res.render('front', { title: 'Forsíða' });
  
});

// /video
app.get('/video', (req, res) => {
  
  res.render('video', { title: 'Myndband'});
});




/**
 * Middleware sem sér um 404 villur.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @param {function} next Næsta middleware
 */
function notFoundHandler(req, res, next) { // eslint-disable-line
  const title = '404 - Síða fannst ekki';
  const message = 'Efni finnst ekki';
  res.status(404).render('error', { title, message });
}

/**
 * Middleware sem sér um villumeðhöndlun.
 *
 * @param {object} err Villa sem kom upp
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @param {function} next Næsta middleware
 */
function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err);
  const title = 'Villa kom upp';
  const message = '';
  res.status(500).render('error', { title, message });
}

app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});