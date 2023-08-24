// Gerekli modüller uygualamaya import edildi
const express = require('express');
const expressApp = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();

// Görünüm engine olarak pug kullanacağımız için bunu uygulamaya aşağıdaki kod bloğuyla aktardık
expressApp.set('view engine', 'pug');
// Pug dosyalarının yer alacağı views klasörünün localdeki views klasörü olduğunu tanımladık
expressApp.set('views', 'views');

expressApp.use(bodyParser.urlencoded({ extended: false }));

// URL  path'i / olduğunda ve client tarafında gerçekleşen eylem methodu get olduğunda pug
// bizim için form.pug dosyasını response cevabı olarak gösterir
expressApp.get('/', (req, res) => {
    res.render('form');
});

// URL  path'i / olduğunda ve client tarafında gerçekleşen eylem methodu post olduğunda requestin
// üzeridne yer alan metnin alınması lazım bu yüzden uygulamaya import ettiğimiz bodyparser modülü
// ile sayfa üzerinden post edilen bilginin içeriğine ulaşabiliyoruz. Ulaştığımız bilgiyi formText
// değişkeni içerisine attık


expressApp.post('/', (req, res) => {
    const formText = req.body.text;
    doc.fontSize(27)
        .text('PDF file', 100, 100);

    doc.pipe(fs.createWriteStream('example.pdf'));

    doc.addPage()
        .fontSize(15)
        .text(formText, 100, 100);
    doc.end();




    // Yukarıdaki işlemler bittikten sonra response olarak client'ı ana dizine yönlendir
    res.redirect("/");
});

// Server 3000 portu üzerinden açıldı
expressApp.listen(3000, () => {
    console.log('Server listening port 3000');
});