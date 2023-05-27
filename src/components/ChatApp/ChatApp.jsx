import "bootstrap/dist/css/bootstrap.min.css";
import { Grid } from "@mui/material";
import Menu from "../Menu/Menu";
import Content from "../Content/Content";
import React, { useEffect, useState } from "react";

function ChatApp() {
  const [showMenu, setShowMenu] = useState(false);
  var checkMenu = false;
  const handleShowMenu = () => {
    checkMenu = true;
    setShowMenu(!showMenu);
  };
  const handleMainShowMenu = () => {
    if (checkMenu) {
      return;
    }
    setShowMenu(false);
  };

  return (
    <Grid
      container
      columns={{ xs: 4, sm: 8, md: 12 }}
      onClick={() => handleMainShowMenu()}
    >
      <Grid item xs={4} sm={8} md={2}>
        <Menu />
      </Grid>
      <Grid item xs={4} sm={8} md={10}>
        <Content showMenu={showMenu} setShowMenu={handleShowMenu} />
      </Grid>
    </Grid>
  );
}

export default ChatApp;
