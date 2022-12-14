const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');

module.exports = (app) => {

 
     //API Routes
        app.get('/api/notes', (req, res) => {
            res.sendFile(path.join(__dirname, '../db/db.json'));
          });
        
          app.post('/api/notes', (req, res) => {
            let db = fs.readFileSync('db/db.json');
            db = JSON.parse(db);
            res.json(db);        
            let newNote = {
              title: req.body.title,
              text: req.body.text,         
              id: uniqid(),
            };
            db.push(newNote);
            fs.writeFileSync('db/db.json', JSON.stringify(db));        
          });

          app.delete('/api/notes/:id', (req, res) => {         
            let db = JSON.parse(fs.readFileSync('db/db.json'))           
            let deleteNote = db.filter(item => item.id !== req.params.id);       
            fs.writeFileSync('db/db.json', JSON.stringify(deleteNote));
            res.json(deleteNote);
            
          })   
     //HTML Routes
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });     
}