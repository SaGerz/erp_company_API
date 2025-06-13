const db = require("../config/db");

const CreateTaskManagement = async (req, res) => {    
    try {
        const {judul, deskripsi, assigned_to, status, deadline} = req.body;
        const created_by = req.user.id;        
        if (!judul || !deskripsi || !status )    
        {
            res.status(403).json({message: 'Semua field wajib diisi!'});
        }

        const insertQuery = 'INSERT INTO tasks (judul, deskripsi, assigned_to, created_by, status, deadline) VALUES (?, ?, ?, ?, ?, ?)';

        await db.query(insertQuery, [judul, deskripsi, assigned_to, created_by, status, deadline]);
        res.status(201).json({message: 'Task berhasil ditambahkan...'});
    } catch (error) {
        res.status(500).json({message: `Gagal menamabahkan task: ${error}`});
    }
}

const UpdateTaskManagement = async (req, res) => {
    try {
        const task_id = req.params.id;
        const {judul, deskripsi, assigned_to, status, deadline} = req.body;

        const existingData = 'SELECT * FROM tasks WHERE id = ?';
        const [existing] = await db.query(existingData, [task_id]);

        if(existing.length === 0)
        {
            res.status(404).json({message: 'Task tidak ditemukan!'});
        }

        const updateQuery = 'UPDATE tasks SET judul = ? , deskripsi = ?, assigned_to = ?, status = ?, deadline = ? WHERE id = ?';
        await db.query(updateQuery, [judul, deskripsi, assigned_to, status, deadline, task_id]);
        res.status(201).json({message: "Task berhasil diupdate..."});
    } catch (error) {
        res.status(500).json({message: `Gagal update data task :${error}`})
    }   
}

const DeleteTaskManagement = async (req, res) => {
    try {
        const task_id = req.params.id;
        const existingData = 'SELECT * FROM tasks WHERE Id = ?';
        const [existing] = await db.query(existingData, [task_id])

        if(existing.length === 0)
        {
            res.status(404).json({message: "Task tidak ditemukan!"})
        }

        const task = existing[0];

        if(task.created_by !== req.user.id)
        {
            res.status(403).json({message: "Akses ditolak! Bukan pembuat task"});
        }

        const deleteQuery = 'DELETE FROM taskS WHERE Id = ?';
        await db.query(deleteQuery, [task_id]);
        res.status(201).json({message: "Data berhasil dihapus..."})

    } catch (error) {
        res.status(500).json({message: `Gagal update data task :${error}`});
    }
}

module.exports = {CreateTaskManagement, UpdateTaskManagement, DeleteTaskManagement}