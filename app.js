// Gerekli modüller uygualamaya import edildi
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();
const PORT = process.env.PORT || 8080

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));



app.get("/", async (req, res) => {
    res.render('form');

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

app.listen(PORT, () => {
    console.log('Server listening port:' + PORT);
});