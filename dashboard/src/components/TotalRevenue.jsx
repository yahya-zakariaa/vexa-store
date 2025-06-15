"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";

export default function Component() {
  return (
    <Card className="h-fit gap-0">
      <CardHeader>
        <CardTitle>Total Revenue</CardTitle>
        <CardDescription>+20.1% from last month</CardDescription>
      </CardHeader>
      <CardContent className=" mb-5 mt-2">
        <h3 className="text-xl font-bold">$30,000.33</h3>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by +20.1% this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
