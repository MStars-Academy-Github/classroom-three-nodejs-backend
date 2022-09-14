import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";

const EditPage = () => {
  const router = useRouter();

  console.log(router.query);

  const { id } = router.query;
  const rolesApi = `http://localhost:4000/v1/roles/${id}`;
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(rolesApi, fetcher);

  return (
    <form action="PUT" url="/">
      <label htmlFor="role_name">Role name</label>
      <br></br>
      <input name="role_name" value={data && data?.data.role_name}></input>
      <br></br>
      <label htmlFor="role_status">Role name</label>
      <br></br>
      <input name="role_status" value={data && data?.data.role_status}></input>
      page
    </form>
  );
};

export default EditPage;
