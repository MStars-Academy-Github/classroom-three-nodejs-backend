import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useSWR from "swr";
import axios from "axios";

const RolesList = () => {
  const rolesApi = "http://localhost:4000/v1/roles";
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(rolesApi, fetcher);
  console.log(data);
  console.log(error);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Role ID</TableCell>
            <TableCell align="right">Role Name</TableCell>
            <TableCell align="right">Role status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data &&
            data?.data.map((d) => {
              console.log(d);
              return (
                <TableRow
                  key={d._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{d._id}</TableCell>
                  <TableCell align="right">{d.role_name}</TableCell>
                  <TableCell align="right">{d.role_status}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RolesList;
