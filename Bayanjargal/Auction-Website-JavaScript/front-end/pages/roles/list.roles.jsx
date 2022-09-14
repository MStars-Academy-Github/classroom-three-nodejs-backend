import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";
const RoleList = () => {
  const rolesApi = "http://localhost:4000/v1/roles";
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(rolesApi, fetcher);
  console.log(data);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Role ID </TableCell>
            <TableCell>Role Name</TableCell>
            <TableCell>Role status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.data.map((d, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{d._id}</TableCell>
                  <TableCell>{d.role_name}</TableCell>
                  <TableCell>{d.role_status}</TableCell>
                  <TableCell
                    onClick={() => {
                      console.log("edit clicked");
                    }}
                  >
                    <Link href={`/roles/edit/${d._id}`}>Edit</Link>
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      console.log("edit clicked");
                    }}
                  >
                    Delete
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoleList;
