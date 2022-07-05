import { BrowserRouter } from "react-router-dom";
import "./mainLayout.css";
import MyAsideMenu from "./myAsideMenu/myAsideMenu";
import MyFooter from "./myFooter/myFooter";
import MyHeader from "./myHeader/myHeader";
import MenuRouting from './../routing/MenuRouting/MenuRouting';
import createTheme from "@mui/material/styles/createTheme";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Button, CssBaseline } from "@mui/material";

function MainLayout(): JSX.Element {
    const [isDarkMode, setisDarkMode] = useState(false);
          
    let theme = createTheme({
        palette: {
            mode: isDarkMode?'dark':'light'
       
    },
    });
        
    const darkMode = () => {
        setisDarkMode(!isDarkMode)
    };
    
    return (
        <div className="mainLayout">
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>

                <header className="header-bg-color">
                    <Button  color="secondary" onClick={darkMode} > dark mode </Button>
                    <MyHeader/>
                </header>
                <aside>
                    <MyAsideMenu/>
                    
                </aside>
                <main>
                    <MenuRouting/>
                </main>
                <footer>
                    <MyFooter/>
                </footer>
            </BrowserRouter>
        </ThemeProvider>
        </div>
    );
}

export default MainLayout;
