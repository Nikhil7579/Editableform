import React, { useEffect, useState } from 'react'
import { RiEdit2Fill } from 'react-icons/ri'
import { AiTwotoneDelete } from 'react-icons/ai'
import './form.css';

const Form = () => {
    const [formdata, setFormdata] = useState({ name: '', email: '', mobile: '' });
    const [listform, setListform] = useState([]);
    const [index, setIndex] = useState();
    const [onform, setOnform] = useState(false);
    let { name, email, mobile } = formdata;
    const [editstyle, setEditstyle] = useState("edit");
    const [inputstyle, setInputstyle] = useState("inputs")

    const valuechange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        localStorage.setItem("FormData", JSON.stringify(listform))
    }, [listform])

    const datasubmit = (e) => {
        e.preventDefault();
        setFormdata({ name: '', email: '', mobile: '' })
        setListform([...listform, { name, email, mobile }])
    }
    const editform = (i) => {
        setInputstyle("editinputs")
        let { name, email, mobile } = listform[i]
        setFormdata({ name, email, mobile })
        setOnform(true);
        setIndex(i)
        console.log(index)
        setEditstyle("editone")
    }

    const updateform = (e) => {
        setInputstyle("inputs");
        e.preventDefault()
        setEditstyle("edittwo")
        setTimeout(() => {
            setEditstyle("edit")
        }, 1000)
        let total = [...listform]
        total.splice(index, 1, { name, email, mobile })
        setOnform(false)
        setListform(total)
        setFormdata({ name: "", email: "", mobile: "" })
    }

    const deleteformdata = (i) => {
        setIndex(i)
        setEditstyle("delete")
        setTimeout(() => {
            let total = [...listform]
            total.splice(i, 1)
            setListform(total)
            setEditstyle("edit")

        }, 1000)

    }
    return (
        <div>
            <form onSubmit={onform ? updateform : datasubmit} >
                <div className='form_container' >
                    <div className='form'>
                        <label htmlFor="name">Name</label>
                        <br />
                        <input className={inputstyle} type="text" name='name' placeholder='please enter name' value={formdata.name} onChange={valuechange} required
                        />
                    </div>
                    <br />
                    <div className='form'>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input className={inputstyle} type="email" name='email' placeholder='please enter email' value={formdata.email} onChange={valuechange} required
                        />
                    </div>
                    <br />
                    <div className='form'>
                        <label htmlFor="mobile">Mobile No.</label>
                        <br />
                        <input className={inputstyle} type="mobile" name='mobile' placeholder='please enter password' value={formdata.mobile} onChange={valuechange} required />
                    </div>
                    <br />
                    <div className='form'>
                        <button className='button' ><span>{!onform ? `Add` : `Update`}</span></button>
                    </div>
                </div>
            </form>
            <div style={{marginTop:'20px'}}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody >

                        {listform.map((item, i) => {
                            return (

                                <tr className={index === i ? editstyle : console.log("Data Add")} key={i}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.mobile}</td>
                                    <td>
                                        <RiEdit2Fill onClick={() => editform(i)} />
                                        {/* <button>Edit</button>&nbsp;&nbsp; */}
                                    </td>
                                    <td>
                                        <AiTwotoneDelete onClick={() => deleteformdata(i)} />
                                        {/* <button >Delete</button> */}
                                    </td>
                                </tr>

                            )
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default Form;
