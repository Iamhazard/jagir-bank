'use client'
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Card } from "@/Components/ui/card";
import { PrismaClient, User } from "@prisma/client";

import UserDelete from "./UserDelete";
import axios from "axios";
//import { User } from "@/@types/enum";

const prisma = new PrismaClient();

const UsersTable = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  //console.log({ users })


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/users`);
        const fetchedUsers: User[] = response.data;
        setUsers(fetchedUsers);
        //console.log("Fetched users:", fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      setIsDeleting(true);

      const response = await axios.delete(`/api/users/${userId}`);
      console.log("User deleted:", response.data);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));

    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (

    <Table>
      <TableCaption>A list of Users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] sm:w-auto">S.N</TableHead>
          <TableHead className="hidden sm:table-cell">Email</TableHead>
          <TableHead className="hidden sm:table-cell">Name</TableHead>
          <TableHead className="hidden sm:table-cell">emailVerified</TableHead>
          <TableHead className="hidden sm:table-cell">TwoFactorEnabled</TableHead>
          <TableHead className="text-right sm:text-left">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users &&
          users.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium ">{index + 1}</TableCell>
              <TableCell className="sm:w-1/6 w-fit">{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                {" "}
                {user.emailVerified
                  ? new Date(user.emailVerified).toDateString()
                  : "Not Verified"}
              </TableCell>
              <TableCell className=" items-center">
                {user.isTwoFactorEnabled
                  ? user.isTwoFactorEnabled.toString()
                  : "Not enabled"}
              </TableCell>
              <TableCell className="text-right">{user.role}</TableCell>
              <TableCell className="text-right">   <UserDelete userId={user.id} onDelete={() => handleDeleteUser(user.id)} /></TableCell>

            </TableRow>
          ))}
      </TableBody>
    </Table>

  );
};

export default UsersTable;
