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

const getAllUsersByRole = async (req, res) => {
  try {
    const query = `
      SELECT 
        users.id, 
        users.name, 
        users.email, 
        roles.name AS role 
      FROM users 
      JOIN roles ON users.role_id = roles.id
      WHERE role_id = 3
    `;

    const [users] = await db.query(query);

    res.status(200).json({
      message: "Berhasil mengambil data user dengan role",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: `Gagal mengambil data user: ${error}`,
    });
  }
};


module.exports = {getAllKaryawan, getAllUsersByRole}