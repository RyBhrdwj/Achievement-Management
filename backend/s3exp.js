const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const { generateUploadURL, generateDownloadURL } = require('./s3Service'); 

const app = express();
const upload = multer({dest: 'uploads/'});

app.use(express.json());

app.post('/upload', upload.single('image'), async (req, res) => {
  const { mentorName, studentName } = req.body;
  const fileContent = fs.readFileSync(req.file.path);
  const fileName = req.file.originalname;

  try {
    const uploadURL = await generateUploadURL(mentorName, studentName, fileName);
    // res.send({ success: true, url });
    
    // upload files to s3 using pre-signed url
    await axios.put(uploadURL, fileContent,{
      headers:{
        'Content-Type': 'image/png'
      }
    });
    res.send({success: true, message: 'File uploaded Succesfully'});
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  } finally{
    fs.unlinkSync(req.file.path);
  }
});

app.get('/image', async (req, res) => {
  const { mentorName, studentName, fileName } = req.query;

  try {
    const downloadURL = await generateDownloadURL(mentorName, studentName, fileName);
    // res.send({ success: true, url });
    // url aane ke baad idhar hi download
    console.log(downloadURL)

    const response = await axios.get(downloadURL, {responseType: 'arraybuffer'});

    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
    
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

app.listen(4000, () => {
  console.log('Server started on http://localhost:4000');
});
