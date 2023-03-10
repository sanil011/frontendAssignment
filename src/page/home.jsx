import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from "@mui/material"
import axios from 'axios'
import Card from "../component/card"
import VideoModal from '../component/videoModal'
import UpdateModal from '../component/updateModal'
import AddModal from '../component/addModal'
import { useDispatch } from 'react-redux'
import { appActions } from '../store/appSlice'
import { useGlobalContext } from '../context/globalContext'
import Nodata from "../assets/nodata.svg"


const Home = () => {
    const [data, setData] = useState("")
    const [category, setCategory] = useState("");
    const [education, setEducation] = useState("");
    const [computer, setComputer] = useState("");
    const [entertainment, setEntertainment] = useState("");
    const [isChecked, setisChecked] = useState([]);
    const [categoryOne, setCategoryOne] = useState("");
    const [categoryTwo, setCategoryTwo] = useState("");
    const [categoryThree, setCategoryThree] = useState("");
    const [keys, setKeys] = useState("");
    const dispatch = useDispatch();
    const { setLoading, setAlert } = useGlobalContext();

    useEffect(() => {
       setLoading(true)
        axios.get("http://localhost:3000/data")
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));

        axios.get("http://localhost:3000/category/1")
            .then((res) => (setCategory(res.data.data), setKeys(Object.keys(res.data.data))))
            .catch((err) => console.log(err));
        
    }, [])


    useEffect(() => {
        let edu = data && data?.filter((db) => db.category === keys[0]);
        let comp = data && data?.filter((db) => db.category === keys[1]);
        let enter = data && data?.filter((db) => db.category === keys[2]);
        setEducation(edu);
        setComputer(comp);
        setEntertainment(enter);
    }, [keys,data])
    
    useEffect(() => {
        setCategoryOne(category.A);
        setCategoryTwo(category.B);
        setCategoryThree(category.C);
        setLoading(false)
    }, [category])
    
    const deleteItems = () => {
        setLoading(true);
        if(isChecked.length)
        {isChecked.map((db) => {
            axios.delete('http://localhost:3000/data/' + db)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
                .finally(() => (setLoading(false),window.location.reload()))
        })
        }
        else {
            setAlert({ flag: true, type: "error", msg: "Please select at least one card." });
            setLoading(false);
        }
        
    }

    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        console.log(e.target.value);

        if (checked) {
            setisChecked([...isChecked, value]);
        } else {
            setisChecked(isChecked.filter((e) => e !== value));
        }
    }
    console.log(isChecked)
    
    const categoryUpdate = () => {
        setLoading(true);
        axios.put('http://localhost:3000/category/1',
            {
                data: {
                    "A": categoryOne,
                    "B": categoryTwo,
                    "C": categoryThree
                }
            }
        ).then((res) => console.log(res.data.data))
            .catch((err) => console.log(err))
            .finally(() =>
                setLoading(false),
                setAlert({ flag: true, type: "success", msg: "Bucket Name is Updated" }),
                setTimeout(() => { window.location.reload() }, 900)
            )

    }

    return (
        <Box>
            <VideoModal />
            <UpdateModal />
            <AddModal />
            <Box my={2}>
                
                <Box my={2}>
                <Box display={"flex"} m={2} justifyContent={"space-between"}>
                        {category && <input value={categoryOne} onChange={(e) => setCategoryOne(e.target.value)}
                            onBlur={() => categoryUpdate()}
                            style={{ border: "none", fontSize: "1.5rem" }} />}
                    <Box display={"flex"} gap={"1em"}>
                            <Button variant='outlined' onClick={() => dispatch(appActions.Add({ popover: true, dropdown: categoryOne }))} sx={{ "&:hover": { backgroundColor: "#1876D1", color: "#fff" } }} >Create a new item</Button>
                            <Button variant="contained" onClick={() => deleteItems()} sx={{ "&:hover": { backgroundColor: "#fff", color: "#1876D1" } }}>Delete Selected item</Button>
                    </Box>
                </Box>
                <Box display={"flex"} overflow={"scroll"} sx={{scrollbarColor:"white",scrollbarWidth:"thin",scrollbarGutter:"stable"}}>
                    {education.length  ? education?.map((db) => (
                        <Card
                            key={db.id}
                            handleCheckbox={handleCheckbox}
                            data={db}
                        />
                    ))
                            : <Box display={"flex"} flexDirection={"column"} sx={{margin:"auto" }}>
                                <Box>
                                <img width={"150px"} src={Nodata} />
                                </Box>
                                <Typography>{ categoryOne} bucket is empty.</Typography>
                        </Box>
                        }
                    </Box>
                </Box>

                <Box my={2}>
                    <Box display={"flex"} m={2} justifyContent={"space-between"} >
                        {category && <input value={categoryTwo} onChange={(e) => setCategoryTwo(e.target.value)} onBlur={() => categoryUpdate()} style={{ border: "none", fontSize: "1.5rem" }} />}
                        <Box display={"flex"} gap={"1em"}>
                            <Button variant='outlined' sx={{ "&:hover": { backgroundColor: "#1876D1", color: "#fff" } }} onClick={() => dispatch(appActions.Add({ popover: true, dropdown: categoryTwo }))} >Create a new item</Button>
                            <Button variant="contained" onClick={() => deleteItems()} sx={{ "&:hover": { backgroundColor: "#fff", color: "#1876D1" } }}>Delete Selected item</Button>
                        </Box>
                    </Box>
                    <Box display={"flex"} overflow={"scroll"} sx={{ scrollbarColor: "white", scrollbarWidth: "thin", scrollbarGutter: "stable" }}>
                        {computer.length ? computer?.map((db) => (
                            <Card
                                key={db.id}
                                handleCheckbox={handleCheckbox}
                                data={db}
                            />
                        )) :
                            <Box display={"flex"} flexDirection={"column"} sx={{ margin: "auto" }}>
                                <Box>
                                    <img width={"150px"} src={Nodata} />
                                </Box>
                                <Typography>{categoryTwo} bucket is empty.</Typography>
                            </Box>
                        }
                    </Box>
                </Box>

                <Box my={2}>
                    <Box display={"flex"} m={2} justifyContent={"space-between"}>
                        {category && <input value={categoryThree} onChange={(e) => setCategoryThree(e.target.value)} onBlur={() => categoryUpdate()} style={{border:"none",fontSize:"1.5rem"}} />}
                        <Box display={"flex"} gap={"1em"}>
                            <Button variant='outlined' onClick={() => dispatch(appActions.Add({ popover: true, dropdown: categoryThree }))} sx={{ "&:hover": { backgroundColor: "#1876D1", color: "#fff" } }} >Create a new item</Button>
                            <Button variant="contained" onClick={() => deleteItems()} sx={{ "&:hover": { backgroundColor: "#fff", color: "#1876D1" } }}>Delete Selected item</Button>
                        </Box>
                    </Box>
                    <Box display={"flex"} overflow={"scroll"} sx={{ scrollbarColor: "white", scrollbarWidth: "thin", scrollbarGutter: "stable" }}>
                        {entertainment.length ? entertainment?.map((db) => (
                            <Card
                                key={db.id}
                                handleCheckbox={handleCheckbox}
                                data={db}
                            />
                        ))
                            :
                            <Box display={"flex"} flexDirection={"column"} sx={{ margin: "auto" }}>
                                <Box>
                                    <img width={"150px"} src={Nodata} />
                                </Box>
                                <Typography>{categoryThree} bucket is empty.</Typography>
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Home