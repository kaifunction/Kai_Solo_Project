import { NavLink } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-page-text-title">
        <h1>VIBEVISION</h1>
        <div className="home-page-text">
        <NavLink to={'/pin'} style={{textDecoration:'none', color:'#000000'}}>
        <h1 style={{color: '#d3f712', zIndex:'20', backgroundColor:'#000000', width:'600px', height:'50px', paddingLeft:'20px'}}>Unleash Your</h1>
        <h1 style={{paddingLeft: '20px', marginTop: '-20px'}}>Creative Exploration.</h1>
        </NavLink>
        </div>
        <div className="black-box"></div>
        <div className="black-box-1"></div>
        <div className="black-box-2"></div>
        <div className="black-box-small"></div>
        {/* <div className="v"><h1>V</h1></div> */}
      </div>
    </div>
  );
};

export default HomePage;
