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
//POST
router.post('/', (req, res) => {
    let newItem = req.body;
    console.log(`Adding Item`, newItem);
  
    let queryText = `INSERT INTO "shopping_list" ("name","quantity","unit") 
                     VALUES ($1, $2, $3);`;
    pool
      .query(queryText, [newItem.name, newItem.quantity, newItem.unit])
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(`Error adding new item`, error);
        res.sendStatus(500);
      });
  });
module.exports = router;