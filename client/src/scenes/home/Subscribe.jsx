import React, {useState} from 'react'
import { Box, Typography, IconButton, Divider, InputBase} from "@mui/material"
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined"

const Subscribe = () => {

    const [email,setEmail] = useState(" ");

  return (
    <Box width="80%" margin="120px auto" textAlign="center">
        <IconButton>
            <MarkEmailReadOutlinedIcon style={{fontSize:"50px",color:"black"}} />
        </IconButton>
        <Typography variant='h2'>Subscribe To Our Newsletter</Typography>
        <Typography variant='h3'>and recive $20 coupon for your first order when you checkout. </Typography>
        <Box
         p="4px 4px"
         m="15px auto"
         display="flex"
         alignItems="center"
         width="75%"
         backgroundColor="#F2F2F2"
        >
         <InputBase
          
          sx={{ ml:1, flex:1,color:'black'}}
          onChange={(e)=> setEmail(e.target.value)}
          placeholder='Enter email'
          value={email}
         />
         <Divider sx={{height:28, m:0.5,color:"black"}} orientation='vertical'/>
         <Typography sx={{p:"10px","hover":{cursor:"pointer"},color:'black',fontWeight:"bold"}}>Subscribe</Typography>
        </Box>
    </Box>
  )
}

export default Subscribe