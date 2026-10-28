async function verifyLogin() { // async cria uma função assincrona e o Funcion cria a função 
    const username = document.getElementById("username").value.trim(); // const declara uma variável e o get.ElementById localiza o ID armazenado no servidor
    const password = document.getElementById("password").value.trim();
    const userType = document.getElementById("userType").value;
    const errorMsg = document.getElementById("error-message");
    errorMsg.style.display = "none"; 

    if (!username || !password || !userType) {
      errorMsg.innerText = "Preencha todos os campos e selecione a categoria.";
      errorMsg.style.display = "block";
      return;
    }

    try {
      const response = await fetch("https://sheetdb.io/api/v1/5du6f6ry1uecy");
      const users = await response.json();
      const user = users.find(u =>
        u.name.toLowerCase() === username.toLowerCase() &&
        u.password === password &&
        u.role === userType
      );
	  if (user) {
        // Salva os dados no localStorage
        const userLinks = {
          ...user,
          campaignsLink: user.campaignsLink || "",
          metasLink: user.metasLink || "",
          extratoLink: user.extratoLink || "",
          topClientesLink: user.topClientesLink || ""
        };
        localStorage.setItem("userLinks", JSON.stringify(userLinks));

        // Redirecionamento dinâmico via redirectLink
        if (user.redirectLink) {
          window.location.href = user.redirectLink;
        } else {
          // Redirecionamento padrão se redirectLink estiver vazio
          switch (userType) {
            case "vendedor":
              window.location.href = "vendedor.html";
              break;
            case "supervisor":
              window.location.href = "supervisor.html";
              break;
            case "fornecedor":
              window.location.href = "fornecedor.html";
              break;
            case "geral":
              window.location.href = "geral.html";
              break;
            default:
              window.location.href = "index.html";
          }
        }
      } else {
        errorMsg.innerText = "Nome, senha ou categoria incorretos.";
        errorMsg.style.display = "block";
      }
    } catch (err) {
      console.error(err);
      errorMsg.innerText = "Erro ao acessar o banco de dados.";
      errorMsg.style.display = "block";
    }
  }