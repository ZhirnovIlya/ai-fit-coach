import { Dumbbell, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavLink } from '@/components/NavLink';

const navItems = [
  { href: '/', label: 'Главная' },
  { href: '/exercises', label: 'Упражнения' },
  { href: '/workout', label: 'Тренировка' },
  { href: '/progress', label: 'Прогресс' },
  { href: '/profile', label: 'Профиль' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-energy">
            <Dumbbell className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            AI <span className="text-gradient-energy">Fitness</span>
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="text-foreground bg-accent rounded-lg"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <nav className="flex flex-col gap-2 mt-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className="px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent rounded-lg"
                    activeClassName="text-foreground bg-accent"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
