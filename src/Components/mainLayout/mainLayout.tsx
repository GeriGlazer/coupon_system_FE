import { BrowserRouter } from "react-router-dom";
import "./mainLayout.css";
import MyAsideMenu from "./myAsideMenu/myAsideMenu";
import MyFooter from "./myFooter/myFooter";
import MyHeader from "./myHeader/myHeader";
import MyMainPage from "./myMainPage/myMainPage";
import MenuRouting from './../routing/MenuRouting/MenuRouting';

function MainLayout(): JSX.Element {
    return (
        <div className="mainLayout">
            <BrowserRouter>
			<header>
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
        </div>
    );
}

export default MainLayout;
