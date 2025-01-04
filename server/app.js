const fs = require("fs");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const mysql = require("mysql2");

const app = express();

// Use built-in middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Enable CORS
app.use(cors());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename
  },
});

const upload = multer({ storage: storage });

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
  const createPhotos = `CREATE TABLE IF NOT EXISTS photos (
    photo_id INT AUTO_INCREMENT,
    photo_url VARCHAR(255) NOT NULL,
    PRIMARY KEY (photo_id)
  )`;

  const createDescriptions = `CREATE TABLE IF NOT EXISTS descriptions (
    description_id INT AUTO_INCREMENT,
    photo_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (description_id),
    FOREIGN KEY (photo_id) REFERENCES photos(photo_id)
  )`;

  const createCategories = `CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (category_id)
  )`;

  const createPhotoCategories = `CREATE TABLE IF NOT EXISTS photo_categories (
    photo_id INT,
    category_id INT,
    PRIMARY KEY (photo_id, category_id),
    FOREIGN KEY (photo_id) REFERENCES photos(photo_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
  )`;

  const createTestimonials = `CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  img_url VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  text TEXT NOT NULL
);
`;

  connection.query(createPhotos, (err) => {
    if (err) console.log(err);
    else console.log("Photos table created successfully");
  });

  connection.query(createDescriptions, (err) => {
    if (err) console.log(err);
    else console.log("Descriptions table created successfully");
  });

  connection.query(createCategories, (err) => {
    if (err) console.log(err);
    else console.log("Categories table created successfully");
  });

  connection.query(createPhotoCategories, (err) => {
    if (err) console.log(err);
    else console.log("Photo Categories table created successfully");
  });
  connection.query(createTestimonials, (err) => {
    if (err) console.log(err);
    else console.log("Categories table created successfully");
  });

  res.end("Tables are created");
  console.log("Tables are created");
});
// Route to upload images
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const imageUrl = `http://localhost:5555/uploads/${req.file.filename}`;

  // Save imageUrl and other details to the database
  const { photoTitle, briefDescription, categoryName } = req.body;

  // Insert into the photos table
  const insertPhotoQuery = `INSERT INTO photos (photo_url) VALUES (?)`;

  connection.query(insertPhotoQuery, [imageUrl], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error inserting photo URL");
    }
    const photoId = results.insertId;

    // Insert into the descriptions table
    const insertDescriptionQuery = `INSERT INTO descriptions (photo_id, title, description) VALUES (?, ?, ?)`;

    connection.query(
      insertDescriptionQuery,
      [photoId, photoTitle, briefDescription],
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error inserting description");
        }

        // Insert or find category
        const findCategoryQuery = `SELECT category_id FROM categories WHERE category_name = ?`;

        connection.query(findCategoryQuery, [categoryName], (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Error finding category");
          }
          if (results.length > 0) {
            const categoryId = results[0].category_id;

            // Insert into photo_categories table
            const insertPhotoCategoryQuery = `INSERT INTO photo_categories (photo_id, category_id) VALUES (?, ?)`;

            connection.query(
              insertPhotoCategoryQuery,
              [photoId, categoryId],
              (err) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(500)
                    .send("Error linking photo and category");
                }
                console.log("Data inserted successfully");
                return res.status(200).send("Data inserted successfully");
              }
            );
          } else {
            // Category doesn't exist, insert it
            const insertCategoryQuery = `INSERT INTO categories (category_name) VALUES (?)`;

            connection.query(
              insertCategoryQuery,
              [categoryName],
              (err, results) => {
                if (err) {
                  console.log(err);
                  return res.status(500).send("Error inserting category");
                }
                const categoryId = results.insertId;

                // Insert into photo_categories table
                const insertPhotoCategoryQuery = `INSERT INTO photo_categories (photo_id, category_id) VALUES (?, ?)`;

                connection.query(
                  insertPhotoCategoryQuery,
                  [photoId, categoryId],
                  (err) => {
                    if (err) {
                      console.log(err);
                      return res
                        .status(500)
                        .send("Error linking photo and category");
                    }
                    console.log("Data inserted successfully");
                    return res.status(200).send("Data inserted successfully");
                  }
                );
              }
            );
          }
        });
      }
    );
  });
});

app.get("/photos", (req, res) => {
  const selectQuery = `
        SELECT
            photos.photo_url,
            descriptions.title,
            descriptions.description,
            categories.category_name
        FROM
            photos
        JOIN
            descriptions ON photos.photo_id = descriptions.photo_id
        JOIN
            photo_categories ON photos.photo_id = photo_categories.photo_id
        JOIN
            categories ON photo_categories.category_id = categories.category_id;
    `;
  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching photos");
    }
    res.json(results);
  });
});

// Route to add testimonials
app.post("/testimonial", upload.single("image"), (req, res) => {
  const { name, position, text } = req.body;
  const img_url = req.file
    ? `http://localhost:5555/uploads/${req.file.filename}`
    : null;

  const sql = `INSERT INTO testimonials (name, position, text, img_url) VALUES (?, ?, ?, ?)`;
  const values = [name, position, text, img_url];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error adding testimonial");
    }
    res.send("Testimonial added successfully");
  });
});

app.delete("/testimonials/name/:name", (req, res) => {
  const name = req.params.name;

  const deleteTestimonialQuery = `DELETE FROM testimonials WHERE name = ?`;

  connection.query(deleteTestimonialQuery, [name], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting testimonial");
    } else {
      res.send("Testimonial deleted successfully");
    }
  });
});

// Route to get testimonials
app.get("/testimonials", (req, res) => {
  const selectTestimonialsQuery = `SELECT * FROM testimonials`;

  connection.query(selectTestimonialsQuery, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching testimonials");
    } else {
      console.log("Fetched testimonials:", results);
      res.json(results);
    }
  });
});

// Route to delete a photo by title
app.delete("/photos/title/:title", (req, res) => {
  const photoTitle = req.params.title;

  // Find the photo ID based on the title
  const findPhotoIdQuery = `
    SELECT photo_id 
    FROM descriptions 
    WHERE title = ?
  `;

  connection.query(findPhotoIdQuery, [photoTitle], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error finding photo ID");
    }

    if (results.length === 0) {
      return res.status(404).send("Photo not found");
    }

    const photoId = results[0].photo_id;

    // Delete from the photo_categories table
    const deletePhotoCategoriesQuery = `DELETE FROM photo_categories WHERE photo_id = ?`;

    connection.query(deletePhotoCategoriesQuery, [photoId], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error deleting from photo_categories");
      }

      // Delete from the descriptions table
      const deleteDescriptionsQuery = `DELETE FROM descriptions WHERE photo_id = ?`;

      connection.query(deleteDescriptionsQuery, [photoId], (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error deleting from descriptions");
        }

        // Delete from the photos table
        const deletePhotosQuery = `DELETE FROM photos WHERE photo_id = ?`;

        connection.query(deletePhotosQuery, [photoId], (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Error deleting from photos");
          }

          console.log("Photo and related data deleted successfully");
          res.status(200).send("Photo and related data deleted successfully");
        });
      });
    });
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(5555, () =>
  console.log("Listen and running on http://localhost:5555")
);
