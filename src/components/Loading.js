import React from 'react';

import loading from '../assets/spinner.gif';

const Loading = () => {
    const containerStyle = {
        height: window.innerHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    };

    const loadingStyle = {
        height: '25%',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        OUserSelect: 'none',
        userSelect: 'none'
    }

    return (
        <div style={containerStyle}>
            <img src={loading} draggable={false} style={loadingStyle} alt='Loading' />
        </div>
    );
}

export default Loading;