import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Table from './table';

import { Container, Wrapper } from './styles';

export default function Dashboard() {
  const headCells = [
    {
      id: '',
      numeric: true,
      disablePadding: true,
      sortDisable: true,
      label: '',
    },
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: '#',
    },
    {
      id: 'created_at',
      numeric: false,
      disablePadding: false,
      label: 'Data de criação',
    },
    {
      id: 'user_id',
      numeric: false,
      disablePadding: false,
      label: 'Professor',
    },
    {
      id: 'title',
      numeric: false,
      disablePadding: false,
      label: 'Aula',
    },
    {
      id: 'courses',
      numeric: false,
      disablePadding: false,
      label: 'Curso',
      sortDisable: true,
    },
    {
      id: 'block',
      numeric: false,
      disablePadding: false,
      label: 'Bloco',
      sortDisable: true,
    },
    {
      id: 'module_id',
      numeric: false,
      disablePadding: false,
      label: 'Disciplina',
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'Status',
    },
    {
      id: 'button',
      numeric: false,
      disablePadding: false,
      label: 'Editar',
    },
  ];
  const [data, setData] = useState([]);
  const profile = useSelector(state => state.user.profile);

  return (
    <>
      <Container isTeacher={profile.type === 'teacher'}>
        <div>
          {profile.type === 'teacher' && (
            <Link to="/new-lessons">
              <Button
                aria-label="add"
                variant="contained"
                color="primary"
                onClick={() => {}}
              >
                Nova Aula
              </Button>
            </Link>
          )}
        </div>
      </Container>
      <Wrapper>
        <Table headCells={headCells} url="lessons" />
      </Wrapper>
    </>
  );
}
