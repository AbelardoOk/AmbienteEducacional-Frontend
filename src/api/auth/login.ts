export const login = async (name: string, password: string) => {
  try {
    const response = await fetch(
      "https://ambienteeducacional-backend.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
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
