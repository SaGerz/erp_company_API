const db = require('../config/db.js');

const GetAssignedTask = async (req, res) => {
    try {
        const user_id = req.user.id;
        const query = 'SELECT * FROM tasks WHERE assigned_to = ? ORDER BY deadline ASC';
        const [task] = await db.query(query, [user_id]);

        res.status(200).json({
            message: "Berhasil mengambil daftar tugas",
            data: task
        })
    } catch (error) {
        res.status(500).json({message: `Gagal mengambil data :${error}`});
    }
}

module.exports = {GetAssignedTask}