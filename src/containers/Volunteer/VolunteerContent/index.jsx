import React from "react";
import Sidebar from "../../../components/Sidebar/index";
import Card from "../../../components/Card"
import "./styles.css"


const VolunteerContent = () => {

    return (
        <>
            <div>
                <Sidebar />
                <div className="volunteer_content_div">
                    <h2>Bloques minimos</h2>
                    <div className="content_div">
                        <div className="single_content_div">
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </div>
                    </div>
                    <h2>Bloques opcionales</h2>
                    <div className="content_div">
                        <div className="single_content_div">
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VolunteerContent;