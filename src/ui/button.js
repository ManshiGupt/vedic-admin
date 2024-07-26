import React from 'react';

function MyButton({ title, textColor, border, borderRadius, fontSize, padding, background, action }) {


    const buttonStyle = {

        padding: padding || '10px 20px', // Use the provided padding or default value
        background: background || 'linear-gradient(135deg, #FF9800, #FBCF24)', // Use the provided background or default value
        color: textColor || 'black', // Use the provided text color or default value
        border: border || 'none', // Use the provided border or default value
        borderRadius: borderRadius || '5px', // Use the provided border radius or default value
        cursor: 'pointer', // Cursor style
        fontSize: fontSize || '12px', // Use the provided font size or default value
        outline: 'none', // Remove focus outline
        transition: 'background 0.3s ease', // Smooth transition
        
    };

    // const buttonHoverStyle = {

    //     color: 'white'
    // }


    return (
        <>
            <button style={buttonStyle}
                // onMouseEnter={(e) => e.target.style.color = buttonHoverStyle.color}
                // onMouseLeave={(e) => e.target.style.color = buttonStyle.color}
                onClick={action}
            >
                {title}
            </button>
        </>
    )
}

export default MyButton;
