import React, { Component } from 'react'
import {Link} from "react-router-dom"; 
export default class layout1 extends Component {
    render() {
        return (
            <div >
                 <br/>
                 <h1 style={{fontFamily: "Roboto" ,marginTop:"100px", marginRight: "430px" , marginLeft: "150px", color: "black"}}> 
                    MyTrello lets you work more collaboratively and get more done.
                 </h1>
                 <h3 style={{fontFamily: "Roboto" , marginBottom: "50px",marginTop:"50px", marginRight: "500px" , marginLeft: "150px", color: "black"}}>
                 MyTrello’s boards, lists, and cards enable you to organize and prioritize your projects in a fun, flexible, and rewarding way.
                 </h3>
                 <br/>

                 <Link to =  '/dashboard' >
                    <button style={{fontFamily: "Roboto" ,marginBottom:"50px", marginRight: "700px" , marginLeft: "150px"
                    }}
                    className="btn btn-large waves-effect waves-light dark grey accent-3">
                    <h1 style={{ color: "black"}} > Dashboard </h1>
                    </button>
                </Link>
                
                <br/>
            </div>
        )
    }
}
