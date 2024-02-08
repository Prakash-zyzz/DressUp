import React from 'react'
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button,Tabs,Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";



const ItemDetails = () => {

  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [ count, setCount] = useState(1);
  const [ item, setItem ] = useState(null);
  const [ items, setItems ] = useState([]);

  const handleChange = (event,newValue) => {
    setValue(newValue);
  }

  async function getItem() {
    const item = await fetch (
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      { method : "GET"}
    );
     
     const itemJson = await item.json();
     setItem(itemJson.data);

  }

  async function getItems(){
           const items = await fetch (
            `http://localhost:1337/api/items?populate=image`,
            { method : "GET"}
           );

           const itemsJson = await items.json();
           setItems(itemsJson.data);
  }

  useEffect(()=>{
    getItem();
    getItems();
  },[itemId])

  return (
    <Box width="80%" m="80px auto">
       <Box display="flex" flexWrap="wrap" columnGap="40px">
         <Box flex="1 1 40%" mb="40px">
           <img
             alt={item?.name}
             width="100%"
             height="100%"
             src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.small?.url}`}
             style={{ objectFit:"contain"}}
           />
         </Box>

          <Box flex="1 1 50%" mb="40px">
            <Box display="flex" justifyContent="space-between">
                 <Box fontWeight="bold">Home/Item</Box>
                 <Box fontWeight="bold">Prev Next</Box>
            </Box>
            <Box m="65px 0 25px 0">
            <Typography variant='h3' fontWeight="bold" fontSize="25px">{item?.attributes?.name}</Typography>
            <Typography sx={{p:"20px 0",fontWeight:"bold", fontSize:"20px"}} >${item?.attributes?.Price}</Typography>
            <Typography p="30px 0" >
              
             <h3 style={{fontSize:"20px"}}> DESCRIPTION<br/> </h3>
              
              <div style={{ padding: "10px 0", fontSize:"15px" }}>
              {item?.attributes?.shortDescription}
              </div>
            </Typography>
            <Typography sx={{ mt: "20px" }}>
              <h3 style={{fontSize:"20px"}}>DETAILS<br/></h3>
              <div style={{ padding: "10px",fontSize:"15px" }}>
              <ul>
                {item?.attributes?.details.split('\n').map((line, index) => (
                <li key={index}>{line}</li>
                ))}
              </ul>
              </div>
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
             display="flex"
             alignItems="center"
             border={`1.5px solid ${shades.neutral[300]}`}
             mr="20px"
             p="2px 3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{p:"0 5px"}}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
              <Button
                sx={{
                  backgroundColor:"#222222",
                  color:"white",
                  borderRadius:0,
                  minWidth:"150px",
                  padding:"10px 40px"
                }}
                onClick={()=>dispatch(addToCart({item:{...item,count}}))}
              >
                ADD TO CART
              </Button>
          </Box>
            <Box>
               <Box m="20px 0 50px 0" display="flex">
                 <FavoriteBorderOutlinedIcon />
                 <Typography sx={{ml:"5px"}}>ADD TO WISHLIST</Typography>
               </Box>
               <Typography>CATEGORIES: {item?.attributes?.category.toUpperCase()}</Typography>
            </Box>
        </Box>
      </Box>
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab sx={{fontSize:"15px"}} label="DESCRIPTION" value="description" />
          <Tab sx={{fontSize:"15px"}} label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
         {value ==="description" &&
           <div fontSize="15px">{item?.attributes?.shortDescription}</div>
         }

         {value === "review" &&
          <div>Review</div>
         }
      </Box>

      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
          overflow="auto"
          Position= "absolute"

        >
          {items.slice(0,3).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item}  />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ItemDetails