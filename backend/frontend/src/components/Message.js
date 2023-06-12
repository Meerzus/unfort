import React from 'react';
import {Alert} from "react-bootstrap";


function Message({variant, children}) {
    return (
        <Alert variant={variant} style={{width: 100 + '%', height: 55 + 'px', margin: 0}}>
            {children}
        </Alert>
    );
}

export default Message;