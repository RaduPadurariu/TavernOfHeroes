import React, { Fragment } from "react";
import spinner from "../../images/spinner.gif"

   
const Spinner = () => {
	return (
        <Fragment>
            <img src = {spinner} 
                style={{ width: '100px', margin: 'auto', display: 'block'}} alt=""/>
        </Fragment>
    )
};

export default Spinner;
       