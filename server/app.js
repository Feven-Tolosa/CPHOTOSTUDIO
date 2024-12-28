const express = require("express");
const app = express();
const mysql = require("mysql2");

// Use built-in middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("up and running..."));

const connection = mysql.createConnection({
  host: "localhost",
  user: "CPhotoStudio",
  password: "TAFNEM@1432",
  database: "cphotostudio",
});

connection.connect((err) => {
  if (err) console.log(err);
  else console.log("connected to MySQL2");
});

app.get("/install", (req, res) => {
  let createProducts = `CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT,
    product_url VARCHAR(255),
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (product_id)
  )`;

  connection.query(createProducts, (err, results, fields) => {
    if (err) console.log(err);
    else console.log("Products table created successfully");
  });

  res.end("Table is created");
  console.log("Table is created");
});

app.post("/addphotos", (req, res) => {
  console.log(req.body);
  let imgPath = req.body.imgPath;
  let photoTitle = req.body.photoTitle;
  let briefDescription = req.body.briefDescription;

  // Insert into the products table
  let insertPhotoQuery = `INSERT INTO products (product_url, product_name, description) VALUES (?, ?, ?)`;

  connection.query(
    insertPhotoQuery,
    [imgPath, photoTitle, briefDescription],
    (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error inserting data");
      } else {
        console.log("Data inserted successfully", results);
        res.status(200).send("Data inserted successfully");
      }
    }
  );
});

app.get("/photos", (req, res) => {
  let selectPhotosQuery = `SELECT * FROM products`;

  connection.query(selectPhotosQuery, (err, results, fields) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching data");
    } else {
      console.log("Fetched data:", results); // Log fetched data
      res.json("Body:");
    }
  });
});

app.listen(5555, () =>
  console.log("Listen and running on http://localhost:5555")
);
