const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const path = require('path');

//middleware
app.use(cors());
app.use(express.json());



//ROUTES todo//

//create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.promise().query(
            `INSERT INTO comments (start_date, end_date, member_code, client_lei, comments) values 
            ('2021-04-28', '2021-04-28', 'FIM', 'abcdefghij9876543253','${description}')`
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


//ROUTES tiering//
//get all tiering
app.get('/tiering', async (req, res) => {
    try {
        const allTiering = await pool.promise().query(
            `SELECT SUBSTRING(business_date, 1, 10) business_date, client_name, client_lei, client_im, member_im, tiering_concentration, client_on_obs_list, member_code, member_name, comment FROM tiering`
        );
        res.json(allTiering[0]);
    } catch (err) {
        console.error(err.message);
    }
})


//ROUTES obs_list//
//get all obs_list
app.get('/obs_list/:member/:client', async (req, res) => {
    try {
        const { member, client } = req.params;
        const obsList = await pool.promise().query(
            `SELECT * FROM obs_list WHERE member_code = '${member}' and client_lei = '${client}'`
        );
        res.json(obsList[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//create an obs_list
app.post('/obs_list', async (req, res) => {
    try {
        const { obsStartDate, obsEndDate, member, client } = req.body;
        const newTodo = await pool.promise().query(
            `INSERT INTO obs_list (start_date, end_date, member_code, client_lei, client_on_obs_list) values 
            ('${obsStartDate}', '${obsEndDate}', '${member}', '${client}', '1')`
        );
        res.json("Row Added Successfully");
        console.log(req.body)
    } catch (err) {
        console.error(err.message);
    }
})

//update an obs_list
app.put('/obs_list/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { start_date, end_date } = req.body;
        const updateTodo = await pool.promise().query(
            `UPDATE obs_list SET start_date = '${start_date}', end_date = '${end_date}' WHERE id = ${id}`
        );
        res.json("Obs_list Was Updated");
    } catch (err) {
        console.error(err.message);
    }
})

//delete an obs_list
app.delete('/obs_list/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.promise().query(
            `DELETE FROM obs_list WHERE id = ${id}`
        );
        res.json("Obs_list Was Deleted");
    } catch (err) {
        console.error(err.message);
    }
})

//ROUTES comments//
//get all comments
app.get('/comments/:member/:client', async (req, res) => {
    try {
        const { member, client } = req.params;
        const comments = await pool.promise().query(
            `SELECT * FROM comments WHERE member_code = '${member}' and client_lei = '${client}'`
        );
        res.json(comments[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//create a comment
app.post('/comments', async (req, res) => {
    try {
        const { commentsStartDate, commentsEndDate, member, client, newComment } = req.body;
        const newTodo = await pool.promise().query(
            `INSERT INTO comments (start_date, end_date, member_code, client_lei, comment) values 
            ('${commentsStartDate}', '${commentsEndDate}', '${member}', '${client}','${newComment}')`
        );
        res.json("Row Added Successfully");
    } catch (err) {
        console.error(err.message);
    }
})

//update a comment
app.put('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { start_date, end_date, comment } = req.body;
        const updateTodo = await pool.promise().query(
            `UPDATE comments SET start_date = '${start_date}', end_date = '${end_date}', comment = '${comment}' WHERE id = ${id}`
        );
        res.json("Comment Was Updated");
    } catch (err) {
        console.error(err.message);
    }
})

//delete a comment
app.delete('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.promise().query(
            `DELETE FROM comments WHERE id = ${id}`
        );
        res.json("Comment Was Deleted");
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

