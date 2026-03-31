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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

//Configurations
const chartData = [
    { month: "January", outcome: 186, income: 80, totalbudget: 300 },
    { month: "February", outcome: 305, income: 200, totalbudget: 300 },
    { month: "March", outcome: 237, income: 120, totalbudget: 300 },
    { month: "April", outcome: 73, income: 190, totalbudget: 300 },
    { month: "May", outcome: 209, income: 130, totalbudget: 300 },
    { month: "June", outcome: 214, income: 140, totalbudget: 300 },
    { month: "July", outcome: 214, income: 140, totalbudget: 300 },
    { month: "August", outcome: 214, income: 140, totalbudget: 300 },
    { month: "September", outcome: 214, income: 140, totalbudget: 300 },
    { month: "October", outcome: 214, income: 140, totalbudget: 300 },
    { month: "November", outcome: 214, income: 140, totalbudget: 300 },
    { month: "December", outcome: 214, income: 140, totalbudget: 300 },
]

const chartConfig = {
    outcome: {
        label: "Outcome",
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

    //Store
    const { name, email, id, type } = useAuthStore();

    return (
        <Card className="flex flex-col w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-2">
                    <CardTitle>Financial Analytics</CardTitle>
                    <CardDescription>
                        Showing total income and outcome for the last 6 months.
                    </CardDescription>
                </div>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="2026" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <ChartContainer className="aspect-auto h-62.5 w-full" config={chartConfig}>
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
                            dataKey="totalbudget"
                            type="natural"
                            fill="var(--color-totalbudget)"
                            fillOpacity={0.4}
                            stroke="var(--color-totalbudget)"
                            stackId="a"
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
                            dataKey="outcome"
                            type="natural"
                            fill="var(--color-outcome)"
                            fillOpacity={0.4}
                            stroke="var(--color-outcome)"
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