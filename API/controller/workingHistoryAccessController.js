const db = require('../config/db');

const GetWorkingHistoryByUserId = async (req, res) => { 
    try {
        const {id} = req.params;
        const {toDate} = req.query;
        
        let query = 'SELECT * FROM working_history WHERE user_id = ?';
        let params = [id]

        if(toDate)
        {
            query += ' AND tanggal = ?';
            params.push(toDate);
        }

        const [result] = await db.query(query, params);
        res.status(200).json({
            message: "Berhasil Mengambil Data Working History berdasarkan Role dan User_id",
            data: result
        })
    } catch (error) {
        res.status(500).json({ message: `Gagal mengambil data: ${error}` });
    }
}

module.exports = {GetWorkingHistoryByUserId}