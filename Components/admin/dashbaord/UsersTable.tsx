import React from "react";
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
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const UsersTable = async () => {
  const users = await prisma.user.findMany();

  return (
    <Card className="w-[800px] sm:w-[400px] md:w-[400px] shadow-md my-6">
      <Table>
        <TableCaption>A list of Users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.N</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>emailVerified</TableHead>
            <TableHead>TwoFactorEnabled</TableHead>
            <TableHead className="text-right">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users &&
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  {" "}
                  {user.emailVerified
                    ? user.emailVerified.toDateString()
                    : "Not Verified"}
                </TableCell>
                <TableCell className=" items-center">
                  {user.isTwoFactorEnabled
                    ? user.isTwoFactorEnabled.toString()
                    : "Not enabled"}
                </TableCell>
                <TableCell className="text-right">{user.role}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default UsersTable;
