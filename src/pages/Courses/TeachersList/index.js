import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { fade, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { toast } from 'react-toastify';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import correctUrl from '../../../utils/correctUrl';
import api from '../../../services/api';
import { Content, Container } from './styles';

const useModalStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  select: {
    width: '100%',
    color: '#000',
    backgroundColor: '#000',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(4),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 4),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

export default function TeachersList({ show, teachers, moduleId }) {
  const classes = useModalStyles();
  const [dataTeachers, setDataTeachers] = useState([]);
  const [checked, setChecked] = useState([]);

  async function handleToggle(value) {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      await api.put(`/users/${value}`, { modules: moduleId });
      toast.success('Professor adicionado a disciplina com sucesso!');
    } else {
      await api.put(`/users/${value}?removeModule=1`, { modules: moduleId });
      newChecked.splice(currentIndex, 1);
      toast.warn('Professor removido da disciplina com sucesso!');
    }
    setChecked(newChecked);
  }

  function searchHandler(event) {
    const searcjQery = event.target.value.toLowerCase();
    const displayedContacts = teachers.filter(el => {
      const searchValue = el.name.toLowerCase();
      return searchValue.indexOf(searcjQery) !== -1;
    });
    setDataTeachers(displayedContacts);
  }

  useEffect(() => {
    teachers.map(teacher =>
      teacher.modules.map(module => {
        if (module.id === moduleId) {
          setChecked(prevState => {
            const value = [...prevState, teacher.id];
            return value;
          });
        }
      })
    );
    setDataTeachers(teachers);
  }, [moduleId, teachers]);
  return (
    <Container show={show}>
      <Content className={classes.paper}>
        <h2>Selecione os Professores</h2>
        <small>
          Marque o professor para atribuí-lo a disciplina ou desmarque para
          removê-lo.
        </small>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Digite o nome do professor…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={e => searchHandler(e)}
          />
        </div>
        <List dense className={classes.root}>
          {dataTeachers.map(teacher => {
            const labelId = `checkbox-list-secondary-label-${teacher.id}`;
            return (
              <div key={teacher.id}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${teacher + 1}`}
                      src={
                        teacher.dropbox
                          ? correctUrl(teacher.dropbox.url)
                          : `https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/${teacher.name}/128`
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={teacher.name} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={() => handleToggle(teacher.id)}
                      checked={checked.indexOf(teacher.id) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="fullWidth" component="li" />
              </div>
            );
          })}
        </List>
      </Content>
    </Container>
  );
}

TeachersList.propTypes = {
  show: PropTypes.bool.isRequired,
  teachers: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
      PropTypes.func,
      PropTypes.array,
    ])
  ).isRequired,
  moduleId: PropTypes.number.isRequired,
};
