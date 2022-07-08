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

// Removes a task from the database and from displaying on the page

router.delete('/:id', (req, res) => {
  let reqId = req.params.id;
  console.log(`Delete request sent for id ${reqId}`);
  let queryText = 'DELETE FROM "shopping_list" WHERE id = $1;';
  pool.query(queryText, [reqId])
    .then(() => {
      console.log('Task completed and deleted!')
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error deleting with query ${queryText}: ${error}`);
      res.sendStatus(500);
    })
})

router.put('/:id', (req, res) => {
  let itemId = req.params.id;
  let queryText = 'UPDATE "shopping_list" SET "purchased" = True WHERE "id" = $1;';
  
  pool.query(queryText, [itemId])
  .then((dbResponse) => {
    res.send(dbResponse);
  })
  .catch((error) =>{
    console.log(`Error in update in server: ${error}`);
    res.sendStatus(500);
  })
});

router.put('/', (req, res) => {

  let queryText = 'UPDATE "shopping_list" SET "purchased" = False;';
  
  pool.query(queryText)
  .then((dbResponse) => {
    res.send(dbResponse);
  })
  .catch((error) =>{
    console.log(`Error in update in server: ${error}`);
    res.sendStatus(500);
  })
});

module.exports = router;