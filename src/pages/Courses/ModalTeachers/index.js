import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import correctUrl from '../../../utils/correctUrl';
import api from '../../../services/api';
import { Content, Container } from './styles';

const useModalStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    background: [
      theme.palette.type === 'dark'
        ? theme.palette.paper.dark
        : theme.palette.paper.light,
    ],
  },
  select: {
    width: '100%',
    color: '#000',
    backgroundColor: '#000',
  },
}));
export default function ModalTeachers({
  open,
  handleClose,
  teachers,
  showList,
  moduleId,
}) {
  const classes = useModalStyles();
  const [checked, setChecked] = useState([]);

  async function handleToggle(value) {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    await api.put(`/users/${value}`, { modules: moduleId });

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      await api.put(`/users/${value}`, { modules: [] });
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
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
  }, [moduleId, teachers]);
  console.log('c', checked);
  return (
    <Container show={open}>
      <Content className={classes.paper}>
        <h2 id="simple-modal-title">Selecione os Professores</h2>
        <List dense className={classes.root}>
          {teachers.map(teacher => {
            const labelId = `checkbox-list-secondary-label-${teacher.id}`;
            return (
              <ListItem key={teacher.id} button>
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
            );
          })}
        </List>
      </Content>
    </Container>
  );
}
