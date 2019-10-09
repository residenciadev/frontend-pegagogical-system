import React from 'react';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import Select from 'react-select';
import Tooltip from '@material-ui/core/Tooltip';

import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { Container } from './styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
    color: '#000',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
    color: '#000',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
  title: {
    fontSize: '24px',
  },
}));

export default function Courses() {
  const classes = useStyles();
  const theme = useTheme();
  const [single, setSingle] = React.useState(null);
  const options = [{ value: 'gean', label: 'gean' }];

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  const handleChangeSingle = value => {
    setSingle(value);
  };
  return (
    <>
      <Container>
        <Typography className={classes.title} variant="h1" component="h2">
          Curso/Bloco/Disciplina
        </Typography>
        <div className="content">
          <Select
            // classes={classes}
            // styles={selectStyles}
            className="basic-single"
            classNamePrefix="select"
            inputId="react-select-multiple"
            placeholder="Selecione um Curso"
            options={options}
            value={single}
            onChange={handleChangeSingle}
          />
          <IconButton color="primary">
            <AddIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
        <div className="content">
          <Select
            // classes={classes}
            // styles={selectStyles}
            className="basic-single"
            classNamePrefix="select"
            inputId="react-select-multiple"
            placeholder="Selecione o Bloco"
            options={options}
            value={single}
            onChange={handleChangeSingle}
          />
          <Tooltip title="Add" aria-label="add">
            <IconButton color="primary">
              <AddIcon />
            </IconButton>
          </Tooltip>
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
        <div className="content">
          <Select
            // classes={classes}
            // styles={selectStyles}
            className="basic-single"
            classNamePrefix="select"
            inputId="react-select-multiple"
            placeholder="Selecione o Módulo"
            options={options}
            value={single}
            onChange={handleChangeSingle}
          />
          <IconButton color="primary">
            <AddIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
      </Container>
    </>
  );
}
