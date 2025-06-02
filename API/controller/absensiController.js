const db = require('../config/db');

const absenMasuk = async (req, res) => {
    const user_id = req.user.id;
    const tanggalHariIni = new Date().toISOString().slice(0, 10); // format : YYYY-MM-DD
    const jamMasuk = new Date().toTimeString().split(' ')[0]; // format : HH:MM:SS

    try {
        const existingQuery = 'SELECT * FROM absensi WHERE user_id = ? AND tanggal = ?';
        const [existing] = await db.query(existingQuery, [user_id, tanggalHariIni]); 

        if(existing.length > 0)
        {
            res.status(400).json({message: "Kamu sudah melakukan Absensi hari ini"});
        }

        const insertQuery = `INSERT INTO absensi (user_id, tanggal, jam_masuk, keterangan) VALUES (?, ?, ?, ?)`;

        await db.query(insertQuery, [user_id, tanggalHariIni, jamMasuk, 'Hadir']);
        res.status(201).json({message: `Absen Masuk berhasil direkam`})

    } catch (error) {
        res.status(500).json({message: `Gagal absen masuk ${error}`});
    }
}

module.exports = {absenMasuk};