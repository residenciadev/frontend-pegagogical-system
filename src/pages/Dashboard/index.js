import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Table from './table';

import { Container, Wrapper, ButtonCreate } from './styles';

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
      <Container>
        <h1>Aulas</h1>
        <div>
          {profile.type === 'teacher' && (
            <Link to="/new-lessons">
              <ButtonCreate
                aria-label="add"
                variant="contained"
                onClick={() => {}}
              >
                Nova Aula
              </ButtonCreate>
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
