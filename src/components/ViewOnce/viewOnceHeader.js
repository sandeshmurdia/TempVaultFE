import React, {useState} from 'react';
import "./ViewOnceHeader.css";

const ViewOnceHeader = () => {

    const [isVisible, setIsVisible] = useState(true);

    const hideHeader = () => {
        setIsVisible(false);
    };
    return (
        <>
            {isVisible && <div className="warning-viewonce">
                <p>This is a viewonce link, you can only view it once</p>
                <button onClick={hideHeader}>Close</button>
            </div>
            }
        </>
    )
}

export default ViewOnceHeader;