import React, { memo } from 'react';

function LoginAndRegister(props:any) {
    const { 
        handleUsername, 
        registerUser, 
        userData
    } = props;

    return (
        <div className="register">
            <input
                id="user-name" 
                placeholder="Enter your name"
                name="userName"
                value={userData.username}
                onChange={handleUsername}
            />
            <button type="button" onClick={registerUser}>
                connect
            </button>
        </div>
    );
}

export default memo(LoginAndRegister);