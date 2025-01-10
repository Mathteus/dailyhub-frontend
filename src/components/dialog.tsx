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
import React from "react"

interface IDialog {
	ButtonOpen: React.ReactNode;
	title: string;
	description?: string;
	children: React.ReactNode;
	textOk: string;
	onOK: () => void;
}

export function DialogDemo({ ButtonOpen, title, children, textOk, onOK, description='' }: IDialog) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {ButtonOpen}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
					<DialogTrigger asChild>
          	<Button type="button" onClick={onOK}>{textOk}</Button>
					</DialogTrigger>
					<DialogTrigger asChild>
						<Button variant="destructive">Close</Button>
					</DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
