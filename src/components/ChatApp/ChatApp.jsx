import "bootstrap/dist/css/bootstrap.min.css";
import { Grid } from "@mui/material";
import Menu from "../Menu/Menu";
import Content from "../Content/Content";
import React, { useEffect, useState,useRef } from "react";

function ChatApp() {
  const [showMenu, setShowMenu] = useState(false);
  const chatContainerRef2 = useRef(null);

  useEffect(() => {
    console.log("khang")

    if (chatContainerRef2.current) {
      chatContainerRef2.current.scrollTop =
        chatContainerRef2.current.scrollHeight;
    }
  });
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
      ref={chatContainerRef2}
      columns={{ xs: 4, sm: 8, md: 12 }}
      onClick={() => handleMainShowMenu()}
    >
      <Grid item xs={4} sm={8} md={2} sx={{width:"100px"}}>
        <Menu />
      </Grid>
      <Grid item xs={4} sm={8} md={10}>
        <Content showMenu={showMenu} setShowMenu={handleShowMenu} />
      </Grid>
    </Grid>
  );
}

export default ChatApp;
