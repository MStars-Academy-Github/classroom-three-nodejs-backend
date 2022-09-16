import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import userSWR from "swr";

const editPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const rolesApi = `http://localhost:3000/roles/${id}`;
  const fetcher = async (url) =>
    await axios.get(url).then((res) => console.log(res.data.data));
  const { data, error } = userSWR(rolesApi, fetcher);
  console.log(data);
  function handleRoles(e) {
    e.preventDefault();
    console.log(e.target.role_name.value);
    console.log(e.target.role_status.value);
  }
  return (
    <div>
      <form action="form" url="/" onSubmit={handleRoles}>
        <label htmlFor="role_name">Role name</label> <br />
        <input name="role_name" value={data && data?.role_name}></input>
        <br />
        <label htmlFor="role_status">Role status</label>
        <br />
        <input name="role_status" value={data && data?.role_status}></input>
        <br />
        <button type="submit">Click me</button>
      </form>
    </div>
  );
};

export default editPage;

// editPage.getInitialProps = async (ctx) => {
//   const res = await axios.get("http://localhost:3000/roles");
//   const json = await res.data.data;
//   return { roles: json };
// };
