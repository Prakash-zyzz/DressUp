import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined
} from "@mui/icons-material"
import { useNavigate } from 'react-router-dom';
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state"


const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state)=>state.cart.cart);

   

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="80px"
      // backgroundColor="rgba(255,255,255,0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
     <Box
        width="90%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
     >
        <Box
          onClick={()=> navigate('/')}
          sx={{"&:hover":{cursor:"pointer"}}}
          color="black"
          fontWeight="bold"
          fontSize="40px"
        >
            DRESSUP
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <IconButton sx={{color:"black","&:hover":{backgroundColor:"white"}}}>
            <SearchOutlined style={{ fontSize: '25px' }} />
          </IconButton>

          <IconButton sx={{color:"black","&:hover":{backgroundColor:"white"}}}>
            <PersonOutline style={{ fontSize: '25px' }} />
          </IconButton>
          
          <Badge
            badgeContent={cart.length}
            color="primary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
               
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black", "&:hover":{backgroundColor:"white"} }}
            >
              <ShoppingBagOutlined style={{ fontSize: '25px' }} />
            </IconButton>
          </Badge>
          
          

          <IconButton sx={{color:"black","&:hover":{backgroundColor:"white"}}}>
            <MenuOutlined style={{ fontSize: '25px' }} />
          </IconButton>
        </Box>
     </Box>
    </Box>
  )
}

export default Navbar