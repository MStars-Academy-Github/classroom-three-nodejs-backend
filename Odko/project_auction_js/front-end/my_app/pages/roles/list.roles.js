import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import userSWR from "swr";
import axios from "axios";
import Link from "next/link";

export default function RolesList() {
  const [roles, useRoles] = React.useState();
  const rolesApi = "http://localhost:3000/roles";
  const fetcher = async (url) =>
    await axios.get(url).then((res) => useRoles(res.data.data));
  const { data, error } = userSWR(rolesApi, fetcher);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Role_Id</TableCell>

            <TableCell>Role_Name</TableCell>
            <TableCell>Role_Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles &&
            roles.map((role, i) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={i}
              >
                <TableCell component="th" scope="row">
                  {role._id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {role.role_name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {role.role_status}
                </TableCell>
                <TableCell onClick={() => {}}>
                  <Link href={`/roles/edit/${role._id}`}> Edit</Link>
                </TableCell>
                <TableCell onClick={() => {}}>
                  <Link href={`/roles/edit/${role._id}`}> Delete</Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
