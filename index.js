const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();
const PORT = process.env.PORT || 8080
const product = require("./api/product")
const path = require('path')



app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json())
app.use("/public", express.static("uploads"));






app.get("/", async (req, res) => {
    try {

        res.json({
            message: "Success get data",
            data: product.getData()
        }).status(200)
        res.end()
    } catch (error) {

        res.status(404).send(error)
        res.end()

    }

})



app.post('/file', (req, res) => {
    const text = req.body.text;
    const title = req.body.title + ".pdf";

    try {
        doc.fontSize(27)
            .text('PDF file title', 100, 100);

        doc.pipe(fs.createWriteStream('./public/' + title));

        doc.addPage()
            .fontSize(15)
            .text(text, 100, 100);
        doc.end();

        res.sendStatus(200)


        res.end()

    } catch (error) {
        res.status(404).send(error)
        res.end()
    }

});



app.get('/file', (req, res) => {
    try {
        const title = req.body.title;
        const filePath = path.join(__dirname, './public/' + title + '.pdf')
        res.download(filePath);


    } catch (error) {
        res.status(404).send(error)
    }
})

app.get('/files', (req, res) => {
    const folderPath = path.join(__dirname, './public/')

    try {
        fs.readdir(folderPath, (err, files) => {
            res.json({
                data: files
            }).status(200).end()
        })
    } catch (error) {
        res.status(404).send(error)
        res.end();
    }
})



app.all("*", (req, res) => res.status(404).send("page not found"))



app.listen(PORT, () => {
    console.log('Server listening port: ' + PORT);
});



module.exports = app