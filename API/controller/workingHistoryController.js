const db = require('../config/db.js');

const CreateWorkingHistory = async (req, res) => {
    try {
        const user_id = req.user.id;
        const {title, deskripsi, jam_mulai, jam_selesai, status} = req.body;
        const tanggal = new Date().toISOString().split('T')[0];
    
        if(!title || !deskripsi || !jam_mulai || !jam_selesai || !tanggal)
        {
            res.status(401).json({message: "Data tidak boleh kosong..."});
        }
    
        const insertQuery = 'INSERT INTO working_history (user_id, title, deskripsi, jam_mulai, jam_selesai, tanggal, status) VALUES (?, ? ,?, ?, ? , ?, ?)';
    
        await db.query(insertQuery, [user_id, title, deskripsi, jam_mulai, jam_selesai, tanggal, status]);
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
    try {
        const workingTask_id = req.params.id;
        const user_id = req.user.id;
        const {title, deskripsi, jam_mulai, jam_selesai, status} = req.body;
    
        const checkExistData = 'SELECT * FROM working_history WHERE id = ? AND user_id = ?';
        const [existingData] = await db.query(checkExistData, [workingTask_id, user_id]);
    
        if(existingData.length === 0)
        {
            res.status(404).json({message: 'Task tidak ditemukan!'});
        }
        
        const updateQuery = 'UPDATE working_history SET title = ? , deskripsi = ?, jam_mulai = ?, jam_selesai = ?, status = ? WHERE id = ?';
        await db.query(updateQuery, [title, deskripsi, jam_mulai, jam_selesai, status, workingTask_id]);
        res.status(201).json({message: "Task berhasil diupdate..."});
    } catch (error) {
        res.status(500).json({message: `Gagal update data task :${error}`})
    }

}
const DeleteWorkingHistory = async (req, res) => {
    try {
        const workingTask_id = req.params.id;
        const user_id = req.user.id;

        const checkExistData = 'SELECT * FROM working_history WHERE id = ? AND user_id = ?';
        const [existingData] = await db.query(checkExistData, [workingTask_id, user_id]);

        if(existingData.length === 0)
        {
            res.status(404).json({message: "Task tidak ditemukan!"})
        }

        const deleteQuery = 'DELETE FROM working_history WHERE id = ? AND user_id = ?';
        await db.query(deleteQuery, [workingTask_id, user_id]);
        res.status(201).json({message: "Data berhasil dihapus..."})
    
    } catch (error) {
        res.status(500).json({message: `Gagal update data task :${error}`});
    }
}

module.exports = {CreateWorkingHistory, GetWorkingHistory, UpdateWorkingHistory, DeleteWorkingHistory}