import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';
import Header from '../../../components/Header';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    background: [
      theme.palette.type === 'dark'
        ? theme.palette.background.dark
        : theme.palette.background.light,
    ],
  },
}));

export default function DefaultLayout({ children }) {
  const classes = useStyles();
  return (
    <Wrapper className={classes.wrapper}>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
