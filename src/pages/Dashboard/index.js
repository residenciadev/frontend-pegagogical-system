import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Table from './table';

import { Container, Wrapper, ButtonCreate } from './styles';

export default function Dashboard() {
  const [data, setData] = useState([]);

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
          <Link to="/new-lessons">
            <ButtonCreate
              aria-label="add"
              variant="contained"
              onClick={() => {}}
            >
              Nova Aula
            </ButtonCreate>
          </Link>
        </div>
      </Container>
      <Wrapper>
        <Table data={data} />
      </Wrapper>
    </>
  );
}
