import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import "../../../assets/css/category.css";
import Fade from "@material-ui/core/Fade";
import authaxios from "../../interceptors/authaxios";
import ReactPaginate from "react-paginate";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { technologyProduct } from "../../../redux/actions/action";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 650,
  },
}));

export default function MachineTable({ search, setvals, vals }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [modals, setmodals] = useState("");
  const [id, setid] = useState(null);
  const [rowid, setrowid] = useState(null);
  const [values, setvalues] = useState([]);
  const [name, setname] = useState("");
  const [sites, setsites] = useState([]);
  const [sitesId, setsitesId] = useState(null);
  const [machine, setmachine] = useState(null);
  const [val, setVal] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      await authaxios
        .get("Sites")
        .then((res) => {
          if (isMounted) setsites(res.data);
        })
        .catch((err) => {
          console.error(err.message);
        });
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      await authaxios
        .get("Machines")
        .then((res) => {
          if (isMounted) setvalues(res.data);
        })
        .catch((err) => {
          console.error(err.message);
        });
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, [vals]);

  const [filteredCountries, setfilteredCountries] = useState([]);

  useEffect(() => {
    const dat = values.filter((country) => {
      return country.machineName.indexOf(search) !== -1;
    });
    setfilteredCountries(dat);
  }, [search, values]);

  const itemsPerPage = 20;
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredCountries.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredCountries.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredCountries]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredCountries.length;
    setItemOffset(newOffset);
  };

  const handleOpen = (x) => {
    setid(x);
    setOpen(true);
    setmodals("delete");
  };
  const handleOpen1 = (x) => {
    sites
      .filter((nam) => nam.id === x.siteId)
      .map((itm) => {
        return setVal(itm);
      });
    setrowid(x.id);
    setname(x.machineName);
    setmachine(x.machineType);
    setOpen(true);
    setmodals("edit");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    authaxios.delete(`Machines?id=${id}`).then((res) => {
      setOpen(false);
      setvals(!vals);
    });
  };

  const handleClose3 = () => {
    authaxios
      .put(`Machines`, {
        id: rowid,
        machineName: name,
        siteId: sitesId,
        machineType: machine,
      })
      .then((res) => {
        setOpen(false);
        setvals(!vals);
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(
        technologyProduct({
          type: "machine",
          val: currentItems,
        })
      );
    }

    return () => {
      isMounted = false;
    };
  }, [currentItems, dispatch]);

  return (
    <div className="tech">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Machine Name</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems &&
              currentItems.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}
                  >
                    {row.machineName}
                  </TableCell>
                  <TableCell align="center">
                    <div className="action">
                      <div>
                        <EditIcon
                          onClick={() => handleOpen1(row)}
                          color="primary"
                        />
                      </div>
                      <div>
                        <DeleteIcon
                          onClick={() => handleOpen(row.id)}
                          color="secondary"
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="modals">
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade style={{ width: "40%" }} in={open}>
              {modals === "delete" ? (
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">Are you sure ?</h2>
                  <p id="transition-modal-description">
                    You want be able to delete this!
                  </p>
                  <div className="deletess">
                    <div>
                      <Button
                        style={{ backgroundColor: "red" }}
                        onClick={handleClose2}
                        variant="contained"
                        color="primary"
                      >
                        Yes delete it?
                      </Button>
                    </div>
                    <div>
                      <Button onClick={handleClose} variant="contained">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ) : modals === "edit" ? (
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">Edit Machine</h2>
                  <div className="middles">
                    <p>Machine Name</p>
                    <input
                      type={"text"}
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      placeholder="Enter Machine Name"
                      className="mb-4 input"
                    />
                    <p>Site</p>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={sites}
                      value={val}
                      getOptionLabel={(options) => options.siteName}
                      onChange={(event, newValue) => {
                        setsitesId(newValue.id);
                      }}
                      sx={{ width: "100%", marginBottom: "25px" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Choose site" />
                      )}
                    />
                    <p>Machine Type</p>
                    <input
                      type={"text"}
                      value={machine}
                      onChange={(e) => setmachine(e.target.value)}
                      placeholder="Enter Machine Type"
                      className="mb-4 input"
                      maxLength={1}
                    />
                  </div>
                  <div className="deletess">
                    <Button variant="contained" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      onClick={handleClose3}
                      variant="contained"
                      style={{ backgroundColor: "#0f5953", color: "white" }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : null}
            </Fade>
          </Modal>
        </div>
        <div className="mt-3 paginate">
          <ReactPaginate
            nextLabel={<ArrowForwardIos />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<ArrowBackIos />}
            renderOnZeroPageCount={null}
          />
        </div>
      </TableContainer>
    </div>
  );
}
