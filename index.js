// Gerekli modüller uygualamaya import edildi
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();
const PORT = process.env.PORT || 8080
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const product = require("./api/product")

app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));


const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Express API",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Hakan Ünal",
                url: "https://hakanunal.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "https://pdf-generator-pi.vercel.app",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.get(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);



app.get("/", async (req, res) => {
    res.status(200);

    res.json({
        message: "Success get data",
        data: product.getData()
    })
    res.end()
})



app.post('/', (req, res) => {
    const formText = req.body.text;
    doc.fontSize(27)
        .text('PDF file title', 100, 100);

    doc.pipe(fs.createWriteStream('example.pdf'));

    doc.addPage()
        .fontSize(15)
        .text(formText, 100, 100);
    doc.end();




    res.redirect("/");
});

app.all("*", (req, res) => res.status(404))



app.listen(3000, () => {
    console.log('Server listening port 3000');
});



module.exports = app