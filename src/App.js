import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LibraryBooksSharpIcon from "@mui/icons-material/LibraryBooksSharp";
import GroupsSharpIcon from "@mui/icons-material/GroupsSharp";
import { Link } from "react-router-dom";
import BookView from "./BookView";
import CreateBookView from "./CreateBookView";
import CreateAuthorView from "./CreateAuthorView";
import AuthorView from "./AuthorView";
import BookListView from "./BookListView";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const drawerWidth = 240;

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Library
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem key="Books" disablePadding>
                <ListItemButton component={Link} to="/books">
                  <ListItemIcon>
                    <LibraryBooksSharpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Books" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Authors" disablePadding>
                <ListItemButton component={Link} to="/authors/create">
                  <ListItemIcon>
                    <GroupsSharpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Authors" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/books" element={<BookListView />} />
            <Route path="/books/:id" element={<BookView />} />
            <Route path="/books/create" element={<CreateBookView />} />
            <Route path="/" element={<BookListView />} />
            <Route path="/authors/create" element={<CreateAuthorView />} />
            <Route path="/authors/:id" element={<AuthorView />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}
