import React from "react";
import styles from "../../ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { MdAdd, MdDelete, MdPreview } from "react-icons/md";
import { fetchUsers } from  "../../databaseConnection/routes/routes"

const UsersPage =  async ({searchParams}) => {

  const q=searchParams?.q || ""
  const users = await fetchUsers(q);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/add-users">
          <MdAdd size={40} className={styles.addButton} />
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Institution</th>
            <th>Next Review Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={"/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                </div>
              </td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.userRole}</td>
              <td>{user.institutionDetails.institutionName}</td>
              <td>{new Date(user.nextReviewDate).toLocaleString()}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user._id}`}>
                    <MdPreview
                      size={40}
                      className={`${styles.button} ${styles.view}`}
                    />
                  </Link>
                  <MdDelete
                    size={40}
                    className={`${styles.button} ${styles.delete}`}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default UsersPage;
