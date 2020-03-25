import React, { Component } from 'react'

export default class layout2 extends Component {
    render() {
        return (
            <div class="center mt-5 mb-5 ">
                <br />
                <br />
                <h1> Features </h1>
                <br />
                <br />
                <div class="card container col-lg-8 mt-2 mb-2"> 
                        <h3 style={{fontFamily: "roboto", color: "black"}}>Work With any Team </h3> 
                        <b> 
                          Whether it’s for work, a side project or even the next family vacation, MyTrello helps your team stay organized.
                        </b>
                </div>
                <div class="card container col-lg-8 grey mt-2 mb-2"> 
                        <h3 style={{fontFamily: "roboto" , color: "black"}}>Invite  Team Members </h3> 
                        <b> 
                          Invite Members to collaborate in project and achieve faster completion of project  
                        </b>
                </div>
                <div class="card container col-lg-8 mt-2 mb-2"> 
                        <h3 style={{fontFamily: "roboto" , color: "black"}}> Chat With Team Members </h3> 
                        <b> 
                           Keep Your Team Members Updated by Online Chat built using Socketio that enables instant messaging
                        </b>
                </div>
                <div class="card container col-lg-8 grey mt-2 mb-2"> 
                        <h3 style={{fontFamily: "roboto", color: "black"}}> Organise </h3> 
                        <b> 
                           Divide Your list of task into Three categories
                             Things to do,
                             Thing Doing ,
                             Things done 
                             . Moreover Divide your projects into task(List) and subtask(checklist)  
                        </b>
                </div>
                <br />
                <br />
            </div>
        )
    }
}
