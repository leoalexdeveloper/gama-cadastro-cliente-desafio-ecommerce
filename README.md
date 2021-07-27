# gama-cadastro-cliente-desafio-ecommerce
##Criação das funcionalidades de um e-commerce

###Este projeto é uma simulação de um e-commerce.

Ao acessar a página o usuário verá dois botões na parte superior da página: **Sign-in** e **Sign-up**.

**Sign-in** dá acesso a área de login.

**Sign-up** dá acesso a um cadastro rápido.

**OBS**: Se o usuário tentar colocar algum produto no carrinho sem estar logado nada acontece pois só é iniciada uma sessão depois de logar.
Depois de se cadastrar podemos ver no localStorage a chave "usuarios-cadastrados". Nela ficam os usuários cadastrados.
**O projeto não tem implementado uma mudança de usuário nem o logout.**

Depois de se cadastrar e logar uma sessão é criada gerando uma chave no localStorage com o nome "sessoes-criadas".
Estas sessoes ficam salvas mesmo se deletar o usuario e recadastrar os dados da sessão permanecem.

Caso um usuário diferente acesse ele herda a mesma sessão. Não foi implementado um sistema multisessões, mas todo o código está orientado a buscar pelo usuario com status logado, e nesse caso so teriamos 1.

Na tela inicial aparecem **tres botões** na parte superior. **Dados do perfil, carrinho e retornar a loja**. 
**OBS**: O botão de editar perfil está dentro de dados do perfil.

Depois de cadastrar os dados o usuario pode inserir itens no carrinho.

Dentro do carrinho é possível aumentar a quantidade dos itens, ou excluílos.

O total responde as alterações feitas nas quantidades em relação ao preço inicial do produto e a soma de todos os itens presentes no carrinho.


