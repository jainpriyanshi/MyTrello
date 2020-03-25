import React, { Component } from 'react'
import Layout1 from "./layout1.jsx";
import Layout2 from "./layout2.jsx";
export default class layout extends Component {
    render() {
        return (
            <div>
                <div class="blue">
                <Layout1 />
                </div>
                <div class="white">
                <Layout2 />
                </div>
                <div>
                    <p class="center white"> Created By Priyanshi Jain</p>
                    <br />
                </div>
                 
            </div>
        )
    }
}
