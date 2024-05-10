import React, { useState, useRef, useEffect } from "react";

const Video = ({ video }) => {
    const videoRef = useRef(null);


    return (
        <div >     
            <div >
                <h2 className="name">{video.lecture}</h2>                    
            </div>     
            <div >
                <video
                    ref={videoRef}
                    src={`data:video/mp4;base64,${video.video}`}
                    controls
                    loop
                    style={{ width: '1260px', marginBottom:'60px' }}
                />
            </div>  
        </div>
    );
};

export default Video;
