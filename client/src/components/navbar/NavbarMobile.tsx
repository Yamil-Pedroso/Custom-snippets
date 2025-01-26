import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { FaWindowClose } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import { NavbarMobileContainer, MenuWrapper, BoxItem } from "./styles";

interface INavbarMobileProps {
  isAuthenticated: boolean;
  handleLogout: () => void;
  getLinkStyle?: (path: string) => React.CSSProperties;
  currentUser: { isAdmin: boolean; username: string; avatar: string } | null;
}

const NavbarMobile: React.FC<INavbarMobileProps> = ({
  isAuthenticated,
  handleLogout,
  getLinkStyle,
  currentUser,
}) => {
  const [clickMenu, setClickMenu] = useState(false);

  const handleClick = () => {
    setClickMenu(!clickMenu);
  };

  return (
    <NavbarMobileContainer>
      <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
        <h2 style={{ color: "#ff7225" }}>SNIPPETS</h2>
      </Link>

      <MenuWrapper onClick={handleClick}>
        {clickMenu ? <FaWindowClose size={30} /> : <TiThMenu size={30} />}
      </MenuWrapper>

      <AnimatePresence>
        {clickMenu && (
          <BoxItem
            as={motion.div}
            initial={{ x: "6.25rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "6.25rem", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <UserMenu
              isAuthenticated={isAuthenticated}
              currentUser={currentUser}
              handleLogout={handleLogout}
              getLinkStyle={getLinkStyle}
            />
          </BoxItem>
        )}
      </AnimatePresence>
    </NavbarMobileContainer>
  );
};

export default NavbarMobile;
