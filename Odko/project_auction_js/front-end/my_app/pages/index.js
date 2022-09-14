import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import RolesList from "./roles/list.roles";

export default function Home() {
  return (
    <div>
      <RolesList />
    </div>
  );
}
