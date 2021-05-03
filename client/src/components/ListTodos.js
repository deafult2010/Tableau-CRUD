import React, { Fragment, useEffect, useState } from 'react'



export default function ListTodos(props) {

    const [obsList, setObsList] = useState([]);
    const [comments, setComments] = useState([]);


    const [obsStartDate, setObsStartDate] = useState('');
    const [obsEndDate, setObsEndDate] = useState('');

    const [commentsStartDate, setCommentsStartDate] = useState('');
    const [commentsEndDate, setCommentsEndDate] = useState('');
    const [newComment, setNewComment] = useState('');

    const [member, setMember] = useState('');
    const [client, setClient] = useState('');


    //Date formatting functions

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const handleObsStartDateChange = (e, i) => {
        console.log(i)
        console.log(e.target.value);
        const start_date = e.target.value;
        const list = [...obsList];
        console.log(list[i]);

        // it's an array element, not a keyed map/object, 
        // so have to recreate the entire element
        list[i] = { ...list[i], start_date };
        console.log(list[i])
        setObsList(list);
    };

    const handleObsEndDateChange = (e, i) => {
        console.log(i)
        console.log(e.target.value);
        const end_date = e.target.value;
        const list = [...obsList];
        console.log(list[i]);

        // it's an array element, not a keyed map/object, 
        // so have to recreate the entire element
        list[i] = { ...list[i], end_date };
        console.log(list[i])
        setObsList(list);
    };

    const handleCommentStartDateChange = (e, i) => {
        console.log(i)
        console.log(e.target.value);
        const start_date = e.target.value;
        const list = [...comments];
        console.log(list[i]);

        // it's an array element, not a keyed map/object, 
        // so have to recreate the entire element
        list[i] = { ...list[i], start_date };
        console.log(list[i])
        setComments(list);
    };

    const handleCommentEndDateChange = (e, i) => {
        console.log(i)
        console.log(e.target.value);
        const end_date = e.target.value;
        const list = [...comments];
        console.log(list[i]);

        // it's an array element, not a keyed map/object, 
        // so have to recreate the entire element
        list[i] = { ...list[i], end_date };
        console.log(list[i])
        setComments(list);
    };

    const handleCommentCommentChange = (e, i) => {
        console.log(i)
        console.log(e.target.value);
        const comment = e.target.value;
        const list = [...comments];
        console.log(list[i]);

        // it's an array element, not a keyed map/object, 
        // so have to recreate the entire element
        list[i] = { ...list[i], comment };
        console.log(list[i])
        setComments(list);
    };

    // Obs_List functions

    const getObsList = async () => {
        try {
            const response = await fetch(`https://tableaucrudform.herokuapp.com/obs_list/${member}/${client}`)
            // const response = await fetch(`http://localhost:5000/obs_list/${member}/${client}`)
            const jsonData = await response.json();
            const jsonDataFormatted = jsonData.map(obsList => {
                return { id: obsList.id, start_date: formatDate(obsList.start_date), end_date: formatDate(obsList.end_date), member_code: obsList.member_code, client_lei: obsList.client_lei, client_on_obs_list: obsList.client_on_obs_list }
            })
            setObsList(jsonDataFormatted);

        } catch (err) {
            console.error(err.message)
        }
    }

    const onSubmitObsForm = async (e) => {
        e.preventDefault();
        try {
            const body = { obsStartDate, obsEndDate, member, client };
            await fetch("https://tableaucrudform.herokuapp.com/obs_list", {
                // await fetch("http://localhost:5000/obs_list", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            window.location.reload(false);
        } catch (err) {
            console.error(err.message)
        }
    }

    const editObsList = async (i, id) => {
        try {
            const body = obsList[i]
            console.log(body)
            await fetch(`https://tableaucrudform.herokuapp.com/obs_list/${id}`, {
                // await fetch(`http://localhost:5000/obs_list/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            window.location.reload(false);
        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteObsList = async (id) => {
        try {
            await fetch(`https://tableaucrudform.herokuapp.com/obs_list/${id}`, {
                // await fetch(`http://localhost:5000/obs_list/${id}`, {
                method: "DELETE"
            });
            setObsList(obsList.filter(obsList => obsList.id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }


    // Comments functions

    const getComments = async () => {
        try {
            const response = await fetch(`https://tableaucrudform.herokuapp.com/comments/${member}/${client}`)
            // const response = await fetch(`http://localhost:5000/comments/${member}/${client}`)
            const jsonData = await response.json();
            const jsonDataFormatted = jsonData.map(comments => {
                return { id: comments.id, start_date: formatDate(comments.start_date), end_date: formatDate(comments.end_date), member_code: comments.member_code, client_lei: comments.client_lei, comment: comments.comment }
            })
            setComments(jsonDataFormatted);

        } catch (err) {
            console.error(err.message)
        }
    }

    const onSubmitCommentsForm = async (e) => {
        e.preventDefault();
        try {
            const body = { commentsStartDate, commentsEndDate, member, client, newComment };
            await fetch("https://tableaucrudform.herokuapp.com/comments", {
                // await fetch("http://localhost:5000/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            console.log(body);
            window.location.reload(false);
        } catch (err) {
            console.error(err.message)
        }
    }

    const editComments = async (i, id) => {
        try {
            const body = comments[i]
            console.log(body)
            await fetch(`https://tableaucrudform.herokuapp.com/comments/${id}`, {
                // await fetch(`http://localhost:5000/comments/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            window.location.reload(false);
        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteComments = async (id) => {
        try {
            await fetch(`https://tableaucrudform.herokuapp.com/comments/${id}`, {
                // await fetch(`http://localhost:5000/comments/${id}`, {
                method: "DELETE"
            });
            setComments(comments.filter(comments => comments.id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        //'SLM'
        //'abcdefghij9876543259'
        setMember(props.match.params.member)
        setClient(props.match.params.client)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getObsList(member, client);
        getComments(member, client);

        // eslint-disable-next-line
    }, [member, client])

    return (
        <Fragment>
            <div className='container'>
                {/* <form className='d-flex' onSubmit={onSubmitForm}>
                    <table className="table mt-1">
                        <thead>
                            <tr>
                                <th>Client_Name</th>
                                <th>Client LEI</th>
                                <th>Client_IM (USD_mn)</th>
                                <th>Member_IM (USD_mn)</th>
                                <th>Tiering Conc.</th>
                                <th>Client_On Obs_List</th>
                                <th>Member Code</th>
                                <th>Member Name</th>
                                <th>Comments</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tiering.map(tiering => (
                                <tr key={tiering.id}>
                                    <td>{tiering.client_name}</td>
                                    <td>{tiering.client_lei}</td>
                                    <td>{(Math.round(tiering.client_im * 100) / 100000000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td>{(Math.round(tiering.member_im * 100) / 100000000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td>{(Math.round(tiering.tiering_concentration * 100) / 100).toFixed(2)}</td>
                                    <td>{tiering.client_on_obs_list}</td>
                                    <td>{tiering.member_code}</td>
                                    <td>{tiering.member_name}</td>
                                    <td>{tiering.comments}</td>
                                    <td><EditTodo tiering={tiering} /></td>
                                    <td>Edit Tiering</td>
                                    <td><button className='btn btn-danger' onClick={() => deleteTodo(tiering.id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form> */}
                <h1 className='mt-1' style={{ fontSize: '30px' }}>Instructions</h1>
                <p>
                    Hover over the Client you wish to edit on the Dashboard to the left. When the tooltip appears click on the URL action at the bottom. <br />
                    This user interface allows an analyst to add, edit or remove the Observation List attribute over a date range for a given Client of a Member. <br />
                    The analyst may also add, edit or remove Comments over a date range for a given Client of a Member.
                </p>
                <h1 className='mt-5' style={{ fontSize: '30px' }}>Edit Observation List</h1>
                <form className='d-flex' onSubmit={onSubmitObsForm}>
                    <table className="table mt-1" style={{ tableLayout: 'fixed' }}>
                        <thead>
                            <tr style={{ fontSize: '15px' }}>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '110px' }}>Start Date</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '110px' }}>End Date</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '55px' }}>Member Code</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '110px' }}>Client LEI</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '55px' }}>Client_On <br /> Obs_List</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '55px' }}>Add/Edit</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '55px' }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {obsList.map((obsList, i) => (
                                <tr key={obsList.id} style={{ fontSize: '12px' }}>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ minwidth: '110px', padding: '2px', fontSize: '12px' }} type="date" value={obsList.start_date} onChange={e => handleObsStartDateChange(e, i)} /></td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ minwidth: '110px', padding: '2px', fontSize: '12px' }} type="date" value={obsList.end_date} onChange={e => handleObsEndDateChange(e, i)} /></td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}>{obsList.member_code}</td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}>{obsList.client_lei}</td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}>{obsList.client_on_obs_list}</td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><button type="button" className='btn btn-success' style={{ fontSize: '12px' }} onClick={() => editObsList(i, obsList.id)}>Edit</button></td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><button type="button" className='btn btn-danger' style={{ fontSize: '12px' }} onClick={() => deleteObsList(obsList.id)}>Delete</button></td>
                                </tr>
                            ))}
                            <tr style={{ fontSize: '12px' }}>
                                <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ minwidth: '110px', padding: '2px', fontSize: '12px' }} type="date" value={obsStartDate} onChange={e => setObsStartDate(e.target.value)} /></td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ minwidth: '110px', padding: '2px', fontSize: '12px' }} type="date" value={obsEndDate} onChange={e => setObsEndDate(e.target.value)} /></td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}>{member}</td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}>{client}</td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}>1</td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}><button className='btn btn-primary' style={{ fontSize: '12px' }}>Add</button></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </form>



                <h1 className='mt-5' style={{ fontSize: '30px' }}>Edit Comments</h1>
                <form className='d-flex' onSubmit={onSubmitCommentsForm}>
                    <table className="table mt-1">
                        <thead>
                            <tr style={{ fontSize: '15px' }}>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '110px' }}>Start Date</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '110px' }}>End Date</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '55px' }}>Member Code</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '110px' }}>Client LEI</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '130px' }}>Comments</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '55px' }}>Add/Edit</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '55px' }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((comments, i) => (
                                <tr key={comments.id} style={{ fontSize: '12px' }}>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ minwidth: '110px', padding: '2px', fontSize: '12px' }} type="date" value={comments.start_date} onChange={e => handleCommentStartDateChange(e, i)} /></td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ minwidth: '110px', padding: '2px', fontSize: '12px' }} type="date" value={comments.end_date} onChange={e => handleCommentEndDateChange(e, i)} /></td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}>{comments.member_code}</td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}>{comments.client_lei}</td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><textarea className="form-control" style={{ minwWidth: '130px', padding: '2px', fontSize: '12px' }} rows='3' value={comments.comment} onChange={e => handleCommentCommentChange(e, i)} /></td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><button type="button" className='btn btn-success' style={{ fontSize: '12px' }} onClick={() => editComments(i, comments.id)}>Edit</button></td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><button type="button" className='btn btn-danger' style={{ fontSize: '12px' }} onClick={() => deleteComments(comments.id)}>Delete</button></td>
                                </tr>
                            ))}
                            <tr style={{ fontSize: '12px' }}>
                                <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ minwidth: '110px', padding: '2px', fontSize: '12px' }} type="date" value={commentsStartDate} onChange={e => setCommentsStartDate(e.target.value)} /></td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ minwidth: '110px', padding: '2px', fontSize: '12px' }} type="date" value={commentsEndDate} onChange={e => setCommentsEndDate(e.target.value)} /></td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}>{member}</td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}>{client}</td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}><textarea className="form-control" style={{ minWidth: '130px', padding: '2px', fontSize: '12px' }} rows='3' value={newComment} onChange={e => setNewComment(e.target.value)} /></td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}><button className='btn btn-primary' style={{ fontSize: '12px' }}>Add</button></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </form>

                <div style={{ float: 'right' }}>
                    <h1 className='mt-5' style={{ fontSize: '30px', marginRight: '250px' }}>About</h1>
                    <p>Inspired by a blog from Timothy on Biztory: <br />
                        <a href="https://www.biztory.com/blog/2017/10/09/interactive-commenting-solution-tableau-server">Commenting Solution Tableau Server</a> <br />
                    </p>
                    <p>Created by Thomas Jaeger using the MERN stack: <br />
                        <a href='http://github.com/deafult2010/Tableau-CRUD'>
                            <span className='fab fa-github' /> Github
                </a>
                    </p>
                </div>
            </div>
        </Fragment>
    )
}
