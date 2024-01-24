"use client";

import React from "react";
import ImageSlider from "./ImageSlider";

import { Card } from "../ui/card";

const images = [
  "https://images.unsplash.com/photo-1533167649158-6d508895b680?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1533167649158-6d508895b680?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const ProgresSlider = () => {
  return (
    <div className="flex">
      <Card className="w-[280px]">
        <ImageSlider images={images} />
      </Card>
    </div>
  );
};

export default ProgresSlider;
