import React, { Fragment, useState } from 'react'

export default function InputTodo() {

    const [description, setDescription] = useState("hello")

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch("https://tableaucrudform.herokuapp.com/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            window.location = '/';
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <div className='container'>
                <h1 className='text-center mt-5'>Todo List</h1>
                <form className='d-flex mt-5' onSubmit={onSubmitForm}>
                    <input type="text" className='form-control' value={description} onChange={e => setDescription(e.target.value)} />
                    <button className='btn btn-success'>Add</button>
                </form>
            </div>
        </Fragment>
    )
}
