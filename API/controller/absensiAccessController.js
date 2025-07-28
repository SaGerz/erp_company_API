const db = require('../config/db');
const ExcelJS = require('exceljs');

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

const exportAbsensiAll = async (req, res) => {
    try {
    // Query join users dan absensi
    const query = `
      SELECT 
        a.id AS absensi_id,
        u.name AS nama,
        a.tanggal,
        a.jam_masuk,
        a.jam_keluar,
        a.keterangan
      FROM absensi a
      JOIN users u ON u.id = a.user_id
      ORDER BY a.tanggal DESC
    `;
    const [rows] = await db.query(query);

    if (!rows.length) {
      return res.status(404).json({ message: "Data absensi tidak ditemukan" });
    }

    // Buat workbook Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data Absensi');

    // Header kolom
    worksheet.columns = [
      { header: 'Nama', key: 'nama', width: 25 },
      { header: 'Tanggal', key: 'tanggal', width: 15 },
      { header: 'Jam Masuk', key: 'jam_masuk', width: 15 },
      { header: 'Jam Keluar', key: 'jam_keluar', width: 15 },
      { header: 'Keterangan', key: 'keterangan', width: 20 },
    ];

    // Tambahkan data
    rows.forEach(row => {
      worksheet.addRow({
        nama: row.nama,
        // tanggal: row.tanggal?.toISOString?.().Split('T')[0] || row.tanggal,
        tanggal: row.tanggal?.toISOString().split('T')[0] || row.tanggal, // jadi string yyyy-mm-dd
        jam_masuk: row.jam_masuk || '-',
        jam_keluar: row.jam_keluar || '-',
        keterangan: row.keterangan || 'Tidak Hadir',
      });
    });

    // Style header
    worksheet.getRow(1).font = { bold: true };

    // Kirim file Excel
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="absensi_all.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal export absensi" });
  }
}

const exportAbsensiByMonth = async (req, res) => {
  try {
    const { month, year } = req.query;
    console.log(`Month : ${month} & Year : ${year}  API`);

    if (!month || !year) {
      return res.status(400).json({ message: "Month dan Year wajib diisi" });
    }

    const query = `
      SELECT 
        u.name AS nama,
        a.tanggal,
        a.jam_masuk,
        a.jam_keluar,
        a.keterangan
      FROM absensi a
      JOIN users u ON u.id = a.user_id
      WHERE MONTH(a.tanggal) = ? AND YEAR(a.tanggal) = ?
      ORDER BY a.tanggal DESC
    `;
    const [rows] = await db.query(query, [month, year]);
    console.log(rows);

    if (!rows.length) {
      return res.status(404).json({ message: "Data absensi tidak ditemukan untuk bulan tersebut" });
    }

    // Buat workbook Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Absensi Bulanan');

    // Header kolom
    worksheet.columns = [
      { header: 'Nama', key: 'nama', width: 25 },
      { header: 'Tanggal', key: 'tanggal', width: 15, style: { numFmt: 'yyyy-mm-dd' } },
      { header: 'Jam Masuk', key: 'jam_masuk', width: 15 },
      { header: 'Jam Keluar', key: 'jam_keluar', width: 15 },
      { header: 'Keterangan', key: 'keterangan', width: 20 },
    ];

    // Tambahkan data
    rows.forEach(row => {
      worksheet.addRow({
        nama: row.nama,
        tanggal: new Date(row.tanggal), // biar bisa diformat Excel
        jam_masuk: row.jam_masuk || '-',
        jam_keluar: row.jam_keluar || '-',
        keterangan: row.keterangan || 'Tidak Hadir',
      });
    });

    // Bold header
    worksheet.getRow(1).font = { bold: true };

    // Kirim file Excel
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=absensi_${year}_${month}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal export absensi bulanan" });
  }
};

module.exports = {getAllAbsensi, exportAbsensiAll, exportAbsensiByMonth};