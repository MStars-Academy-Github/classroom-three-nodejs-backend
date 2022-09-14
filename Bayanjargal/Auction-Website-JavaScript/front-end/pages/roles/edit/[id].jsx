import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
function EditPage() {
  const router = useRouter();
  const id = router.query.id;
  //   console.log(router);
  const rolesByIdApi = `http://localhost:4000/v1/roles/${id}`;
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(rolesByIdApi, fetcher);
  console.log(data);
  console.log(id);
  //   console.log(error);
  return (
    <div>
      <form action="PUT" url="/">
        <label htmlFor="role_name">Role name</label>
        <input type="text" defaultValue={data && data.data.role_name} />
        <br />
        <label htmlFor="role_status">Role status</label>
        <input type="text" defaultValue={data && data.data.role_status} />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditPage;
