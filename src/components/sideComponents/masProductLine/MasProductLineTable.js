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
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { useDispatch } from "react-redux";
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

export default function MasProductLineTable({ search, setvals, vals }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [modals, setmodals] = useState("");
  const [id, setid] = useState(null);
  const [rowid, setrowid] = useState(null);
  const [values, setvalues] = useState([]);
  const [name, setname] = useState("");

  const dispatch = useDispatch();

  const masProductLine = useSelector(
    (state) => state.addMasProductLine.masProductLine
  );

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      await authaxios
        .get(
          `MasProductLineDetail/${masProductLine.technologyId}/${masProductLine.customerId}/${masProductLine.brandId}/${masProductLine.categoryId}/${masProductLine.productId}/0`
        )
        .then((res) => {
          if (isMounted) {
            setvalues(res.data);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, [masProductLine, vals]);

  const handleOpen = (x) => {
    setid(x);
    setOpen(true);
    setmodals("delete");
  };
  const handleOpen1 = (x, y) => {
    setrowid(x);
    setname(y);
    setOpen(true);
    setmodals("edit");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    authaxios.delete(`MasProductLines?id=${id}`).then((res) => {
      setvals(!vals);
      setOpen(false);
    });
  };

  const handleClose3 = async () => {
    await authaxios
      .put(`MasProductLines`, {
        id: rowid,
        technologyId: masProductLine.technologyId,
        customerId: masProductLine.customerId,
        brandId: masProductLine.brandId,
        categoryId: masProductLine.categoryId,
        productId: masProductLine.productId,
        declaredWeight:
          name.slice(-1) === "g"
            ? `${name}G`
            : name.slice(-1) === "G"
            ? name
            : `${name}G`,
      })
      .then((res) => {
        setOpen(false);
        setvals(!vals);
      })
      .catch((err) => console.log(err.message));
  };

  const [filteredCountries, setfilteredCountries] = useState([]);

  useEffect(() => {
    const dat = values.filter((country) => {
      return (
        country.declaredWeight.toLowerCase().indexOf(search.toLowerCase()) !==
        -1
      );
    });
    setfilteredCountries(dat);
  }, [search, values]);

  // We start with an empty list of items.
  const itemsPerPage = 20;
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredCountries.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredCountries.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredCountries]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredCountries.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(
        technologyProduct({
          type: "productLine",
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
              <TableCell align="center">Declared Weight</TableCell>
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
                    {row.declaredWeight}
                  </TableCell>
                  <TableCell align="center">
                    <div className="action">
                      <div>
                        <EditIcon
                          onClick={() =>
                            handleOpen1(row.id, row.declaredWeight)
                          }
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
                  <h2 id="transition-modal-title">Edit Declared Weight</h2>
                  <div className="middle">
                    <p>Declared Weight</p>
                    <input
                      type={"text"}
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      placeholder="Enter Declared Weight"
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
