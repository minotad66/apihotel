"use strict";

const fs = require("fs");
const hotels = require(__dirname + "/hotels.json");

module.exports = function(app) {
  app.get("/hotels", (req, res, next) => {
    res.sendFile(__dirname + "/hotels.json");
  });

  app.post("/hotels", (req, res, next) => {
    const { body } = req;
    body.id = hotels.length + 1;
    hotels.sort();
    console.log(hotels)
    hotels.find(id => {
      if(id.id === body.id){
        body.id = id.id + 1;
      }
    })
    fs.readFile(__dirname + "/hotels.json", function(error, file) {
      let parsedFile = JSON.parse(file);
      parsedFile = req.body;
      hotels.push(parsedFile);
      let data = JSON.stringify(hotels);
      fs.writeFile(__dirname + "/hotels.json", data, error => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    });
  });

  app.get("/hotels/:id", (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json("Invalid param");
    }
    const post = hotels.find(element => element.id === parseInt(id, 10));
    if (post) {
      return res.status(200).json(post);
    }
    return res.status(404).json("Not found");
  });

  app.delete("/hotels/:id", (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json("Invalid param");
    }
    fs.readFile(__dirname + "/hotels.json", function(error, file) {
      let parsedFile = JSON.parse(file);
      parsedFile = parsedFile.filter(element => element.id !== parseInt(id, 10));
      let data = JSON.stringify(parsedFile);
      const copy = [...hotels];
      fs.writeFile(__dirname + "/hotels.json", data, error => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
      if (copy.length > parsedFile.length) {
        return res.status(200).json(parsedFile);
      }
      return res.status(404).json("Not found");
    });
  });

  app.put("/hotels/:id", (req, res, next) => {
    const { id } = req.params;
    const { autor, body } = req.body;
    if (isNaN(id)) {
      return res.status(400).json("Invalid param");
    }
    fs.readFile(__dirname + "/hotels.json", function(error, file) {
      let parsedFile = JSON.parse(file);
      parsedFile = parsedFile.map(element => {
        if(element.id === parseInt(id, 10)){
          element.autor = autor;
          element.body = body;
          return element;
        }
        else{
          return element;
        }
      });
      console.log(parsedFile);
      let data = JSON.stringify(parsedFile);
      fs.writeFile(__dirname + "/hotels.json", data, error => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
      return res.status(200).json(parsedFile);
    });
  });
};
