import React,{ useEffect, useState} from 'react'
import { Box, Typography, Tab, Tabs, useMediaQuery} from "@mui/material"
import { useSelector, useDispatch} from "react-redux"
import Item from "../../components/Item"
import { setItems } from "../../state";

const ShoppingList = () => {
 const dispatch = useDispatch();
 const [value,setValue] = useState("all");
 const items = useSelector((state)=> state.cart.items);
 console.log(items); 
 const isNonMobile = useMediaQuery("(min-width:600px)");


 const handleChange = (event,newValue) => {
    setValue(newValue);
 }

 async function getItems(){
    const items = await fetch(
        "http://localhost:1337/api/items?populate=image",
        { method:"GET" }
    )
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data))

    
 }
  
 useEffect(() => {
    getItems();
  }, []); 

  const outWearsItems = items.filter(
   (item) => item.attributes.category === "outWears"
  )

  const shirtWearsItems = items.filter(
   (item) => item.attributes.category === "shirtWears"
  )

  const shoeWearsItems = items.filter(
   (item) => item.attributes.category === "shoeWears"
  )
  
  return (
    <Box width="80%" margin="80px auto">
      <Typography variant='h2' textAlign="center">
        <b> Our Featured Products</b>
      </Typography>
      <Tabs
       textColor='primary'
       indicatorColor='primary'
       value={value}
       onChange={handleChange}
       TabIndicatorProps={{sx:{display:isNonMobile ? "block" : "none"}}}
       centered
       sx={{
         m:"25px",
         "& .MuiTabs-flexContainer":{
            flexWrap:"wrap"
         }
       }}
      >
          <Tab style={{ fontWeight:"bold", fontSize:"20px", fontFamily:"Roboto"}} label="ALL" value="all" />
          <Tab style={{ fontWeight:"bold", fontSize:"20px", fontFamily:"Roboto"}}  label="SHIRTS" value="shirtWears" />
          <Tab style={{ fontWeight:"bold", fontSize:"20px", fontFamily:"Roboto"}}  label="OUT WEAR" value="outWears" />
          <Tab style={{ fontWeight:"bold", fontSize:"20px", fontFamily:"Roboto"}}  label="SHOES" value="shoeWears" />
      </Tabs>

      <Box 
       margin="0 auto"
       display="grid"
       gridTemplateColumns="repeat(auto-fill,300px)"
       rowGap="20px"
       columnGap="1.33%"
       justifyContent="space-around"
      >
         { value === "all" && items.map((item)=>(
            <Item borderRadius="16px" item={item} key={`${item.name}-${item.id}`} />
         ))}

         { value === "outWears" && outWearsItems.map((item)=>(
            <Item borderRadius="16px" item={item} key={`${item.name}-${item.id}`} />
         ))}

         { value === "shirtWears" && shirtWearsItems.map((item)=>(
            <Item borderRadius="16px" item={item} key={`${item.name}-${item.id}`} />
         ))}

         { value === "shoeWears" && shoeWearsItems.map((item)=>(
            <Item borderRadius="16px" item={item} key={`${item.name}-${item.id}`} />
         ))}
      </Box>
    </Box>
  )
}

export default ShoppingList