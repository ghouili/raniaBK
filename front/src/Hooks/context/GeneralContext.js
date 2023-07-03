import React, { createContext, useEffect, useState } from 'react'
import { socket } from '../../Socket';
import Cookies from "universal-cookie";

const GeneralContext = createContext();

const ProviderContext = ({ children }) => {
    const cookies = new Cookies();
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState(false);
    const [alertData, setAlertData] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [theme, setTheme] = useState('light');

    const ToggleSidebar = () => {
        var sidebar = document.getElementById("main__sidebar");
        setSidebarOpen(!sidebarOpen);
        if (!sidebarOpen) {
            sidebar.style.width = "255px";
        } else {
            sidebar.style.width = "85px";
        }
    }

    useEffect(() => {
        if (theme === "dark") {
            console.log(theme);
            document.documentElement.classList.add("dark");
        } else {
            console.log(theme);
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    useEffect(() => {
        if (user) {
            console.log("userConnected");
            socket.emit("userConnected", ({ data: user?._id }));
        }


    }, [user])


    useEffect(() => {
        if (!user) {
            let userexists;
            userexists = cookies.get('user');
            if (userexists) {
                setUser(userexists);
            }
        }
        function onConnect() {
            setIsConnected(true);
            console.log('connected');
            console.log(socket.connected);
        }

        function onDisconnect() {
            setIsConnected(false);
        }



        socket.on("Alert", ({ success, data }) => {
            console.log("alert");
            console.log(data);
            setAlert(true);
            setAlertData(data);
        });
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('Alert');
        };
    }, []);


    const HandleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        // localStorage.setItem('preferredMode', theme === "dark" ? "light" : "dark");
    }




    const values = { sidebarOpen, theme, alert, alertData, setAlert, setAlertData, setSidebarOpen, ToggleSidebar, HandleThemeSwitch, setUser };
    return (
        <GeneralContext.Provider value={values} >
            {children}
        </GeneralContext.Provider>
    )
}

export { ProviderContext, GeneralContext }