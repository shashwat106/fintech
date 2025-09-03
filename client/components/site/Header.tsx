import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#budget", label: "Budget" },
  { href: "#expenses", label: "Expenses" },
  { href: "#savings", label: "Savings" },
  { href: "#stocks", label: "Stocks" },
  { href: "#tips", label: "Tips" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 grid place-items-center">
            <span className="h-3 w-3 rounded-sm bg-primary block" />
          </div>
          <span className="text-lg font-extrabold tracking-tight">FinSight</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <AuthButtons />
        </div>
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t">
          <div className="container py-3 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1 text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <AuthButtons compact />
          </div>
        </div>
      )}
    </header>
  );
}

function AuthButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", compact && "flex-col items-stretch")}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">Log in</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome back</DialogTitle>
          </DialogHeader>
          <form className="grid gap-3">
            <Input type="email" placeholder="Email" required />
            <Input type="password" placeholder="Password" required />
            <Button type="submit" className="w-full">Log in</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Sign up
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create your account</DialogTitle>
          </DialogHeader>
          <form className="grid gap-3">
            <Input type="text" placeholder="Full name" required />
            <Input type="email" placeholder="Email" required />
            <Input type="password" placeholder="Password" required />
            <Button type="submit" className="w-full">Create account</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
