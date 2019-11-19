import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TablePagination from '@material-ui/core/TablePagination';
import useReactRouter from 'use-react-router';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Container, ListNotification } from './styles';
import { getNotificationRequest } from '../../store/modules/notification/actions';
import formatDate from '../../utils/formatDate';

export default function Notification() {
  const dispatch = useDispatch();
  const { history } = useReactRouter();
  const data = useSelector(state => state.notification.data);
  const loading = useSelector(state => state.notification.loading);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  async function handleRead(id) {
    await api.put(`/notifications/${id}`, { read: true });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getNotificationRequest(page + 1, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  return (
    <Container>
      <h1>Suas Notificações</h1>
      <hr />
      <ListNotification>
        {!loading &&
          !!data &&
          data.data.length > 0 &&
          data.data.map(notification => (
            <Link
              key={notification.id}
              onClick={() => handleRead(notification.id)}
              to={notification.redirect_to}
            >
              <li className={`${notification.read && 'read'}`}>
                <p>{notification.content}.</p>
                <small>{formatDate(notification.created_at)}</small>
              </li>
            </Link>
          ))}
        {!loading && data && data.data.length <= 0 && (
          <li className="read">
            <p>Você não possui nenhuma notificação</p>
          </li>
        )}
      </ListNotification>
      {!loading && !!data && data.data.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={data.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Linhas por página"
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Container>
  );
}
