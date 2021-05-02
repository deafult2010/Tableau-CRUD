import React, { Fragment, useEffect, useState } from 'react'



export default function ListTodos(props) {

    const [obsList, setObsList] = useState([]);
    const [comments, setComments] = useState([]);


    const [obsStartDate, setObsStartDate] = useState('');
    const [obsEndDate, setObsEndDate] = useState('');
    const [obsMember, setObsMember] = useState('loading...');
    const [obsClient, setObsClient] = useState('loading...');
    const [clientOnObsList, setClientOnObsList] = useState('loading...');

    const [commentsStartDate, setCommentsStartDate] = useState('');
    const [commentsEndDate, setCommentsEndDate] = useState('');
    const [commentsMember, setCommentsMember] = useState('loading...');
    const [commentsClient, setCommentsClient] = useState('loading...');
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
            setObsMember(jsonData[0].member_code);
            setObsClient(jsonData[0].client_lei);
            setClientOnObsList(jsonData[0].client_on_obs_list);

        } catch (err) {
            console.error(err.message)
        }
    }

    const onSubmitObsForm = async (e) => {
        e.preventDefault();
        try {
            const body = { obsStartDate, obsEndDate, obsMember, obsClient, clientOnObsList };
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
            // const deleteObsList = await fetch(`https://tableaucrudform.herokuapp.com/obs_lists/${id}`, {
            await fetch(`http://localhost:5000/obs_list/${id}`, {
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
            setCommentsMember(jsonData[0].member_code);
            setCommentsClient(jsonData[0].client_lei);

        } catch (err) {
            console.error(err.message)
        }
    }

    const onSubmitCommentsForm = async (e) => {
        e.preventDefault();
        try {
            const body = { commentsStartDate, commentsEndDate, commentsMember, commentsClient, newComment };
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

                <h1 className='text-center mt-5'>Edit Obs list</h1>
                <form className='d-flex' onSubmit={onSubmitObsForm}>
                    <table className="table mt-1" style={{ tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '150px' }}>Start Date</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '150px' }}>End Date</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '80px' }}>Member Code</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '165px' }}>Client LEI</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '80px' }}>Client_On <br /> Obs_List</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '80px' }}>Add/Edit</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '80px' }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {obsList.map((obsList, i) => (
                                <tr key={obsList.id}>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ width: '150px', padding: '2px' }} type="date" value={obsList.start_date} onChange={e => handleObsStartDateChange(e, i)} /></td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ width: '150px', padding: '2px' }} type="date" value={obsList.end_date} onChange={e => handleObsEndDateChange(e, i)} /></td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}>{obsList.member_code}</td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}>{obsList.client_lei}</td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}>{obsList.client_on_obs_list}</td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><button type="button" className='btn btn-success' onClick={() => editObsList(i, obsList.id)}>Edit</button></td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><button type="button" className='btn btn-danger' onClick={() => deleteObsList(obsList.id)}>Delete</button></td>
                                </tr>
                            ))}
                            <tr>
                                <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ width: '150px', padding: '2px' }} type="date" value={obsStartDate} onChange={e => setObsStartDate(e.target.value)} /></td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ width: '150px', padding: '2px' }} type="date" value={obsEndDate} onChange={e => setObsEndDate(e.target.value)} /></td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}>{obsMember}</td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}>{obsClient}</td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}>{clientOnObsList}</td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}><button className='btn btn-primary'>Add</button></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </form>



                <h1 className='text-center mt-5'>Edit Comments list</h1>
                <form className='d-flex' onSubmit={onSubmitCommentsForm}>
                    <table className="table mt-1">
                        <thead>
                            <tr>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '150px' }}>Start Date</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '150px' }}>End Date</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '80px' }}>Member Code</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '165px' }}>Client LEI</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '200px' }}>Comments</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '80px' }}>Add/Edit</th>
                                <th className="align-middle text-center" style={{ padding: '0px', width: '80px' }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((comments, i) => (
                                <tr key={comments.id}>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ width: '150px', padding: '2px' }} type="date" value={comments.start_date} onChange={e => handleCommentStartDateChange(e, i)} /></td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ width: '150px', padding: '2px' }} type="date" value={comments.end_date} onChange={e => handleCommentEndDateChange(e, i)} /></td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}>{comments.member_code}</td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}>{comments.client_lei}</td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><textarea className="form-control" style={{ width: '200px', padding: '2px' }} rows='3' value={comments.comment} onChange={e => handleCommentCommentChange(e, i)} /></td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><button type="button" className='btn btn-success' onClick={() => editComments(i, comments.id)}>Edit</button></td>
                                    <td className="align-middle text-center" style={{ padding: '0px' }}><button type="button" className='btn btn-danger' onClick={() => deleteComments(comments.id)}>Delete</button></td>
                                </tr>
                            ))}
                            <tr>
                                <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ width: '150px', padding: '2px' }} type="date" value={commentsStartDate} onChange={e => setCommentsStartDate(e.target.value)} /></td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}><input className="form-control" style={{ width: '150px', padding: '2px' }} type="date" value={commentsEndDate} onChange={e => setCommentsEndDate(e.target.value)} /></td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}>{commentsMember}</td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}>{commentsClient}</td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}><textarea className="form-control" style={{ width: '200px', padding: '2px' }} rows='3' value={newComment} onChange={e => setNewComment(e.target.value)} /></td>
                                <td className="align-middle text-center" style={{ padding: '0px' }}><button className='btn btn-primary'>Add</button></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </Fragment>
    )
}
