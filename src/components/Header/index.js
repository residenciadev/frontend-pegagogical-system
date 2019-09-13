import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import storage from 'redux-persist/lib/storage';
import useReactRouter from 'use-react-router';

import Qrcode from '../../assets/qrcodewhite.svg';

import { getSearchRequest } from '../../store/modules/search/actions';
import { getCategoryRequest } from '../../store/modules/category/actions';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: '#fff',
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
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  app: {
    backgroundColor: '#2196f3',
    boxShadow: 'none',
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { history, match } = useReactRouter();

  const [values, setValues] = useState({
    search: '',
  });

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
    storage.removeItem('persist:qrcode');
    history.go('/signIn');
  }
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function handleSearch(e) {
    e.preventDefault();
    const { id } = match.params;
    const { path } = match;
    const { search } = values;

    if (id) {
      dispatch(getSearchRequest('subcategory', search, id));
    } else if (path.indexOf('/dashboard') === -1) {
      history.push('/dashboard');
      dispatch(getSearchRequest('category', search));
    }
    if (path.indexOf('/dashboard') !== -1) {
      dispatch(getSearchRequest('category', search));
    }
  }

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
      <MenuItem onClick={handleMenuClose}>
        <Link to="/users">Gerenciar usuários</Link>
      </MenuItem>

      {/* <MenuItem onClick={handleMenuClose}>Perfil</MenuItem> */}
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
      <MenuItem onClick={handleMenuClose}>
        <Link to="/users">Gerenciar usuários</Link>
      </MenuItem>
      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <p>Perfil</p>
      </MenuItem> */}
      <MenuItem onClick={handleLeave}>Sair</MenuItem>
    </Menu>
  );

  function handleBack() {
    const { search } = values;
    if (search) {
      setValues({ search: '' });
      dispatch(getCategoryRequest());
    }
  }
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="primary" className={classes.app}>
        <Toolbar>
          <Link to="/dashboard">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleBack}
            >
              <img src={Qrcode} alt="icone qr code" />
            </IconButton>
          </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link
              to="/dashboard"
              className={classes.title}
              onClick={handleBack}
            >
              QRCODE
            </Link>
          </Typography>
          {(match.path === '/dashboard' ||
            match.path === '/subpasta/:id/:title') && (
            <div className={classes.search}>
              <InputBase
                placeholder="Pesquisar…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={values.search}
                onChange={handleChange('search')}
                onKeyPress={handleKeyPress}
              />

              <Button size="small" color="inherit" onClick={handleSearch}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
              </Button>
            </div>
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
