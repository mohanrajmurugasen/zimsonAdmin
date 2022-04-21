import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../../../assets/css/category.css";
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

export default function PurchaseTable({ search, setvals, vals }) {
  const classes = useStyles();
  const [values, setvalues] = useState([]);

  const dispatch = useDispatch();

  const masProductLine = useSelector(
    (state) => state.addMasProductLine.masProductLine
  );

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      await authaxios
        .get(
          `purchaseById/${masProductLine.location}/${masProductLine.brand}/${masProductLine.star}/${masProductLine.rate}`
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

  const [filteredCountries, setfilteredCountries] = useState([]);

  useEffect(() => {
    const dat = values.filter((country) => {
      return (
        country.location.toLowerCase().indexOf(search.toLowerCase()) !== -1
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
          type: "purchase",
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
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">About</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Star</TableCell>
              <TableCell align="center">Reason</TableCell>
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
                    {row.user}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}
                  >
                    {row.location}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}
                  >
                    {row.about}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}
                  >
                    {row.brand}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}
                  >
                    {row.star}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}
                  >
                    {row.reason}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
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
