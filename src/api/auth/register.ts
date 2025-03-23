export const register = async (name: string, password: string) => {
  const type = "aluno";

  try {
    const response = await fetch(
      "https://ambienteeducacional-backend.onrender.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, name, password }),
      },
    );

    if (!response.ok) {
      throw new Error("Usuário ou senha inválidos");
    }
    const data = await response.json();
    return data; // Retorna o resultado (como o token)
  } catch (error) {
    throw new Error(error.message || "Erro na requisição de login");
  }
};
