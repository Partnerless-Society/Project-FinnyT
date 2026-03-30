import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Banknote, Plus, PlusCircle, Tag, TrendingDown, TrendingUp } from "lucide-react"
import { useState } from "react"

export const Tracker = () => {

    const [open, setopen] = useState<boolean>(false);


    return (
        <>
            <Dialog open={open} onOpenChange={setopen}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl">
                            Create Data Source
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label>Type</Label>
                            <Select defaultValue="income">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="income">Income (+)</SelectItem>
                                    <SelectItem value="outcome">Outcome (-)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="title" className="flex items-center gap-2">
                                <Tag size={14} /> Source
                            </Label>
                            <Input id="title" placeholder="e.g. Name For Source" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="amount" className="flex items-center gap-2">
                                    <Banknote size={14} /> Amount
                                </Label>
                                <Input id="amount" type="number" placeholder="0" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Category</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="food">Food</SelectItem>
                                        <SelectItem value="transport">Transport</SelectItem>
                                        <SelectItem value="work">Work</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button>
                            Add<Plus/>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-medium">Track Overview</h1>
                    <p className="text-medium text-muted-foreground"></p>
                </div>
                <Tabs defaultValue="Income" className="w-full">
                    <div className="flex justify-between">
                        <TabsList>
                            <TabsTrigger value="Income" className="gap-2">
                                Income <span><TrendingUp /></span>
                            </TabsTrigger>
                            <TabsTrigger value="Outcome" className="gap-2">
                                Outcome <span><TrendingDown /></span>
                            </TabsTrigger>
                        </TabsList>
                        <Button onClick={() => setopen(prev => !prev)}>Add Data <PlusCircle/></Button>
                    </div>
                    <TabsContent value="Income" className="mt-4">
                        <Table className="border rounded-lg">
                            <TableHeader className="bg-muted/30">
                                <TableRow>
                                    <TableHead>Source</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="cursor-default">
                                    <TableCell className="font-medium">Monthly Salary</TableCell>
                                    <TableCell>Salary</TableCell>
                                    <TableCell className="text-muted-foreground text-xs">28 March 2026</TableCell>
                                    <TableCell className="text-right font-bold text-emerald-600">+ 1,200,000 Ks</TableCell>
                                </TableRow>
                                <TableRow className="cursor-default">
                                    <TableCell className="font-medium">Monthly Salary</TableCell>
                                    <TableCell>Salary</TableCell>
                                    <TableCell className="text-muted-foreground text-xs">28 March 2026</TableCell>
                                    <TableCell className="text-right font-bold text-emerald-600">+ 1,200,000 Ks</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="Outcome" className="mt-4">
                        <Table className="border rounded-lg">
                            <TableHeader className="bg-muted/30">
                                <TableRow>
                                    <TableHead>Source</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="cursor-default">
                                    <TableCell className="font-medium">Monthly Salary</TableCell>
                                    <TableCell>Salary</TableCell>
                                    <TableCell className="text-muted-foreground text-xs">28 March 2026</TableCell>
                                    <TableCell className="text-right font-bold text-orange-600">- 1,200,000 Ks</TableCell>
                                </TableRow>
                                <TableRow className="cursor-default">
                                    <TableCell className="font-medium">Monthly Salary</TableCell>
                                    <TableCell>Salary</TableCell>
                                    <TableCell className="text-muted-foreground text-xs">28 March 2026</TableCell>
                                    <TableCell className="text-right font-bold text-orange-600">- 1,200,000 Ks</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}