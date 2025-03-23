export const register = async (name: string, password: string) => {
  const type = "aluno";
  const turmaId = 1;
  console.log({ type, name, password, turmaId });

  try {
    const response = await fetch(
      "https://ambienteeducacional-backend.onrender.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, name, password, turmaId }),
      },
    );

    if (!response.ok) {
      const errorDetails = await response.text(); // Pega o conteúdo da resposta de erro
      console.error("Erro ao registrar o usuário:", errorDetails);
      throw new Error("Usuário ou senha inválidos");
    }
    const data = await response.json();
    return data; // Retorna o resultado (como o token)
  } catch (error) {
    console.error("Erro na requisição de registro:", error);
    throw new Error(error.message || "Erro na requisição de registro");
  }
};
