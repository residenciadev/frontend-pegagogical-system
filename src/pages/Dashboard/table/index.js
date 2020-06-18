import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Thead from './Head';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import useReactRouter from 'use-react-router';

import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

import { toast } from 'react-toastify';
import formatDate from '../../../utils/formatDate';
import api from '../../../services/api';

import { ModalContainer } from '../styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  gray: {
    background: '#A0A0A0',
    color: '#fff',
  },
  yellow: {
    background: '#ffc107',
    color: '#fff',
  },
  secodary: {
    background: '#f44336',
    color: '#fff',
  },
  primary: {
    background: '#03a9f4',
    color: '#fff',
  },
  green: {
    background: '#43A047',
    color: '#fff',
  },
  label: {
    maxWidth: '100px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}));

export default function EnhancedTable({ headCells, url }) {
  const classes = useStyles();
  const { history } = useReactRouter();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    rowsPerPageOptions: [10, 15, 25],
    total: 10,
    rowsPerPage: 10,
    page: 1,
    lastPage: 5,
  });

  const [open, setOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalRemove, setModalRemove] = useState(false);

  const [values, setValues] = useState({
    id: '',
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleClick(event, name, data) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [name];
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setModalName(data);
    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const handleModalRemove = () => {
    setModalRemove(!modalRemove);
  };

  async function handleDelete(e) {
    e.preventDefault();
    try {
      await api.delete(`/lessons/${selected[0]}`);
      toast.success('Aula removida com sucesso!');
      handleModalRemove();
      setSelected([]);
      history.go('/');
    } catch (error) {
      toast.error('Não foi possivel remover a Aula!');
    }
  }

  const handleOpenClose = (id, name, surname, email) => {
    setOpen(!open);
    setValues({ id, name, surname, email, password: '' });
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const correctUrl = link =>
    link.substring(0, link.indexOf('?dl=0')).concat('?dl=1');

  const colorStatus = status => {
    if (status === 'waiting_for_the_pedagogical') {
      return 'yellow';
    } else if (status === 'returned') {
      return 'secodary';
    } else if (status === 'revision') {
      return 'primary';
    } else if (status === 'finished') {
      return 'green';
    }
    return 'gray';
  };

  const correctStatus = status => {
    if (status === 'draft') {
      return 'Rascunho';
    }
    if (status === 'waiting_for_the_pedagogical') {
      return 'Aguardando pedagógico';
    } else if (status === 'returned') {
      return 'devolvido para o prof.';
    } else if (status === 'revision') {
      return 'revisão';
    } else if (status === 'finished') {
      return 'finalizado';
    }
    return status;
  };

  useEffect(() => {
    async function LoadData(link) {
      setLoading(true);
      const response = await api.get(
        `${link}?page=${page +
          1}&limit=${rowsPerPage}&orderBy=${orderBy}&orderDirection=${order}`
      );
      setData(response.data.data);
      setPagination({
        rowsPerPageOptions: [5, 15, 25],
        total: parseInt(response.data.total, 10),
        rowsPerPage: response.data.perPage,
        page: response.data.page,
        lastPage: response.data.lastPage,
      });

      setPage(response.data.page - 1);
      setRowsPerPage(response.data.perPage);
      setLoading(false);
    }
    LoadData(url);
  }, [order, orderBy, page, url, rowsPerPage]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
          >
            <Thead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />

            <ModalRemove
              handleModalRemove={handleModalRemove}
              modalRemove={modalRemove}
              modalName={modalName}
              handleDelete={e => handleDelete(e)}
            />
            <TableBody>
              {!loading &&
                data &&
                data.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={event =>
                            handleClick(event, row.id, row.title)
                          }
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="left">
                        {formatDate(row.created_at)}
                      </TableCell>
                      <TableCell align="left">
                        <Chip
                          classes={{ label: classes.label }}
                          variant="outlined"
                          avatar={
                            row.user.dropbox_id ? (
                              <Avatar src={correctUrl(row.user.dropbox.url)} />
                            ) : (
                              <Avatar>
                                <FaceIcon />
                              </Avatar>
                            )
                          }
                          label={row.user.name}
                          className={classes.textChip}
                        />
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">
                        {row.module.blocks.courses.name}
                      </TableCell>
                      <TableCell align="left">
                        {row.module.blocks.name}
                      </TableCell>
                      <TableCell align="left">{row.module.name}</TableCell>
                      <TableCell align="left">
                        <Chip
                          className={classes[colorStatus(row.status)]}
                          label={correctStatus(row.status)}
                        />
                      </TableCell>

                      <TableCell align="left">
                        <NavLink to={`/edit-lessons/${row.id}`}>Editar</NavLink>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 38 * emptyRows }}>
                  <TableCell colSpan={10} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </div>
        {!loading && pagination && (
          <TablePagination
            rowsPerPageOptions={[5, 15, 20]}
            component="div"
            count={pagination.total}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Linhas por página"
            backIconButtonProps={{
              'aria-label': 'Página anterior',
            }}
            nextIconButtonProps={{
              'aria-label': 'Proxima Página',
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </div>
  );
}

EnhancedTable.propTypes = {
  data: PropTypes.array.isRequired,
  loadData: PropTypes.func,
};

EnhancedTable.defaultProps = {
  loadData: () => {},
};

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function ModalRemove({
  handleModalRemove,
  modalRemove,
  modalName,
  handleDelete,
}) {
  const [modalStyle] = useState(getModalStyle);
  return (
    <>
      {/* MODAL - EXCLuir PASTA */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalRemove}
        onClose={handleModalRemove}
      >
        <ModalContainer style={modalStyle}>
          <h2 id="simple-modal-title">
            Deseja remover esse usuário -{' '}
            <span>
              <strong>{modalName}</strong>
            </span>{' '}
            ?
          </h2>
          <div>
            <p>
              Tem certeza que deseja remover - <strong>{modalName}</strong>
            </p>
          </div>
          <div className="btn-content">
            <Button
              variant="outlined"
              color="default"
              onClick={handleModalRemove}
              type="button"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={handleDelete}
            >
              Sim
            </Button>
          </div>
        </ModalContainer>
      </Modal>
    </>
  );
}
