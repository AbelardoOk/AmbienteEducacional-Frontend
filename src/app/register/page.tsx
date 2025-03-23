"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { register } from "@/api/auth/register";

export default function WelcomePage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    setError("");
    if (password == PasswordConfirm) {
      try {
        const response = await register(name, password);
        console.log("Registro bem-sucedido", response);

        if (response.error == null) {
          router.push("/");
        } else {
          setError(response.error || "Usuário ou senha incorretos");
        }
      } catch (err) {
        setError("Erro ao tentar fazer seu cadastro. Tente novamente.");
        console.error(err);
      }
    } else {
      setError("Senhas diferentes!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Faça seu cadastro na nossa Plataforma Educacional
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
            <Input
              type="password"
              placeholder="COnfirmar Senha"
              value={PasswordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full"
            />
            <Button
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleRegister}
            >
              Fazer Cadastro
            </Button>
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="text-center text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link href="/" className="text-blue-500 hover:underline">
                Faça login
              </Link>
              {}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
