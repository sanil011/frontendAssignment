import React from 'react'
import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from 'react-router-dom'
const HeaderHistory = () => {

    const navigate = useNavigate();
    const handleClick = () => {

        navigate('/')

    }


    return (
        <Box display={"flex"} pb={2} justifyContent={"space-between"} sx={{ borderBottom: "1px solid lightgrey" }}>
            <Typography  sx={{ cursor: "pointer" }} variant='h4'>CONVIN</Typography>
            <Button variant='outlined' onClick={() => handleClick()} sx={{ "&:hover": { backgroundColor: "#1876D1", color: "#fff" } }} >  Home </Button>
        </Box>
    )
}

export default HeaderHistory