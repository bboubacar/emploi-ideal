import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
    connexionSousmenu,
    githubDomain,
    menuItem,
    sousMenuNames,
    userToken,
} from "../utilities/constantes";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import PopUpMessage from "./PopUpMessage";
import { useDispatch, useSelector } from "react-redux";
import { changeSousMenu } from "../redux/sousMenuSlice";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const dispatch = useDispatch();
    let location = useLocation();

    useEffect(() => {
        dispatch(changeSousMenu());
    }, [location]);

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }
    return (
        <header>
            <PopUpMessage message="Félicitation" type={false} />
            <div className="header-container">
                <div className="logo-container">
                    <img src={githubDomain + "/images/logo.png"} alt="logo" />
                </div>
                <div className="nav-burger-menu" onClick={toggleMenu}>
                    {menuOpen ? <GrClose /> : <RxHamburgerMenu />}
                </div>
                <Menu menuOpen={menuOpen} />
            </div>
        </header>
    );
};

function Menu({ menuOpen }) {
    const [openSousMenu, setOpenSousMenu] = useState(false);
    const sMenu = useSelector((state) => state.sousMenu);
    function toggleSousMenu(item) {
        if (item?.title === sousMenuNames.deconnexion)
            localStorage.removeItem(userToken);

        setOpenSousMenu(!openSousMenu);
    }

    return (
        <div className={`menu-container ${menuOpen ? "open-menu" : ""}`}>
            <nav>
                {menuItem.map((item) => (
                    <div className="menu-item" key={item.title}>
                        <NavLink to={item.path} className="item">
                            {item.title}
                        </NavLink>
                    </div>
                ))}
                <div className="menu-item">
                    <span className="item" onClick={toggleSousMenu}>
                        {sMenu?.title}
                    </span>
                    <ConnexionSousMenu
                        item={sMenu}
                        openSousMenu={openSousMenu}
                        toggleSousMenu={toggleSousMenu}
                    />
                </div>
            </nav>
        </div>
    );
}

function ConnexionSousMenu({ item, openSousMenu, toggleSousMenu }) {
    return (
        <div className={openSousMenu ? "open-sousMenu sous-menu" : "sous-menu"}>
            {item?.content?.map((sousMe) => (
                <NavLink
                    to={sousMe?.path}
                    key={sousMe.title}
                    onClick={(ev) => toggleSousMenu(sousMe)}
                >
                    {sousMe.title}
                </NavLink>
            ))}
        </div>
    );
}

export default Header;
