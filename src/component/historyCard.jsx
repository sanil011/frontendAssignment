import React, { useEffect, useState } from 'react'
import { Box, Card, Typography} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import { appActions } from '../store/appSlice';
import VideoModal from './videoModal';
import { useGlobalContext } from '../context/globalContext';

const HistoryCard = ({ data }) => {
    const [raise, setRaise] = useState(false);
    const image = data && String(data?.video?.slice(32, 43));
    const { reload, setReload } = useGlobalContext();
    const dispatch = useDispatch();
    const date = new Date();

    const handleDelete = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        axios.delete('http://localhost:3000/history/' + data?.id)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
            .finally(() => window.location.reload())
    }

    const cardHandler = () => {
        dispatch(appActions.Modal({ popover: true, link: data?.video }))
        axios.patch(`http://localhost:3000/history/${data?.id}`,
            {
                time: date.getHours()
                    + ':' + date.getMinutes()
                    + ":" + date.getSeconds()
            }
        ).then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if (reload) {
            window.location.reload();
            setReload(false);
        }
    },[reload])

    return (
        <Box>
            <VideoModal />
            <Card onMouseOver={() => setRaise(true)}
                onMouseLeave={() => setRaise(false)}
                onClick={() => cardHandler()}
                raised={raise} sx={{ width: "250px", padding: ".5em", margin: ".5em" }}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography fontWeight={600}>{data?.time} </Typography>
                    <DeleteIcon color='error' onClick={(e) => handleDelete(e)} sx={{ cursor: "pointer" }} />
                </Box>
                <Typography variant='h6' >{data?.name}</Typography>
                <Box position={"relative"} width={"100%"}>
                    <Typography sx={{ cursor: "pointer", whiteSpace: "normal", overflowWrap: "break-word" }} color={"#0367FC"}>{data?.video} </Typography>
                    <img style={{ objectFit: "contain", width: "100%", cursor: "pointer" }} src={'https://img.youtube.com/vi/' + image + '/hqdefault.jpg'} />
                </Box>
            </Card>
        </Box>
    )
}

export default HistoryCard