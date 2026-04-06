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
import { useDataStore } from "@/store/datastore"
import { useEffect, useState } from "react"
import { ChartArea } from "lucide-react"

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


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
    },
    networth: {
        label: "Networth",
        color: "var(--chart-4)",
    }
} satisfies ChartConfig

export function DashboardChart() {

    //Store
    const {
        name,
        id,
    } = useAuthStore();
    const {
        years,
        monthlyreport,
        fetchyears,
        fetchmonthlyreport
    } = useDataStore();

    //Functions
    useEffect(() => {
        fetchyears(id ?? "");
    }, [id]);

    //States
    const [selectyear, setselectyear] = useState<string>("");

    useEffect(() => {
        if (years.length > 0 && !selectyear) {
            setselectyear(years[0].toString());
        }
    }, [years, selectyear]);

    //Functions
    useEffect(() => {
        if (selectyear) {
            fetchmonthlyreport(id ?? "", Number(selectyear));
        }
    }, [id, selectyear]);

    //Chart Data
    const chartData = monthlyreport.map(element => ({
        month: monthNames[element.month - 1],
        income: element.income,
        outcome: element.outcome,
        totalbudget: element.total,
        networth: element.networth
    }));



    return (
        <Card className="flex flex-col w-full hover:border-cyan-500 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-2">
                    <CardTitle>Financial Analytics</CardTitle>
                    <CardDescription>
                        <p>Showing total income and outcome for the last 12 months.</p>
                        <p>Date will show at the end of each month.</p>
                    </CardDescription>
                </div>
                <Select value={selectyear} onValueChange={setselectyear}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {chartData.length > 0 ? (<ChartContainer className="aspect-auto h-62.5 w-full" config={chartConfig}>
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
                        <Area
                            dataKey="networth"
                            type="natural"
                            fill="var(--color-networth)"
                            fillOpacity={0.4}
                            stroke="var(--color-networth)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>) :
                    (
                    <div className="flex items-center gap-2 justify-center h-62.5 text-muted-foreground">
                        No data yet <ChartArea />
                    </div>
                    )
                }
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