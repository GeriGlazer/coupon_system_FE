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
import { store } from "../../redux/store";

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

                <header>
                    <MyHeader/>
                    <Button onClick={darkMode} style={{textAlign:'left'}} > dark mode </Button>
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
