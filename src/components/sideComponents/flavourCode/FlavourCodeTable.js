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
import { useDispatch, useSelector } from "react-redux";
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

export default function FlavourCodeTable({ search, setvals, vals }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [modals, setmodals] = useState("");
  const [id, setid] = useState(null);
  const [rowid, setrowid] = useState(null);
  const [values, setvalues] = useState([]);
  const [name, setname] = useState("");

  const dispatch = useDispatch();

  const customerId = useSelector(
    (state) => state.addFlavourCategory.flavourCategory
  );

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      await authaxios
        .get("FlavourCodes")
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

  const handleOpen = (x) => {
    setid(x);
    setOpen(true);
    setmodals("delete");
  };
  const handleOpen1 = (x) => {
    setrowid(x.id);
    setname(x.flavourCodeName);
    setOpen(true);
    setmodals("edit");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    authaxios.delete(`FlavourCodes?id=${id}`).then((res) => {
      setOpen(false);
      setvals(!vals);
    });
  };

  const handleClose3 = async () => {
    await authaxios
      .put(`FlavourCodes`, {
        id: rowid,
        flavourCodeName: name,
        flavourCategoryId: customerId,
      })
      .then((res) => {
        setOpen(false);
        setvals(!vals);
      })
      .catch((err) => console.log(err.message));
  };

  const filteredCountries = values.filter((country) => {
    return (
      country.flavourCodeName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  });

  const [filteredCountries2, setfilteredCountries2] = useState([]);

  useEffect(() => {
    const dat = values.filter((country) => {
      return (
        country.flavourCodeName.toLowerCase().indexOf(search.toLowerCase()) !==
          -1 && country.flavourCategoryId === customerId
      );
    });
    setfilteredCountries2(dat);
  }, [search, values, customerId]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(
        technologyProduct({
          type: "flavourCode",
          val: filteredCountries2,
        })
      );
    }

    return () => {
      isMounted = false;
    };
  }, [filteredCountries2, dispatch]);

  return (
    <div className="tech">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Flavour Code</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCountries &&
              filteredCountries
                .filter((name) => name.flavourCategoryId === customerId)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell
                      align="center"
                      style={{ textTransform: "capitalize" }}
                    >
                      {row.flavourCodeName}
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
                  <h2 id="transition-modal-title">Edit Flavour Code</h2>
                  <div className="middle">
                    <p>Flavour Code</p>
                    <input
                      type={"text"}
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      placeholder="Enter Flavour Code"
                    />
                  </div>
                  <div className="deletess">
                    <Button variant="contained" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      onClick={() => handleClose3()}
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
      </TableContainer>
    </div>
  );
}
