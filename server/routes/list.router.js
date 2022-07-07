const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...
// GET items
router.get('/', (req, res) => {

    const sqlText = `SELECT * FROM "shopping_list"`;
    pool.query(sqlText)
        .then((result) => {
            console.log(result);
        res.send(result.rows);
        })
        .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
        });
});


module.exports = router;