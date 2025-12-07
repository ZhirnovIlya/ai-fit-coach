import { Dumbbell, User, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavLink } from '@/components/NavLink';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/providers/AuthProvider';

const navItems = [
  { href: '/', label: 'Главная' },
  { href: '/exercises', label: 'Упражнения' },
  { href: '/workout', label: 'Тренировка' },
  { href: '/progress', label: 'Прогресс' },
  { href: '/profile', label: 'Профиль' }
];

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();

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
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="space-y-1">
                  <p className="font-semibold leading-tight">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <NavLink to="/profile" className="w-full">
                    Профиль
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="secondary" className="inline-flex">
              <NavLink to="/login">Войти</NavLink>
            </Button>
          )}

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
