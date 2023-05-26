import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Menu = () => {
  const theme = useTheme();

  return (
    <Box
      className="menu"
      sx={{
        width: "100%",
        backgroundColor: "#161616",
        height: "100vh",
        [theme.breakpoints.down("sm")]: {
          height: 50,
        },
        color: "white",
      }}
    >
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={4} sm={8} md={12} className="menu_item1">
          <div
            style={{
              paddingTop: 16,
              paddingRight: 28,
              paddingBottom: 16,
              paddingLeft: 28,
              backgroundColor: "#1F1F1F",
              height: 50,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div class="image-container">
              <img
                onClick={() => window.location.reload()}
                src="https://hamongkhang.github.io/CHATGPT_APP/images/icon_main.png"
                alt="Ảnh"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={4} sm={8} md={12} className="menu_item2">
          <div
            style={{
              paddingTop: 16,
              paddingRight: 28,
              paddingBottom: 16,
              paddingLeft: 28,
              backgroundColor: "#383838",
              height: 76,
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="https://hamongkhang.github.io/CHATGPT_APP/images/chatgpt-icon-logo.png"
              alt="Ảnh"
            />
            <Typography sx={{ marginLeft: 1, fontSize: "12px" }}>
              ChatGPT
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Menu;
