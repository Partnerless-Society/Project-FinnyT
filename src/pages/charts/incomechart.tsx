
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
import { useEffect, useMemo } from "react"
import { useDataStore } from "@/store/datastore"
import { ChartArea } from "lucide-react"

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
        label: "Other",
        color: "var(--chart-4)"
    }
} satisfies ChartConfig


export function TotalIncomeChart() {
    //Store
    const {
        name,
        id
    } = useAuthStore();
    const {
        fetchchartincome,
        incomechart
    } = useDataStore();

    //Function
    useEffect(() => {
        fetchchartincome(id ?? "")
    }, [])

    //Calculate
    const chartData = incomechart.map((element) => (
        {
            category: element.category,
            amount: element.income,
            fill: `var(--color-${element.category.toLowerCase()}`
        }
    ))

    const totalRevenue = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.amount, 0)
    }, [incomechart])


    const hasData = chartData.length > 0;
    const emptyData = [{ category: "none", amount: 1, fill: "var(--muted)" }];


    return (
        <Card className="flex flex-col w-full hover:border-cyan-500 transition-colors">
            <CardHeader className="items-center pb-0">
                <CardTitle>Total Income</CardTitle>
                <CardDescription>Total Income For Each Categories.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {chartData.length > 0 ? (<ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-auto h-62.5"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={hasData ? chartData : emptyData} dataKey="amount"
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
                                                    className="fill-foreground text-2xl font-bold"
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
                </ChartContainer>) : (
                        <div className="flex items-center gap-2 justify-center h-62.5 text-muted-foreground">
                            No data yet <ChartArea/>
                        </div>
                )}
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Showing Financials Incomes Of {name}'s
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total incomes from all sources
                </div>
            </CardFooter>
        </Card>
    )
}