const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Konfigurasi koneksi MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Sesuaikan dengan password MySQL Anda
    database: 'db_mhs'
});

// Koneksi ke database
db.connect(err => {
    if (err) {
        console.error('Koneksi ke database gagal:', err);
    } else {
        console.log('Berhasil terhubung ke database MySQL.');
    }
});

// Middleware untuk melayani file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route untuk root path "/"
app.get('/', (req, res) => {
    // Kirim file index.html dari folder public
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint CRUD
// 1. Mendapatkan semua data mahasiswa
app.get('/api/mahasiswa', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// 2. Menambahkan data mahasiswa
app.post('/api/mahasiswa', (req, res) => {
    const {
        nama,
        nim,
        email,
        tanggal_lahir,
        jenis_kelamin,
        jurusan,
        semester,
        alamat,
        no_hp,
        foto,
        status_aktif
    } = req.body;

    const query = `INSERT INTO mahasiswa 
        (nama, nim, email, tanggal_lahir, jenis_kelamin, jurusan, semester, alamat, no_hp, foto, status_aktif) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [
        nama, nim, email, tanggal_lahir, jenis_kelamin, jurusan, semester, alamat, no_hp, foto, status_aktif
    ], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Gagal menambahkan data mahasiswa.', detail: err });
        } else {
            res.status(201).json({ message: 'Data mahasiswa berhasil ditambahkan.', id: result.insertId });
        }
    });
});

// 3. Mengupdate data mahasiswa berdasarkan ID
app.put('/api/mahasiswa/:id', (req, res) => {
    const { id } = req.params;
    const {
        nama,
        nim,
        email,
        tanggal_lahir,
        jenis_kelamin,
        jurusan,
        semester,
        alamat,
        no_hp,
        foto,
        status_aktif
    } = req.body;

    const query = `UPDATE mahasiswa SET 
        nama = ?, nim = ?, email = ?, tanggal_lahir = ?, jenis_kelamin = ?, jurusan = ?, semester = ?, 
        alamat = ?, no_hp = ?, foto = ?, status_aktif = ? WHERE id = ?`;

    db.query(query, [
        nama, nim, email, tanggal_lahir, jenis_kelamin, jurusan, semester, alamat, no_hp, foto, status_aktif, id
    ], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Gagal mengupdate data mahasiswa.', detail: err });
        } else {
            res.json({ message: 'Data mahasiswa berhasil diperbarui.' });
        }
    });
});

// 4. Menghapus data mahasiswa
app.delete('/api/mahasiswa/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM mahasiswa WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
