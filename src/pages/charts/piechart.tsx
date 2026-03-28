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

const chartData = [
    { type: "revenue", amount: 4500, fill: "var(--color-revenue)" },
    { type: "income", amount: 3200, fill: "var(--color-income)" },
    { type: "other", amount: 1500, fill: "var(--color-other)" },
]

const chartConfig = {
    amount: {
        label: "Amount",
    },
    revenue: {
        label: "Revenue",
        color: "var(--chart-1)",
    },
    income: {
        label: "Income",
        color: "var(--chart-2)",
    },
    other: {
        label: "Other",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig

export function FinancialDonutChart() {
    const totalAmount = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.amount, 0)
    }, [])

    return (
        <Card className="flex flex-col w-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Today Analytics</CardTitle>
                <CardDescription>
                    {new Date().toLocaleDateString()} - {new Date().toLocaleString('default', { month: 'long' })}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-85.5"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="amount"
                            nameKey="type"  
                            innerRadius={90}
                            outerRadius={120}
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
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {totalAmount.toLocaleString()} Ks
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total Value
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
                     Showing Financial Analytics For Today
                </div>
                <div className="leading-none text-muted-foreground">
                    Detailed breakdown of Narihito's Revenue
                </div>
            </CardFooter>
        </Card>
    )
}