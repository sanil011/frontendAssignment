import React,{useState} from 'react'
import { Box,Card, Typography,Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import {  useDispatch } from 'react-redux';
import { appActions } from '../store/appSlice';
import { useGlobalContext } from '../context/globalContext';
import axios from 'axios';
const Cards = ({ data, handleCheckbox }) => {
    const [raise, setRaise] = useState(false);
    const image = data && String(data?.video?.slice(32, 43));
    const { setLoading,setAlert } = useGlobalContext();
    const dispatch = useDispatch();
    const date = new Date();

    const handleUpdate = (e) => {
        if (e && e.stopPropagation) e.stopPropagation(); 
        dispatch(appActions.Update({ update: data, updatePopover: true }));
        setLoading(true);
        console.log("update click")
    }

    const cardHandler = () => {
        dispatch(appActions.Modal({ popover: true, link: data?.video }))
        axios.post("http://localhost:3000/history",
            {
                name: data?.name, category: data?.category, video: data?.video, time: date.getHours()
                    + ':' + date.getMinutes()
                    + ":" + date.getSeconds()
}
        ).then((res) => console.log(res))
        .catch((err)=>console.log(err))
    }

    const handleDelete = (e) => {
        if (e && e.stopPropagation) e.stopPropagation(); 
        axios.delete('http://localhost:3000/data/' + data?.id)
            .then((res)=>console.log(res))
            .catch((err) => console.log(err))
            .finally(() => (
                setAlert({ flag: true, type: "success", msg: "Card is deleted" }),
                    setTimeout(() => { window.location.reload() },900)    ))
    }

    const handleDel = (e) => {
        if (e && e.stopPropagation) e.stopPropagation(); 
    }
  return (
      <Box>
          <Card onMouseOver={() => setRaise(true)}
              onMouseLeave={() => setRaise(false)}
              onClick={() => cardHandler()}
              raised={raise} sx={{ width: "250px",padding:".5em",margin:".5em" }}>
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                  <Checkbox onChange={handleCheckbox} value={data?.id} onClick={(e)=>handleDel(e)} />
                  <SettingsIcon onClick={(e)=>handleUpdate(e) }  sx={{ cursor: "pointer" }} />
                  <DeleteIcon color='error' onClick={(e)=>handleDelete(e)} sx={{ cursor: "pointer" }} />
              </Box>
                  <Typography variant='h6' >{data?.name}</Typography>
              <Box  position={"relative"} width={"100%"}>
                  <Typography sx={{ cursor: "pointer", whiteSpace: "normal", overflowWrap: "break-word" }} color={"#0367FC"}>{ data?.video} </Typography>
                 <img style={{ objectFit: "contain", width: "100%", cursor: "pointer" }} src={'https://img.youtube.com/vi/' + image + '/hqdefault.jpg'} />
                </Box>
          </Card>
   </Box>
  )
}

export default Cards