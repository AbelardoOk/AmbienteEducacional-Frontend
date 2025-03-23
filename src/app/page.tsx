"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { login } from "@/api/auth/login";

export default function WelcomePage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    try {
      const response = await login(name, password);
      console.log("Login bem-sucedido", response);

      if (response.error == null) {
        router.push("/dashboard");
      } else {
        setError(response.error || "Usuário ou senha incorretos");
      }
    } catch (err) {
      setError("Erro ao tentar fazer login. Tente novamente.");
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Bem-vindo à Plataforma Educacional
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            <Button
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleLogin}
            >
              Fazer Login
            </Button>
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="text-center text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Registre-se
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
