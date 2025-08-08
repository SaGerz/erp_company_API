const db = require('../config/db.js');

const GetAssignedTask = async (req, res) => {
    try {
        const user_id = req.user.id;
        const query = `
            SELECT t.id, t.judul, t.deskripsi, t.status, t.deadline, t.attachment,
                   u.name AS assigned_by
            FROM tasks t
            LEFT JOIN users u ON t.created_by = u.id
            WHERE t.assigned_to = ?
            ORDER BY t.deadline ASC
        `;
        const [task] = await db.query(query, [user_id]);

        res.status(200).json({
            message: "Berhasil mengambil daftar tugas",
            data: task
        })
    } catch (error) {
        res.status(500).json({message: `Gagal mengambil data :${error}`});
    }
}

// const UpdateStatusAssignedTask = async (req, res) => {
//     try {
//         const user_id = req.user.id;
//         const task_id = req.params.id;
//         const { status } = req.body;
    
//         const allowedStatus = ['pending', 'in_progress', 'done'];

//         const toLowerStatus = status.toLowerCase()
//         if(!allowedStatus.includes(toLowerStatus))
//         {
//             res.status(400).json({message: "Status tidak valid..."});
//         }
    
//         console.log({task_id: task_id, user_id: user_id});
//         const checkQuery = 'SELECT * FROM tasks WHERE id = ? AND assigned_to = ?';
//         const [existingData] = await db.query(checkQuery, [task_id, user_id]);

//         if(existingData.length === 0)
//         {
//             return res.status(404).json({ message: 'Tugas tidak ditemukan atau bukan milik Anda' });
//         }

//         const updateQuery = 'UPDATE tasks SET status = ? WHERE id = ?';
//         await db.query(updateQuery, [status, task_id]);
//         res.status(200).json({message: "Status berhasil diperbarui..."});
//     } catch (error) {
//         res.status(500).json({ message: 'Gagal memperbarui status tugas', error: error.message });
//     }
// }

const UpdateStatusAssignedTask = async (req, res) => {
  try {
    const user_id = req.user.id;
    const task_id = req.params.id;
    const { status } = req.body;

    const allowedStatus = ["pending", "in_progress", "done"];
    if (!allowedStatus.includes(status.toLowerCase())) {
      return res.status(400).json({ message: "Status tidak valid..." });
    }

    const [existingData] = await db.query(
      "SELECT * FROM tasks WHERE id = ? AND assigned_to = ?",
      [task_id, user_id]
    );

    if (existingData.length === 0) {
      return res
        .status(404)
        .json({ message: "Tugas tidak ditemukan atau bukan milik Anda" });
    }

    let query, params;
    if (req.file) {
      query = "UPDATE tasks SET status = ?, attachment = ? WHERE id = ?";
      params = [status, req.file.filename, task_id];
    } else {
      query = "UPDATE tasks SET status = ? WHERE id = ?";
      params = [status, task_id];
    }

    await db.query(query, params);

    res.status(200).json({ message: "Status berhasil diperbarui..." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal memperbarui status tugas", error: error.message });
  }
};


module.exports = {GetAssignedTask, UpdateStatusAssignedTask}