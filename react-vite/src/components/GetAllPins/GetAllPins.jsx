
import { useDispatch, useSelector } from "react-redux";
import { thunkGetPins } from "../../redux/pin";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const GetAllPins = () => {
     const dispatch = useDispatch();
     const allPins = useSelector((state) => state.pins.pins)
     const allPinsArray = Object.values(allPins)
     // console.log("allPinsArray===>", allPinsArray)


     useEffect(()=>{
          dispatch(thunkGetPins())
     },[dispatch])

     return (
          <div className="allPins-container" style={{display: "flex", flexDirection:"row", width:"100%", flexWrap:"wrap", gap:"20px"}}>
               {allPinsArray.map((pin) => (
                    <div key={pin.id} className="allPins-eachpin">
                         <NavLink key={pin.id} to={`/pin/${pin.id}/`}>
                         <img src={pin.pin_link} style={{width:"200px", height:"300px"}}/>
                         </NavLink>
                    </div>
               ))}
          </div>
     )
}


export default GetAllPins;
