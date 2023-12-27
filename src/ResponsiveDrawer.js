import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TaskTable from "./TaskTable";
import ReportGrid from "./ReportGrid";
import ChartPie from "./ChartPie";
import { useNavigate } from "react-router-dom";
import { getStoredUsername } from "./authUtils";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Collapse from "@mui/material/Collapse";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import CampaignIcon from "@mui/icons-material/Campaign";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import Popover from "@mui/material/Popover";
import ListSubheader from "@mui/material/ListSubheader";
import SmsIcon from "@mui/icons-material/Sms";
import ChatIcon from "@mui/icons-material/Chat";
import Client from "./Client";
import Message from "./Message"; // Import the Message component
// Adjust the path based on your project structure

const drawerWidth = 240;

const UICard = ({ title, content }) => (
  <Card
    sx={{ width: "100%", aspectRatio: 1, height: "0", paddingBottom: "100%" }}
  >
    <CardContent>
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {content}
      </Typography>
    </CardContent>
  </Card>
);

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = getStoredUsername();
    setIsLoggedIn(!!storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    handleDrawerToggle();
  };

  const drawer = (
    <div>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, textAlign: "center", paddingTop: "16px" }}
      >
        RMS
      </Typography>
      <List>
        {["Dashboard", "Project Management"].map((text) => (
          <ListItem
            key={text}
            disablePadding
            button
            onClick={() => handleSectionClick(text)}
          >
            <ListItemButton>
              <ListItemIcon>
                {text === "Dashboard" ? (
                  <BarChartIcon />
                ) : text === "Project Management" ? (
                  <BusinessIcon />
                ) : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Collapse
          in={selectedSection === "Project Management"}
          timeout="auto"
          unmountOnExit
        >
          <List>
            {["Task", "Report"].map((text) => (
              <ListItem
                key={text}
                disablePadding
                button
                onClick={() => handleSectionClick(text)}
                sx={{ pl: 4 }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {text === "Task" ? (
                      <AssignmentIcon />
                    ) : text === "Report" ? (
                      <BarChartIcon />
                    ) : null}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem
          key="Marketing"
          disablePadding
          button
          onClick={() => handleSectionClick("Marketing")}
        >
          <ListItemButton>
            <ListItemIcon>
              <CampaignIcon />
            </ListItemIcon>
            <ListItemText primary="Marketing" />
          </ListItemButton>
        </ListItem>
        <Collapse
          in={selectedSection === "Marketing"}
          timeout="auto"
          unmountOnExit
        >
          <List>
            <ListItem
              key="Send SMS"
              disablePadding
              button
              onClick={() => handleSectionClick("Send SMS")}
              sx={{ pl: 4 }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <SmsIcon />
                </ListItemIcon>
                <ListItemText primary="Send SMS" />
              </ListItemButton>
            </ListItem>
            <ListItem
              key="Messages"
              disablePadding
              button
              onClick={() => handleSectionClick("Messages")}
              sx={{ pl: 4 }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
        <ListItem
          key="Canteen Fees"
          disablePadding
          button
          onClick={() => handleSectionClick("Canteen Fees")}
        >
          <ListItemButton>
            <ListItemIcon>
              <LocalAtmIcon />
            </ListItemIcon>
            <ListItemText primary="Canteen Fees" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  let mainContent;

  if (isLoggedIn) {
    mainContent =
      selectedSection === "Task" ? (
        <TaskTable />
      ) : selectedSection === "Report" ? (
        <ReportGrid />
      ) : selectedSection === "Send SMS" ? (
        <Client />
      ) : selectedSection === "Messages" ? (
        <Message /> // Display the Message component for "Messages" section
      ) : selectedSection === "Canteen Fees" ? (
        <Box>
          <Typography variant="h4">Canteen Fees Section</Typography>
          {/* Add your content here */}
        </Box>
      ) : (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
              gap: "16px",
            }}
          >
            <UICard
              title={`Total Number of Task `}
              content="Content for Card 1"
            />
            <UICard title={`Completed Task `} content="Content for Card 2" />
            <UICard title={`Number of Reports `} content="Content for Card 3" />
            <UICard title={`Uncompleted Task `} content="Content for Card 4" />
          </Box>
          <ChartPie />
        </Box>
      );
  } else {
    navigate("/");
    mainContent = null;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {selectedSection}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="logout"
            onClick={handleLogout}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {mainContent}
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
