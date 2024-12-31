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
  let createPhotos = `CREATE TABLE IF NOT EXISTS photos (
    photo_id INT AUTO_INCREMENT,
    photo_url VARCHAR(255) NOT NULL,
    PRIMARY KEY (photo_id)
  )`;

  let createDescriptions = `CREATE TABLE IF NOT EXISTS descriptions (
    description_id INT AUTO_INCREMENT,
    photo_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (description_id),
    FOREIGN KEY (photo_id) REFERENCES photos(photo_id)
  )`;

  let createCategories = `CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (category_id)
  )`;

  let createPhotoCategories = `CREATE TABLE IF NOT EXISTS photo_categories (
    photo_id INT,
    category_id INT,
    PRIMARY KEY (photo_id, category_id),
    FOREIGN KEY (photo_id) REFERENCES photos(photo_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
  )`;

  connection.query(createPhotos, (err, results, fields) => {
    if (err) console.log(err);
    else console.log("Photos table created successfully");
  });

  connection.query(createDescriptions, (err, results, fields) => {
    if (err) console.log(err);
    else console.log("Descriptions table created successfully");
  });

  connection.query(createCategories, (err, results, fields) => {
    if (err) console.log(err);
    else console.log("Categories table created successfully");
  });

  connection.query(createPhotoCategories, (err, results, fields) => {
    if (err) console.log(err);
    else console.log("Photo Categories table created successfully");
  });

  res.end("Tables are created");
  console.log("Tables are created");
});

app.post("/addphotos", (req, res) => {
  console.log(req.body);
  let imgPath = req.body.imgPath;
  let photoTitle = req.body.photoTitle;
  let briefDescription = req.body.briefDescription;
  let categoryName = req.body.categoryName;

  // Insert into the photos table
  let insertPhotoQuery = `INSERT INTO photos (photo_url) VALUES (?)`;

  connection.query(insertPhotoQuery, [imgPath], (err, results, fields) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error inserting photo URL");
    } else {
      let photoId = results.insertId;

      // Insert into the descriptions table
      let insertDescriptionQuery = `INSERT INTO descriptions (photo_id, title, description) VALUES (?, ?, ?)`;

      connection.query(
        insertDescriptionQuery,
        [photoId, photoTitle, briefDescription],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error inserting description");
          } else {
            console.log("Description inserted successfully");

            // Insert or find category
            let findCategoryQuery = `SELECT category_id FROM categories WHERE category_name = ?`;

            connection.query(
              findCategoryQuery,
              [categoryName],
              (err, results, fields) => {
                if (err) {
                  console.log(err);
                  res.status(500).send("Error finding category");
                } else if (results.length > 0) {
                  let categoryId = results[0].category_id;

                  // Insert into photo_categories table
                  let insertPhotoCategoryQuery = `INSERT INTO photo_categories (photo_id, category_id) VALUES (?, ?)`;

                  connection.query(
                    insertPhotoCategoryQuery,
                    [photoId, categoryId],
                    (err, results, fields) => {
                      if (err) {
                        console.log(err);
                        res
                          .status(500)
                          .send("Error linking photo and category");
                      } else {
                        console.log("Data inserted successfully");
                        res.status(200).send("Data inserted successfully");
                      }
                    }
                  );
                } else {
                  // Category doesn't exist, insert it
                  let insertCategoryQuery = `INSERT INTO categories (category_name) VALUES (?)`;

                  connection.query(
                    insertCategoryQuery,
                    [categoryName],
                    (err, results, fields) => {
                      if (err) {
                        console.log(err);
                        res.status(500).send("Error inserting category");
                      } else {
                        let categoryId = results.insertId;

                        // Insert into photo_categories table
                        let insertPhotoCategoryQuery = `INSERT INTO photo_categories (photo_id, category_id) VALUES (?, ?)`;

                        connection.query(
                          insertPhotoCategoryQuery,
                          [photoId, categoryId],
                          (err, results, fields) => {
                            if (err) {
                              console.log(err);
                              res
                                .status(500)
                                .send("Error linking photo and category");
                            } else {
                              console.log("Data inserted successfully");
                              res
                                .status(200)
                                .send("Data inserted successfully");
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
});

app.get("/photos", (req, res) => {
  let selectPhotosQuery = `
    SELECT 
      p.photo_id, 
      p.photo_url, 
      d.title, 
      d.description, 
      c.category_name
    FROM 
      photos p
    JOIN 
      descriptions d ON p.photo_id = d.photo_id
    JOIN 
      photo_categories pc ON p.photo_id = pc.photo_id
    JOIN 
      categories c ON pc.category_id = c.category_id
  `;

  connection.query(selectPhotosQuery, (err, results, fields) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching data");
    } else {
      console.log("Fetched data:", results);
      res.json(results);
    }
  });
});

app.listen(5555, () =>
  console.log("Listen and running on http://localhost:5555")
);
