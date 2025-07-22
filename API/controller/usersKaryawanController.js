const db = require('../config/db');

const getAllKaryawan = async (req, res) => {
   try {
    const query = 'SELECT * FROM users WHERE role_id = 3 ORDER BY name ASC';

    const [karyawan] = await db.query(query);
    res.status(200).json({
        message: "Data karyawan berhasil ditemukan",
        data: karyawan
    });
   } catch (err)
   {
    res.status(500).json({
        message: `Gagal mendapatkan data karyawan : ${err}`
    });
   } 
}

module.exports = {getAllKaryawan}