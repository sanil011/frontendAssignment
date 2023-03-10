import Modal from '@mui/material/Modal';
import { Card, Box, Typography, TextField, Select, MenuItem, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { appActions } from '../store/appSlice';
import axios from 'axios';
import { useGlobalContext } from '../context/globalContext';
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    maxWidth: "650px",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

const AddModal = () => {
    const [name, setName] = useState("");
    const [video, setVideo] = useState("");
    const [dropdownValue, setDropdownvalue] = useState("");
    const { setLoading, setAlert} = useGlobalContext();
    const { addPopover,dropdown } = useSelector((state) => state.app)
    const dispatch = useDispatch();

    const Update = () => {
        setLoading(true);
        const cate = dropdown === dropdownValue[0] ? "A" : dropdown === dropdownValue[1] ? "B" : "C";
        console.log(cate)
        axios.post(`http://localhost:3000/data`,
            { name, category:cate, video })
            .then((data) => console.log(data))
            .catch((err) => { console.log(err) })
            .finally(() => (
                setLoading(false),
                setAlert({ flag: true, type: "success", msg: "Card is Added" }),
                setTimeout(() => { window.location.reload() }, 900) 
                
            ))
    }
    useEffect(() => {
        axios.get("http://localhost:3000/category/1")
            .then((res) => (setDropdownvalue(Object.values(res.data.data)), console.log(Object.values(res.data.data))))
            .catch((err) => console.log(err));
    }, [addPopover])

    const handleClose = () => {
        dispatch(appActions.Add({ popover: false, dropdown: "" }));
    }
    return (
        <Box>
            <Modal
                open={addPopover}
                onClose={handleClose}
            >
                <Card sx={style}>
                    <Typography variant='h5' mb={5} textAlign={"center"}> Add a new Card  </Typography>
                    <Box display={"flex"} gap={"1em"} justifyContent={"space-between"} mb={"1em"}>
                        <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField fullWidth label=" Link" value={video} onChange={(e) => setVideo(e.target.value)} />

                        <TextField fullWidth label="Category" value={dropdown} disabled />

                    </Box>
                    <Box display={"flex"} gap={"1em"} justifyContent={"space-between"}>
                        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' onClick={() => (handleClose(), Update())}>Submit</Button>
                    </Box>

                </Card>
            </Modal>
        </Box>
    )
}

export default AddModal