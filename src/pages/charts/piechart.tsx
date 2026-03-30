"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useAuthStore } from "@/store/authstore"

const chartData = [
    { category: "food", amount: 800, fill: "var(--color-food)" },
    { category: "transport", amount: 300, fill: "var(--color-transport)" },
    { category: "work", amount: 150, fill: "var(--color-work)" },
    { category: "other", amount: 500, fill: "var(--color-other)" },
]

const chartConfig = {
    amount: {
        label: "Amount",
    },
    food: {
        label: "Food",
        color: "var(--chart-1)",
    },
    transport: {
        label: "Transport",
        color: "var(--chart-2)",
    },
    work: {
        label: "Work",
        color: "var(--chart-3)",
    },
    other: {
        label : "Other",
        color : "var(--chart-4)"
    }
} satisfies ChartConfig


export function TotalRevenueChart() {
    //Store
    const { name, email, id, type } = useAuthStore();

    //Calculate
    const totalRevenue = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.amount, 0)
    }, [])

    return (
        <Card className="flex flex-col w-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Total Income</CardTitle>
                <CardDescription>Total Income For Each Categories.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-62.5"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="amount"
                            nameKey="category"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalRevenue.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total Ks
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Showing Financials Revenue Of {name}'s
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total revenue from all sources
                </div>
            </CardFooter>
        </Card>
    )
}