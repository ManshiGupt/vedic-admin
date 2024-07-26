import React, { useState } from 'react';

function MyAlertBanner({ message, type, showBanner, setShowBanner, background, alertType }) {

    const [isHovered, setIsHovered] = useState(false);

    const alertStyle = {

        alert_info: {
            padding: '20px',
            background: background || '#E6F4FF', // Light blue or soft turquoise
            color: 'black',
            display: showBanner ? 'block' : 'none',
            borderRadius: '5px',
        },

        alert_success: {
            padding: '20px',
            background: background || '#F6FFEC', // Light green or soft teal
            color: 'black',
            display: showBanner ? 'block' : 'none',
            borderRadius: '5px',
        },

        alert_warning: {
            padding: '20px',
            background: background || '#FFFBE6', // Light yellow or soft orange
            color: 'black',
            display: showBanner ? 'block' : 'none',
            borderRadius: '5px',
        },

        alert_error: {
            padding: '20px',
            background: background || '#FFF2F0', // Light grey or soft blue
            color: 'black',
            display: showBanner ? 'block' : 'none',
            borderRadius: '5px',
        },
        
       
        closebtn: {
            marginLeft: '15px',
            color: 'gray',
            fontWeight: 'bold',
            float: 'right',
            fontSize: '22px',
            lineHeight: '12px',
            cursor: 'pointer',
            transition: '0.3s',
        },
        closebtnHover: {
            color: 'black',
        }
    };


    const alertCrossBtnClick = () => {

        setShowBanner(false)

    };



    return (
        <div>
            <div style={alertType === 'success' ? alertStyle.alert_success :
                alertType === 'warning' ? alertStyle.alert_warning : alertType === 'error' ? alertStyle.alert_error :
                    (alertType === 'info' ? alertStyle.alert_info : alertStyle.alert_success)}>
                <span
                    style={{ ...alertStyle.closebtn, ...(isHovered && alertStyle.closebtnHover) }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={alertCrossBtnClick}
                >
                    &times;
                </span>
                <strong>{type}</strong> {message}
            </div>
        </div>
    );
}

export default MyAlertBanner;
