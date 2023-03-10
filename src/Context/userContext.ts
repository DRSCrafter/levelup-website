import React from "react";
import User from "../types/context/user";

export interface UserContextProps {
    user: User,
    handleUpdateUser: (key: string, value: any) => void,
    isLoggedIn: boolean
}

const UserContext = React.createContext<UserContextProps>(
    {
        user: ({} as User),
        handleUpdateUser: undefined!,
        isLoggedIn: false
    }
);
UserContext.displayName = "UserContext";

export default UserContext;