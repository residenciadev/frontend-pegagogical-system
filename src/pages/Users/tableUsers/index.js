import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { toast } from 'react-toastify';

import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import formatDate from '../../../utils/formatDate';
import api from '../../../services/api';

import EnhancedTableHead from './tableHeader';
import EnhancedTableToolbar from './TableToolbar';
import ModalRemove from '../ModalDelete';
import ModalEdit from '../ModalEdit';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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
  name: {
    display: 'flex',
    alignItems: 'center',
  },
  textName: {
    marginRight: '8px',
  },
}));

export default function EnhancedTable({ data: rows, loadData }) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalRemove, setModalRemove] = useState(false);

  const [userSelected, setUserSelected] = useState('');

  const userOptions = [
    { value: 'teacher', label: 'Professor' },
    { value: 'pedagogical', label: 'Pedagógico' },
    { value: 'revision', label: 'Revisão' },
  ];

  const [values, setValues] = useState({
    id: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    type: '',
    search: '',
    cellphone: '',
    formation: '',
  });
  const [state, setState] = useState({
    password: false,
  });

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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
      await api.delete(`/users/${selected[0]}`);
      toast.success('Usuário removido com sucesso!');
      handleModalRemove();
      setSelected([]);
      loadData();
    } catch (error) {
      toast.error('Não foi possivel remover o usuário!');
    }
  }

  const handleOpenClose = (id, name, surname, email, cellphone, formation) => {
    setOpen(!open);
    setValues({
      id,
      name,
      surname,
      email,
      cellphone,
      formation,
      password: '',
    });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleChangeCheckbox = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  function handleSelectType(e) {
    setUserSelected(e);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const {
      id,
      name,
      surname,
      email,
      password,
      type,
      cellphone,
      formation,
    } = values;

    try {
      if (state.password && userSelected) {
        await api.put(`/users/${id}`, {
          name,
          surname,
          email,
          password,
          type: userSelected.value,
          cellphone,
          formation,
        });
      } else if (state.password) {
        await api.put(`/users/${id}`, {
          name,
          surname,
          email,
          password,
          cellphone,
          formation,
        });
      }
      if (userSelected) {
        await api.put(`/users/${id}`, {
          name,
          surname,
          email,
          type: userSelected.value,
          cellphone,
          formation,
        });
      }
      await api.put(`/users/${id}`, {
        name,
        surname,
        email,
        type,
        cellphone,
        formation,
      });

      toast.success('Usuário edita com sucesso !');
      handleOpenClose();
      loadData();
    } catch (error) {
      toast.error('Houve um problema ao editar o Usuário!');
    }
  }

  function handleSearch(e) {
    e.preventDefault();

    loadData(values.search);
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const correctUrl = url =>
    url.substring(0, url.indexOf('?dl=0')).concat('?dl=1');

  const correctType = type => {
    if (type === 'pedagogical') {
      return 'Pedagógico';
    }
    if (type === 'teacher') {
      return 'Professor(a)';
    }
    if (type === 'revision') {
      return 'Revisão';
    }
    return type;
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDelete={() => handleModalRemove()}
          handleSearch={handleSearch}
          search={values}
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <ModalEdit
              handleOpenClose={handleOpenClose}
              open={open}
              values={values}
              handleChange={handleChange}
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              handleSubmit={handleSubmit}
              state={state}
              handleChangeCheckbox={handleChangeCheckbox}
              handleSelectType={handleSelectType}
              setUserSelected={setUserSelected}
              userOptions={userOptions}
            />
            <ModalRemove
              handleModalRemove={handleModalRemove}
              modalRemove={modalRemove}
              modalName={modalName}
              handleDelete={e => handleDelete(e)}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
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
                            handleClick(event, row.id, row.name)
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
                        <span className={classes.name}>
                          {row.dropbox_id ? (
                            <Avatar
                              src={correctUrl(row.dropbox.url)}
                              className={classes.textName}
                            />
                          ) : (
                            <Avatar className={classes.textName}>
                              <FaceIcon />
                            </Avatar>
                          )}

                          {`${row.name} ${row.surname}`}
                        </span>
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">
                        {correctType(row.type)}
                      </TableCell>
                      <TableCell align="left">
                        {formatDate(row.created_at)}
                      </TableCell>

                      <TableCell align="left">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleOpenClose(
                              row.id,
                              row.name,
                              row.surname,
                              row.email,
                              row.cellphone,
                              row.formation
                            )
                          }
                        >
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

EnhancedTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
      PropTypes.func,
      PropTypes.array,
    ])
  ).isRequired,
  loadData: PropTypes.func.isRequired,
};
