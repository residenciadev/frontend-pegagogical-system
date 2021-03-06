import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from 'react-router-dom';
import storage from 'redux-persist/lib/storage';
import { Avatar } from '@material-ui/core';
import useReactRouter from 'use-react-router';
import correctUrl from '../../utils/correctUrl';

import { getNotificationRequest } from '../../store/modules/notification/actions';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: '#fff',
    alignSelf: 'center',
  },
  titleUser: {
    alignSelf: 'center',
    marginLeft: '8px',
    cursor: 'pointer',
    // width: '100px',
  },
  search: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    // position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  sectionMobile: {
    display: 'flex',
    justifyContent: 'space between',
    [theme.breakpoints.up('md')]: {
      display: 'none',
      alignItems: 'center',
    },
  },
  app: {
    boxShadow: 'none',
    background: '#212c6f',
  },
  contentMobileProfile: {
    display: 'flex',
  },
  link: {
    color: '#000',
  },
  linkNotification: {
    color: '#fff',
  },
  MuiBadgeBadge: { width: '20px', height: '20px', padding: 0 },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { history } = useReactRouter();
  const profile = useSelector(state => state.user.profile);
  const notification = useSelector(state => state.notification.data);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    dispatch(getNotificationRequest(1, 50));
  }, [dispatch]);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function handleLeave() {
    storage.removeItem('persist:pedagogical');
    history.go('/signIn');
  }

  const getSumNotification = useMemo(() => {
    let sumNotification = 0;
    if (notification.data) {
      sumNotification = notification.data.filter(
        element => element.read === false
      ).length;
    }
    return sumNotification;
  }, [notification]);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link className={classes.link} to="/profile">
        <MenuItem onClick={handleMenuClose}>Meu Perfil</MenuItem>
      </Link>
      {profile.type === 'pedagogical' && (
        <div>
          <Link className={classes.link} to="/users">
            <MenuItem onClick={handleMenuClose}>Gerenciar Usuários</MenuItem>
          </Link>
          <Link className={classes.link} to="/courses">
            <MenuItem onClick={handleMenuClose}>Gerenciar Módulos</MenuItem>
          </Link>
        </div>
      )}

      <MenuItem onClick={handleLeave}>Sair</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link className={classes.link} to="/dashboard">
        <MenuItem onClick={handleProfileMenuOpen}>Home</MenuItem>
      </Link>
      <Link className={classes.link} to="/profile">
        <MenuItem onClick={handleProfileMenuOpen}>Meu Perfil</MenuItem>
      </Link>
      {profile.type === 'pedagogical' && (
        <div>
          <Link className={classes.link} to="/users">
            <MenuItem onClick={handleMenuClose}>Gerenciar Usuários</MenuItem>
          </Link>
          <Link className={classes.link} to="/courses">
            <MenuItem onClick={handleMenuClose}>Gerenciar Módulos</MenuItem>
          </Link>
        </div>
      )}
      <MenuItem onClick={handleLeave}>Sair</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="primary" className={classes.app}>
        <Toolbar>
          <Link to="/dashboard" className={classes.menuButton}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            />
          </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/dashboard" className={classes.title}>
              PEDAGÓGICO
            </Link>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/notifications" className={classes.linkNotification}>
              <IconButton
                aria-label={`show ${getSumNotification} new notifications`}
                color="inherit"
              >
                <Badge
                  badgeContent={getSumNotification}
                  color="secondary"
                  className={classes.MuiBadgeBadge}
                  showZero={false}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Link>

            <Typography
              className={classes.titleUser}
              variant="h6"
              noWrap
              onClick={handleProfileMenuOpen}
            >
              {profile.name}
            </Typography>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {profile.dropbox_id ? (
                <Avatar src={correctUrl(profile.dropbox.url)} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </div>
          <div className={classes.sectionMobile} key={profile.id}>
            <Link to="/notifications" className={classes.linkNotification}>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge
                  badgeContent={getSumNotification}
                  color="secondary"
                  className={classes.MuiBadgeBadge}
                  showZero={false}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Link>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              {profile.dropbox_id ? (
                <Avatar src={correctUrl(profile.dropbox.url)} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            <Typography
              className={classes.titleUser}
              variant="h6"
              noWrap
              onClick={handleMobileMenuOpen}
            >
              {profile.name}
            </Typography>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
