import React,{ useState,useEffect} from 'react'
import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(false);
 
  const handleClick = () => {
    if (window.location.pathname == '/') {
      navigate('/history');
      setLocation(true);
    } else {
      navigate('/');
      setLocation(false);
    }
  }


  return (
      <Box display={"flex"} pb={2} justifyContent={"space-between"} sx={{borderBottom:"1px solid lightgrey"}}>
      <Typography  sx={{cursor:"pointer"}} variant='h4'>CONVIN</Typography>
      <Button variant='outlined' onClick={() => handleClick()} sx={{ "&:hover": { backgroundColor:"#1876D1",color:"#fff"}}} > {location ? "Home":"History"} </Button>
    </Box>
  )
}

export default Header