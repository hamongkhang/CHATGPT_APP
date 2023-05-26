import "bootstrap/dist/css/bootstrap.min.css";
import { Grid } from "@mui/material";
import Menu from "../Menu/Menu";
import Content from "../Content/Content";

function ChatApp() {
  return (
    <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
      <Grid item xs={4} sm={2} md={2}>
        <Menu />
      </Grid>
      <Grid item xs={4} sm={6} md={10}>
        <Content />
      </Grid>
    </Grid>
  );
}

export default ChatApp;
