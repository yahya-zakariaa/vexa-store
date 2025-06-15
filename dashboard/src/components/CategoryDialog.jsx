import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CategoryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-black py-2 text-white mt-5 cursor-pointer hover:bg-black hover:text-white">Add Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="">Add New Category</DialogTitle>
          <DialogDescription>
            Enter a name and descraption for a new category and click add button
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" type={"text"} className="" />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="descraption" className="text-right">
              Descraption
            </Label>
            <Input id="descraption" type={"text"}  className="" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
