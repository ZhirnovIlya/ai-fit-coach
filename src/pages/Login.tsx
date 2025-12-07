import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/providers/AuthProvider";
import heroImage from "@/assets/hero-fitness.jpg";

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Введите имя"),
});

type AuthForm = { email: string; password: string; name?: string };

type AuthMode = "login" | "register";

export default function Login() {
  const [mode, setMode] = useState<AuthMode>("login");
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = useMemo(() => (location.state as { from?: string })?.from ?? "/", [location.state]);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthForm>({
    resolver: zodResolver(mode === "login" ? loginSchema : registerSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [from, isAuthenticated, navigate]);

  const onSubmit = async (values: AuthForm) => {
    if (mode === "login") {
      await login(values.email, values.password);
    } else {
      await register(values.name || "", values.email, values.password);
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="AI Fitness Coach"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background" />
      </div>

      <div className="relative container flex min-h-screen flex-col items-center justify-center gap-10 py-12">
        <div className="text-center space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            Безопасная авторизация
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Вернитесь к тренировкам</h1>
          <p className="text-muted-foreground text-lg">
            Войдите в свой аккаунт, чтобы продолжить отслеживать прогресс, получать рекомендации и сохранять программу тренировок.
          </p>
        </div>

        <Card className="w-full max-w-xl border-border/60 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">{mode === "login" ? "Вход" : "Регистрация"}</CardTitle>
            <CardDescription>
              {mode === "login"
                ? "Введите свои данные, чтобы получить доступ к персональным тренировкам"
                : "Создайте аккаунт и начните тренироваться с вашим AI-наставником"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={mode} onValueChange={(value) => setMode(value as AuthMode)} className="space-y-6">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" {...formRegister("email")} />
                    {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Пароль</Label>
                    <Input id="password" type="password" placeholder="••••••••" {...formRegister("password")} />
                    {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Входим..." : "Войти"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-6">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" type="text" placeholder="Алексей" {...formRegister("name")} />
                    {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-register">Email</Label>
                    <Input
                      id="email-register"
                      type="email"
                      placeholder="you@example.com"
                      {...formRegister("email")}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-register">Пароль</Label>
                    <Input
                      id="password-register"
                      type="password"
                      placeholder="Минимум 6 символов"
                      {...formRegister("password")}
                    />
                    {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Создаём аккаунт..." : "Создать аккаунт"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <Separator className="my-6" />
            <p className="text-center text-sm text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с <Link to="/" className="underline">условиями сервиса</Link> и политикой конфиденциальности.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
