const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const path = require('path');

//middleware
app.use(cors());
app.use(express.json());


//ROUTES//

//create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.promise().query(
            `INSERT INTO todo (description) VALUES('${description}')`
        );
        res.json("Row Added Successfully");
    } catch (err) {
        console.error(err.message);
    }
})

//get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.promise().query(
            `SELECT * FROM todo`
        );
        res.json(allTodos[0]);
    } catch (err) {
        console.error(err.message);
    }
})


//get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.promise().query(
            `SELECT * FROM todo WHERE todo_id = ${id}`
        );
        res.json(todo[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.promise().query(
            `UPDATE todo SET description = '${description}' WHERE todo_id = ${id}`
        );
        res.json("Todo Was Updated");
    } catch (err) {
        console.error(err.message);
    }
})

//delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.promise().query(
            `DELETE FROM todo WHERE todo_id = ${id}`
        );
        res.json("Todo Was Deleted");
    } catch (err) {
        console.error(err.message);
    }
})

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

