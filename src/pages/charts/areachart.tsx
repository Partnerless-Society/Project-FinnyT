"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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
    { month: "January", revenue: 186, income: 80, totalbudget: 300 },
    { month: "February", revenue: 305, income: 200, totalbudget: 300 },
    { month: "March", revenue: 237, income: 120, totalbudget: 300 },
    { month: "April", revenue: 73, income: 190, totalbudget: 300 },
    { month: "May", revenue: 209, income: 130, totalbudget: 300 },
    { month: "June", revenue: 214, income: 140, totalbudget: 300 },
    { month: "July", revenue: 214, income: 140, totalbudget: 300 },
    { month: "August", revenue: 214, income: 140, totalbudget: 300 },
    { month: "September", revenue: 214, income: 140, totalbudget: 300 },
    { month: "October", revenue: 214, income: 140, totalbudget: 300 },
    { month: "November", revenue: 214, income: 140, totalbudget: 300 },
    { month: "December", revenue: 214, income: 140, totalbudget: 300 },
]

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "var(--chart-1)",
    },
    income: {
        label: "Income",
        color: "var(--chart-2)",
    },
    totalbudget: {
        label: "Total",
        color: "var(--chart-3)",
    }
} satisfies ChartConfig

export function DashboardChart() {

    const {name, email , id, type} = useAuthStore();

    return (
        <Card className="flex flex-col w-full">
            <CardHeader className="flex flex-row items-center justify-between">                <CardTitle>Financial Analytics</CardTitle>
                <CardDescription>
                    Showing total income and revenue for the last 6 months.
                </CardDescription>
                <select
                    className="border rounded p-2 text-sm bg-card"
                >
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                </select>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            dataKey="income"
                            type="natural"
                            fill="var(--color-income)"
                            fillOpacity={0.4}
                            stroke="var(--color-income)"
                            stackId="a"
                        />
                        <Area
                            dataKey="revenue"
                            type="natural"
                            fill="var(--color-revenue)"
                            fillOpacity={0.4}
                            stroke="var(--color-revenue)"
                            stackId="a"
                        />
                        <Area
                            dataKey="totalbudget"
                            type="natural"
                            fill="var(--color-totalbudget)"
                            fillOpacity={0.4}
                            stroke="var(--color-totalbudget)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Showing Finantials Analytics for each month
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Showing Details Of {name}'s.
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}