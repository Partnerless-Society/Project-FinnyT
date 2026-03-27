import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BanknoteArrowDown, Sparkle, Sparkles, TrendingUp, Wallet } from "lucide-react"

export const Dashboard = () => {
   

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-medium">Dashboard</h1>
                <p className="text-medium text-muted-foreground">Welcome Narihito.</p>
            </div>
            <div className="flex justify-start">
                <Button className="rounded-lg"><Sparkles /> Ai Insights</Button>
            </div>
            <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Total Budget Usuage</CardTitle>
                        <CardAction><Wallet className="text-blue-600" /></CardAction>
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="max-md:text-2xl text-3xl">$ 1000</CardTitle>
                        <CardDescription className="flex gap-1 mt-2 font-medium"><Sparkle size={20} />Ai Overview: This Look Good Remember</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Income</CardTitle>
                        <CardAction><BanknoteArrowDown className="text-green-500" /></CardAction>
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="max-md:text-2xl text-3xl">$ 1000</CardTitle>
                        <CardDescription className="flex gap-1 mt-2 font-medium"><Sparkle size={20} />Ai Overview: This Look Good Remember</CardDescription>

                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Revenue</CardTitle>
                        <CardAction><TrendingUp className="text-yellow-500" /></CardAction>
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="max-md:text-2xl text-3xl">$ 1000</CardTitle>
                        <CardDescription className="flex gap-1 mt-2 font-medium"><Sparkle size={20} />Ai Overview: This Look Good Remember</CardDescription>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

