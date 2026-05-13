// @ts-nocheck
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const STATS = [
  { value: "5", label: "Ирсэн тээврийн саналууд" },
  { value: "3", label: "Нийт ажилт хийлгэсэн тоо" },
  { value: "218", label: "Нийт хүлээн авсан ачаа барааны м3" },
  { value: "2", label: "Ирсэн нэхэмжлэл" },
  { value: "327", label: "Нийт бүртгэлтэй ачаа барааны м3" },
  { value: "58", label: "Хамтран ажиллаж байгаа компани" },
];

const Dashboard = () => {
  return (
    <div className="w-full space-y-8">
      <header className="space-y-1.5 border-b border-border/60 pb-6">
        <h1 className="text-regular font-semibold tracking-tight text-foreground">
          Хянах самбар
        </h1>
        <p className="text-regular text-muted-foreground">
          Системийн тойм үзүүлэлтүүд
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {STATS.map((row) => (
          <Card
            key={row.label}
            className={cn(
              "border-border/80 bg-card text-card-foreground shadow-sm",
              "rounded-xl transition-shadow duration-200 hover:shadow-md"
            )}
          >
            <CardContent className="flex min-h-[6.5rem] flex-row items-center gap-4 p-5 sm:min-h-[7rem]">
              <div className="shrink-0 tabular-nums text-regular font-semibold leading-none text-primary">
                {row.value}
              </div>
              <p className="flex-1 text-left text-regular font-medium leading-snug text-muted-foreground">
                {row.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
