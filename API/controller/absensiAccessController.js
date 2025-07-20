const db = require('../config/db');

const getAllAbsensi = async (req, res) => {
    try {
        const { date } = req.query; // ambil query param ?date=YYYY-MM-DD

        const query = `
            SELECT 
            u.id AS user_id,
            u.name,
            a.id AS absensi_id,
            COALESCE(a.tanggal, ?) as tanggal,
            a.jam_masuk,
            a.jam_keluar,
            COALESCE(a.keterangan, 'Tidak Hadir') AS keterangan
        FROM users u
        LEFT JOIN absensi a
            ON u.id = a.user_id AND a.tanggal = ?
        ORDER BY u.name ASC;
        `;

        const [absensi] = await db.query(query, [date, date]);

        res.status(200).json({
            message: date 
                ? `Data absensi untuk tanggal ${date} berhasil diambil`
                : "Semua data absensi berhasil diambil",
            data: absensi
        });
    } catch (error) {
        res.status(500).json({ message: `Gagal mengambil data absensi: ${error.message}` });
    }
};


module.exports = {getAllAbsensi};