import Modal from '@mui/material/Modal';
import { Card, Box, Typography, TextField, Select, MenuItem, Button } from '@mui/material';
import ReactPlayer from 'react-player'
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

const UpdateModal = () => {
    const [name, setName] = useState("");
    const [video, setVideo] = useState("");
    const [category, setCategory] = useState("");
    const [dropdown, setDropdown] = useState("");
    const [dropdownValue, setDropdownValue] = useState("");
    const { setLoading, alert, setAlert } = useGlobalContext();
    const { updatePopover, update } = useSelector((state) => state.app)
    const dispatch = useDispatch();

    const Update = () => {
        setLoading(true);
        const cate = category === dropdown[0] ? "A" : category === dropdown[1] ? "B" : "C";
        axios.put(`http://localhost:3000/data/${update?.id}`,
            { name, category: cate, video })
            .then((data) => console.log(data))
            .catch((err) => { console.log(err) })
            .finally(() => (
                setLoading(false),
                setAlert({ flag: true, type: "success", msg: "Card is Updated" }),
                setTimeout(() => { window.location.reload() }, 900) 
            ))
    }

    useEffect(() => {

        axios.get("http://localhost:3000/category/1")
            .then((res) => (setDropdown(Object.values(res.data.data)), setDropdownValue(Object.keys(res.data.data))))
            .catch((err) => console.log(err));


        if (updatePopover) {
            let cat = (update.category === "A" ? dropdown[0] : update.category === "B" ? dropdown[1] : dropdown[2])
            setCategory(cat);
            setVideo(update?.video);
            setName(update?.name);
            setLoading(false);
        }
    }, [updatePopover,update])

    const handleClose = () => {
        dispatch(appActions.Update({ popover: false, update: "" }));
    }
    return (
        <Box>
            <Modal
                open={updatePopover}
                onClose={handleClose}
            >
                <Card sx={style}>
                    <Typography variant='h5' mb={5} textAlign={"center"}>Update </Typography>
                    <Box display={"flex"} gap={"1em"} justifyContent={"space-between"} mb={"1em"}>
                        <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField fullWidth label=" Link" value={video} onChange={(e) => setVideo(e.target.value)} />

                        <Select width={"50%"} label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
                            {dropdown && dropdown.map((db, idx) => (
                                <MenuItem key={idx} value={db}>{db}</MenuItem>
                            ))}

                        </Select>
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

export default UpdateModal