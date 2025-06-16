const db = require('../config/db.js');

const CreateWorkingHistory = async (req, res) => {
    try {
        const user_id = req.user.id;
        const {title, deskripsi, jam_mulai, jam_selesai} = req.body;
        const tanggal = new Date().toISOString().split('T')[0];
    
        if(!title || !deskripsi || !jam_mulai || !jam_selesai || !tanggal)
        {
            res.status(401).json({message: "Data tidak boleh kosong..."});
        }
    
        const insertQuery = 'INSERT INTO working_history (user_id, title, deskripsi, jam_mulai, jam_selesai, tanggal) VALUES (?, ? ,?, ?, ? , ?)';
    
        await db.query(insertQuery, [user_id, title, deskripsi, jam_mulai, jam_selesai, tanggal]);
        res.status(200).json({message: "Data berhasil ditambahkan..."})
        
    } catch (error) {
        res.status(500).json({message: `Gagal menambahkan data ${error}`});
    }
}
const GetWorkingHistory = async (req, res) => {
    try {
        const user_id = req.user.id;
        const query = 'SELECT * FROM working_history WHERE user_id = ?';
        const [existData] = await db.query(query, [user_id]);

        res.status(200).json({
            message: "Berhasil mengambil data working history...",
            data: existData
        })

    } catch (error) {
        res.status(500).json({message: `Gagal mengambil data :${error}`});
    }
}
const UpdateWorkingHistory = async (req, res) => {

}
const DeleteWorkingHistory = async (req, res) => {

}

module.exports = {CreateWorkingHistory, GetWorkingHistory, UpdateWorkingHistory, DeleteWorkingHistory}