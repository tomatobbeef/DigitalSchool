const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const upload = multer();

// 添加 CORS 头部
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源访问
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// 处理上传的数据库文件
app.post('/upload', upload.single('database'), (req, res) => {
    const databaseFile = req.file;
    if (!databaseFile) {
        return res.status(400).send('No database file uploaded.');
    }

    // 将上传的数据库文件保存为 mydatabase.db或者覆盖已有的文件
    fs.writeFile('mydatabase.db', databaseFile.buffer, (err) => {
        if (err) {
            console.error('Error saving database file:', err);
            return res.status(500).send('Error saving database file.');
        }
        console.log('Database file saved successfully.');
        res.status(200).send('Database file saved successfully.');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
