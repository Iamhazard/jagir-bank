"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/Components/ui/card";
import React, { useEffect } from "react";
import ChartData from "@/Components/admin/LineChart/ChartData";
import { admin } from "@/actions/admin";
import toast from "react-hot-toast";

const DefaultDashboard = () => {
  const onServerActionClick = () => {
    admin()
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.success) {
          toast.success(data.success);
        }
      })
  }
  useEffect(() => {
    const onApiRouteClick = () => {
      fetch("/api/admin")
        .then((response) => {
          if (response.ok) {
            toast.success("Allowed API Route!");
          } else {
            toast.error("Forbidden API Route!");
          }
        })
    }
    onApiRouteClick()
  }, [])



  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Card className="w-[400px]">
            <CardHeader>
              <CardDescription>JAGIRBANK users DataSet</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartData />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};
0;

export default DefaultDashboard;
