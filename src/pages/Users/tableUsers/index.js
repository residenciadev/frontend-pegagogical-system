import React, { useState } from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

import { toast } from 'react-toastify';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Select from 'react-select';

import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';

import formatDate from '../../../utils/formatDate';
import api from '../../../services/api';

import { ModalContainer, ButtonCreate, ModalContent } from '../styles';

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

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: '#',
  },

  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nome',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'E-mail',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Tipo',
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: 'Data de criação',
  },

  {
    id: 'button',
    numeric: false,
    disablePadding: false,
    label: '',
  },
];
function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> */}
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.shape({
    visuallyHidden: PropTypes.string,
  }).isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row-reverse',
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  search: {
    position: 'relative',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    onDelete,
    handleSearch,
    search,
    handleChange,
    handleKeyPress,
  } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Usuários
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list" onClick={e => handleSearch(e)}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
        )}
        {numSelected <= 0 && (
          <>
            <InputBase
              className={classes.input}
              placeholder="Pesquisar..."
              inputProps={{ 'aria-label': 'Pesquisar' }}
              value={search.search}
              onChange={handleChange('search')}
              onKeyPress={handleKeyPress}
            />
          </>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
};

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
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
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

  function handleChangeDense(event) {
    setDense(event.target.checked);
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
            size={dense ? 'small' : 'medium'}
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
                        <Button
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
                          Editar
                        </Button>
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
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Linhas pequenas"
      />
    </div>
  );
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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

function ModalEdit({
  handleOpenClose,
  open,
  values,
  handleChange,
  handleClickShowPassword,
  handleMouseDownPassword,
  handleSubmit,
  state,
  handleChangeCheckbox,
  handleSelectType,
  userSelected,
  userOptions,
}) {
  const [modalStyle] = useState(getModalStyle);
  const classes = useModalStyles();
  return (
    <>
      {/* MODAL - CRIAR PASTA */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleOpenClose}
      >
        <ModalContainer style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Cadastrar Usuário</h2>
          <ModalContent>
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-bare-nome"
                fullWidth
                placeholder="Nome"
                margin="normal"
                inputProps={{ 'aria-label': 'bare' }}
                value={values.name}
                onChange={handleChange('name')}
                label="Nome"
              />
              <TextField
                id="outlined-bare-sobrenome"
                fullWidth
                placeholder="Sobrenome"
                margin="normal"
                inputProps={{ 'aria-label': 'bare' }}
                value={values.surname}
                onChange={handleChange('surname')}
                label="Sobrenome"
              />
              <TextField
                id="outlined-bare-email"
                fullWidth
                placeholder="E-mail"
                margin="normal"
                inputProps={{ 'aria-label': 'bare' }}
                value={values.email}
                onChange={handleChange('email')}
                type="email"
                label="E-mail"
              />
              <TextField
                id="outlined-bare-cellphone"
                fullWidth
                placeholder="Telefone"
                margin="normal"
                inputProps={{ 'aria-label': 'bare' }}
                value={values.cellphone}
                onChange={handleChange('cellphone')}
                type="text"
                label="Telefone"
              />
              <TextField
                id="outlined-bare-formation"
                fullWidth
                placeholder="Graduação"
                margin="normal"
                inputProps={{ 'aria-label': 'bare' }}
                value={values.formation}
                onChange={handleChange('formation')}
                type="text"
                label="Graduação"
              />
              <Select
                className={classes.select}
                classNamePrefix="select"
                isSearchable
                name="type"
                placeholder="Selecione o tipo de usuário caso deseja mudar"
                defaultValue={values.type}
                options={userOptions}
                value={userSelected}
                onChange={handleSelectType}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.password}
                    onChange={handleChangeCheckbox('password')}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Deseja editar a senha ?"
              />
              {state.password && (
                <FormControl fullWidth>
                  <InputLabel htmlFor="adornment-password">Password</InputLabel>
                  <Input
                    id="adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              )}

              <div>
                <ButtonCreate variant="contained" color="primary" type="submit">
                  Atualizar
                </ButtonCreate>
                <Button
                  variant="outlined"
                  color="default"
                  onClick={handleOpenClose}
                  type="button"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
}

ModalEdit.propTypes = {
  handleOpenClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    email: PropTypes.string,
    type: PropTypes.string,
    showPassword: PropTypes.string,
    password: PropTypes.string,
    formation: PropTypes.string,
    cellphone: PropTypes.string,
  }).isRequired,
  state: PropTypes.shape({
    password: PropTypes.bool,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleMouseDownPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChangeCheckbox: PropTypes.func.isRequired,
  handleSelectType: PropTypes.func.isRequired,
  userOptions: PropTypes.array.isRequired,
  userSelected: PropTypes.func,
};

ModalEdit.defaultProps = {
  userSelected: () => {},
};

function ModalRemove({
  handleModalRemove,
  modalRemove,
  modalName,
  handleDelete,
}) {
  const [modalStyle] = useState(getModalStyle);
  const classes = useModalStyles();
  return (
    <>
      {/* MODAL - EXCLuir PASTA */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalRemove}
        onClose={handleModalRemove}
      >
        <ModalContainer style={modalStyle} className={classes.paper}>
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

ModalRemove.propTypes = {
  handleModalRemove: PropTypes.func.isRequired,
  modalRemove: PropTypes.bool.isRequired,
  modalName: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
