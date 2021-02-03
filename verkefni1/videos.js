import { readFile } from 'fs/promises';
import express from 'express';

export const router = express.Router();

async function read(req, res) {
  let data = '';
  try {
    data = await readFile('./videos.json');
  } catch (e) {
    console.error('error', e);
    return res.status(500).send('Villa');
  }
  return res.type('txt').send(data);
}

/**
 * Wrap an async function with error handling
 * @params {function} fn Function to wrap
 * @returns {Promise} Promise with error handling
 */
function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

// Grípum villur og erum örugg
router.get('/', catchErrors(read));

// Ónei! Villur munu krassa forritinu okkar
router.get('/unsafe', read);




module.exports = router;

/*const hostname = '127.0.0.1';
const port = 3000;

router.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); */
