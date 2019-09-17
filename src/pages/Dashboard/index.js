import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Components MD
import Folder from '@material-ui/icons/Folder';
import Button from '@material-ui/core/Button';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { toast } from 'react-toastify';
import api from '../../services/api';
import Table from './table';

import {
  Container,
  Wrapper,
  ButtonFolder,
  ModalContainer,
  ButtonCreate,
} from './styles';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

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
