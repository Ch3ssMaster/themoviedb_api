import React from 'react';
import noPoster from '../img/404-wallpaper-not-found.png';

const DefaultRow = () => {
    return (<div className="row m-3 p-3 rounded" key="0">
        <div className="col-sm-4">
            <img src={noPoster}
                alt="Your search has not returned any results" className="img-thumbnail" />
        </div>
        <div className="col-sm-8">
            <h1 className="display-5 align-middle">
                Your search has not returned any results
                </h1>
        </div>
    </div>)
}

export default DefaultRow;