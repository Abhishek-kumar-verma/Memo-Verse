import React, { useEffect, useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  Avatar,
} from "@material-ui/core";
import { Link, useLocation, useNavigate  } from "react-router-dom";
import memoVerse from "../../images/finallogo.jpg";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log(user);
  useEffect(() => {
    const token = user?.token;

    // jwt for manully login
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h4"
          align="center"
        >
          MemoVerse
        </Typography>
        <img
          className={classes.image}
          src={memoVerse}
          alt="Memo-Verse"
          height="50"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
