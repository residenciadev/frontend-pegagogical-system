import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import Table from './table';

import { Container, Wrapper } from './styles';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const profile = useSelector(state => state.user.profile);

  async function loadData() {
    const response = await api.get(`/lessons`);
    setData(response.data);
  }
  useEffect(() => {
    loadData();
  }, []);

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
        <Table data={data} />
      </Wrapper>
    </>
  );
}
