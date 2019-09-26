import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Content } from './styles';
import Header from '../../../components/Header';

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: '100vh',
    background: [
      theme.palette.type === 'dark' ? theme.palette.background.dark : '#FFF',
    ],
  },
}));

export default function DefaultLayout({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Header />
      <Content>{children}</Content>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
