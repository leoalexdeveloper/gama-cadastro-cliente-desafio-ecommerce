

window.onload = () => {
    qs = (e) => document.querySelector(e);
    qsa = (e) => document.querySelectorAll(e);

    class Session{
        constructor(usuario, pessoa){
            this.sessionData = {
                id: Math.random()*10000000000,
                usuario: usuario,
                pessoa: pessoa,
                carrinho: []
            };
        }
    }

    class Pessoa{
        constructor(nome = '', email = '', rua = '', numero = '', complemento = '', telefone = '', cep = ''){
            this.nome = nome;
            this.email = email;
            this.endereco = {
                rua:rua,
                numero:numero,
                complemento:complemento
            };
            this.telefone = telefone;
            this.cep = cep;
        }
    }

    class Produto{
        constructor(id, nome, descricao, preco, quantidade = 1){
            this.id = id;
            this.nome = nome;
            this.descricao = descricao;
            this.preco = preco;
            this.quantidade = quantidade;
        }
    }


    class Usuario{
        constructor(id='', username='', password='', email='', status = 'convidado'){
            this.id = id;
            this.username = username;
            this.password = password;
            this.email = email;
            this.status = status;
        }

        cadastrarUsuario(){
            let username = qs('#signup-username').value;
            let password = qs('#signup-password').value;
            let rtpassword = qs('#signup-re-type-password').value;
            let email = qs('#signup-email').value;

            let user = new Usuario(null, username, password, email);

            let usuariosCadastrados = [];
            let id = 0;
            let users = [];
            let usuarioExiste = false;
            let menssagensErros = [
                'Este email ja está cadastrado',
                'Usuario cadastrado com sucesso.',
                'Os seguintes problemas podem estar ocorrendo:\n\nAs senhas não coincidem.',
            ];

            if(password === rtpassword && username !== '' && password !== '' && rtpassword !== '' && email !== ''){
                if(localStorage.getItem('usuarios-cadastrados')){
                    usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios-cadastrados'));
                    
                    usuariosCadastrados.map((usuario,key) => {
                        
                        if(usuario.email === email){
                            alert(menssagensErros[0]);
                            usuarioExiste = true;
                            
                        }
                        if(key === usuariosCadastrados.length-1 && usuarioExiste === false){
                            id = usuariosCadastrados.length-1;
                            user.id = id;
                            usuariosCadastrados.push(user);
                            localStorage.setItem('usuarios-cadastrados', JSON.stringify(usuariosCadastrados));
                            alert(menssagensErros[1]);
                        }
                    });
                }else{
                    user.id = id;
                    users.push(user);
                    localStorage.setItem('usuarios-cadastrados', JSON.stringify(users));
                    alert(menssagensErros[1]);
                }   
            }else{
                alert(menssagensErros[2]);
            }
        }

        logarUsuario(){
            let username = qs('#signin-username').value;
            let password = qs('#signin-password').value;
            let usuariosCadastrados = [];
            let usuarioExiste = [];

            if(localStorage.getItem('usuarios-cadastrados')){
                usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios-cadastrados'));
                usuarioExiste = usuariosCadastrados.filter((usuario, key) => usuario.username === username && usuario.password === password);
                
                //alert('Usuario logado com sucesso.')
                usuariosCadastrados.forEach((usuario, key) => {
                    
                    if(usuario.email == usuarioExiste[0].email){
                        
                        usuario.status = "logado";
                        localStorage.setItem('usuarios-cadastrados', JSON.stringify(usuariosCadastrados));
                        let pessoa = new Pessoa();
                        let sessaoCriada = [];
                        sessaoCriada.push(new Session(usuario, pessoa));

                        if(localStorage.getItem('sessoes-criadas')){
                            let getSessoesCriadas = JSON.parse(localStorage.getItem('sessoes-criadas'));
                            getSessoesCriadas.push(sessaoCriada);
                            localStorage.setItem('sessoes-criadas', JSON.stringify(getSessoesCriadas));

                        }else{
                            localStorage.setItem('sessoes-criadas', JSON.stringify(sessaoCriada));
                        }   
                    }
                })
            }
        }

        /* salvarNoLocalStorage(storageName, data){
            let existentData = [];
            if(localStorage.getItem(storageName)){
                existentData = JSON.parse(localStorage.getItem(storageName));
                existentData.push(data);
                localStorage.setItem(storageName, JSON.stringify(existentData));
            }else{
                localStorage.setItem(storageName, JSON.stringify(existentData));
            }
            
        } */

        atualizarPerfil(){
           
        }
    }
    
    class Header{
        constructor(usuario){
            this.usuario = usuario;
        }

        verificaStatusUsuarioERenderizaNav(){
            qs('#page-header').innerHTML = `<p>SaleSmart</p>
                                                    <nav>
                                                        <ul>
                                                            <li id="signin-bt">
                                                                Sign-in
                                                            </li>
                                                            <li id="signup-bt">
                                                                Sign-up
                                                            </li>
                                                        </ul>
                                                    </nav>`;

            if(localStorage.getItem('usuarios-cadastrados')){
                let usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios-cadastrados'));
                let usuariosLogados = Array.from(usuariosCadastrados).filter((usuario, key) => usuario.status === 'logado');
                
                usuariosLogados.map((usuario) => {
                    if(usuario.status === 'logado'){
                    
                        qs('#page-header').innerHTML =`<p>SaleSmart</p>
                                                        <nav>
                                                            <ul class="flexColumn">
                                                                
                                                                <li id="logged-users-bt" title="Informações do usuario"><i class="fas fa-user"></i></li>
                                                                
                                                                <li id="market-kart-bt" title="Carrinho de compras"><i class="fas fa-shopping-cart"></i><span class="market-kart-length"></span></li>
                                                                <li id="store-page-bt" title="Abrir a loja"><i class="fas fa-store"></i></li>
                                                            </ul>
                                                        </nav>
                                                        `;
                    }
                });
            }
        }
    }

    class Main{
        constructor(){
           
           
        }

        criarPageInicial(){
            let cards = '';
            produtos.map((p, key) => {
                cards += (
                    `
                    <article class="product-card">
                    <p class="product-card-name">${p.name}</p>
                    <img class="product-card-photo"src="${p.photo}" />
                    <div class="product-card-description-title">
                        Descrição
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="product-card-description">
                    <p>
                        ${p.Description}
                    <p>
                    </div>
                    <div class="product-card-price">
                        <div class="price-title">Preço:</div>
                        R$:<span class="price-currency">${p.price}</span>,00
                        
                        
                    </div>
                    <button data-produtoId="${p.id}"class="product-card-button" type="button">Colocar no carrinho</button>
                    </article>
                    `
                );
            });
            qs('#page-main').innerHTML = `<section class="page-inicial">${cards}</section>`;
            this.addEventToProductCard();
        }

        addEventToProductCard(){
            
            let produtoSelecionadoId;
            Array.from(qsa('.product-card-button')).map((insertKartButton) => {
                insertKartButton.addEventListener('click', (e) => {
                    produtoSelecionadoId = e.target.dataset.produtoid;

                    let sessoesCriadas = JSON.parse(localStorage.getItem('sessoes-criadas'));
                    
                    sessoesCriadas.map((sessao) => {
                        
                        if(sessao.sessionData.usuario.status === 'logado' && 
                            sessao.sessionData.pessoa.nome !== '' &&
                            sessao.sessionData.pessoa.email !== '' &&
                            sessao.sessionData.pessoa.telefone !== '' &&
                            sessao.sessionData.pessoa.cep !== '' &&
                            sessao.sessionData.pessoa.endereco.rua !== '' &&
                            sessao.sessionData.pessoa.endereco.numero !== '' &&
                            sessao.sessionData.pessoa.complemento !== ''){
                            
                            produtos.map((produto) => {
                                
                                if(String(produto.id) === String(produtoSelecionadoId)){
                                    
                                    //sessao.sessionData.carrinho.length = 0;
                                    
                                    if(sessao.sessionData.carrinho.length > 0){
                                        let produtoExiste = false;
                                        sessao.sessionData.carrinho.map((produtoCarrinho, key) => {
                                            
                                            if(String(produtoCarrinho.id) === String(produtoSelecionadoId)){
                                                produtoExiste = true;
                                                alert('Este produto já existe no carrinho.\nAdicione mais unidades pelo carrinho.')
                                                
                                            }
                                            
                                            if(key === sessao.sessionData.carrinho.length-1 && produtoExiste === false){
                                                
                                                produto.quantidade = 1;
                                                sessao.sessionData.carrinho.push(produto);
                                                localStorage.setItem('sessoes-criadas', JSON.stringify(sessoesCriadas));
                                                alert('Item adicionado: ' + produto.name)
                                            }
                                        });
                                    }else{
                                        
                                        sessao.sessionData.carrinho.push(produto);
                                        produto.quantidade = 1;
                                        localStorage.setItem('sessoes-criadas', JSON.stringify(sessoesCriadas));
                                        alert('Item adicionado: ' + produto.name)
                                    }
                                }
                            })
                        }else{
                            alert('Atualize seu perfil para começar a comprar')
                        }
                    });
                });

                    
            })
        }

        criarSignInPage(){
            
            qs('#page-main').innerHTML = `<section class="page-signin on-top">
                                            <form class="signin-form" action="">
                                                <header>
                                                    <i class="fas fa-sign-in-alt"></i>
                                                    <p>Entrar</p>
                                                </header>
                                                <main>
                                                    <label class="input-text" for="signin-username">
                                                        <i class="fas fa-user"></i>
                                                        <div class="input-container">
                                                            <span>Username</span>
                                                            <input data-input="inputLabelAnimate" id="signin-username" type="text">
                                                        </div>
                                                    </label>
                                                    <label class="input-password">
                                                        <i class="fas fa-lock"></i>
                                                        <div class="input-container">
                                                            <span>Password</span>
                                                            <input data-input="inputLabelAnimate" id="signin-password" type="password">
                                                        </div>
                                                        <i class="far fa-eye-slash show-pass"></i>
                                                    </label>
                                                </main>
                                                <footer>
                                                    <input id="signin-form-bt" type="submit" value="Entrar">
                                                    <input id="signup-form-bt" type="submit" value="Cadastre-se">
                                                </footer>
                                            </form>
                                            </section>
                                            `;
                                            this.addEventToSignInAndSignUpPage();
        }

        addEventToSignInAndSignUpPage(){
            qsa('input[data-input="inputLabelAnimate"]')[0].focus();

            Array.from(qsa('input[data-input="inputLabelAnimate"]')).map((inputField) => {
                inputField.addEventListener('focus', (e) => {
                    
                    if(String(e.target.type) === 'text' 
                    || 
                    String(e.target.type) === 'email' 
                    || 
                    String(e.target.type) === 'password'){
                        let emptyInputs = Array.from(qsa('input')).filter((input, key)=>input.value === '')
                        emptyInputs.map((input, key)=>{
                            qs('#'+input.id).previousElementSibling.classList.remove('placeholderFillEffect');
                        })
                        qs('#'+e.target.id).previousElementSibling.classList.add('placeholderFillEffect');
                    }
                }); 
            });
            
            Array.from(qsa('.show-pass')).map((inputField) => {
                inputField.addEventListener('click', (e) => {
                    if(e.target.classList){
                        e.target.classList.toggle('fa-eye');
                        e.target.classList.toggle('fa-eye-slash');
                    }
                    
                    if(e.target.className.indexOf('fa-eye-slash') >= 0){
                        
                        e.target.previousElementSibling.childNodes[3].type = 'password';
                        
                    }else{
                        e.target.previousElementSibling.childNodes[3].type = 'text';
                    }
                });
            });
        }

        criarSignUpPage(){
            qs('#page-main').innerHTML = `<section class="page-signup on-top">
                                            <form class="signup-form" action="">
                                                <header>
                                                    <i class="fas fa-user-plus"></i>    
                                                    <p>Cadatre-se</p>
                                                </header>
                                                <main>
                                                    <label class="input-text" for="signup-username">
                                                        <i class="fas fa-user"></i>
                                                        <div class="input-container">
                                                            <span>Username</span>
                                                            <input data-input="inputLabelAnimate" id="signup-username" type="text">
                                                        </div>
                                                    </label>
                                                    <label class="input-password" for="signup-password">
                                                        <i class="fas fa-lock"></i>
                                                        <div class="input-container">
                                                            <span>Password</span>
                                                            <input data-input="inputLabelAnimate" id="signup-password" type="password">
                                                        </div>
                                                        <i class="far fa-eye-slash show-pass"></i>
                                                    </label>
                                                    <label class="input-password" for="signup-re-type-password">
                                                        <i class="fas fa-lock"></i>
                                                        <div class="input-container">
                                                            <span>Re-type Pass</span>
                                                            <input data-input="inputLabelAnimate" id="signup-re-type-password" type="password">
                                                        </div>
                                                        <i class="far fa-eye-slash show-pass"></i>
                                                    </label>
                                                    <label class="input-email" for="signup-email">
                                                        <i class="fas fa-lock"></i>
                                                        <div class="input-container">
                                                            <span>E-mail</span>
                                                            <input data-input="inputLabelAnimate" id="signup-email" type="email">
                                                        </div>
                                                    </label>
                                                </main>
                                                <footer>
                                                    <input id="signup-form-bt" type="submit" value="Cadastrar">
                                                    <input id="signin-form-return" type="submit" value="Entrar">
                                                </footer>
                                            </form>
                                            </section>
                                            `;
                                            this.addEventToSignInAndSignUpPage();
        }

        criarUserScreen(){
            qs('#page-main').innerHTML = `<section class="page-user-screen">
                <header>
                    <p>Dados do usuário</p>
                    <i id="logged-users-edit-bt" title="Editar usuario" class="fas fa-user-edit"></i>
                </header>
                <article>   
                    <fieldset>
                        <legend>Informações</legend>
                        <label>Id:</label>
                        <p id="id-usuario">Id do usuario</p>   
                        <label>Nome:</label>
                        <p id="nome-usuario">Nome do usuario</p>
                        <label>Email:</label>
                        <p id="email-usuario">Email do usuario</p>
                        <label>Telefone:</label>
                        <p id="telefone-usuario">Telefone do usuario</p>
                        <section>
                        <label>Endereço</label>
                        <label>Cep:</label>
                        <p id="cep-usuario">Cep do usuario</p>
                        <label>Rua:</label>
                        <p id="rua-usuario">Rua do usuario</p>
                        <label>Numero:</label>
                        <p id="numero-usuario">Numero do usuario</p>
                        <label>Complemento:</label>
                        <p id="complemento-usuario">Complemento do usuario</p>
                        </section>
                    </fieldset>
                </article>
            </sectopn>
            `
            this.addEventTocriarUserScreen();
        }

        addEventTocriarUserScreen(){

            /* ===================visualizar as informações======================== */
            
            let sessoesCriadas = JSON.parse(localStorage.getItem('sessoes-criadas'));
            
            
            sessoesCriadas.map((sessao) => {
                
                    if(sessao.sessionData.usuario.status === 'logado'){
                        qs('#id-usuario').innerText = sessao.sessionData.usuario.id;
                        qs('#nome-usuario').innerText =sessao.sessionData.pessoa.nome;
                        qs('#email-usuario').innerText =sessao.sessionData.pessoa.email;
                        qs('#telefone-usuario').innerText = sessao.sessionData.pessoa.telefone;
                        qs('#cep-usuario').innerText =sessao.sessionData.pessoa.cep;
                        qs('#rua-usuario').innerText =sessao.sessionData.pessoa.endereco.rua;
                        qs('#numero-usuario').innerText =sessao.sessionData.pessoa.endereco.numero;
                        qs('#complemento-usuario').innerText =sessao.sessionData.pessoa.endereco.complemento;
                        
                    }
            });
        }

        criarUserEditScreen(){
            qs('#page-main').innerHTML = `<section class="page-user-edit-screen">
                <header>
                    <p>Edite seu perfil</p>
                </header>
                <form action="" id="page-user-edit-form">
                    <div class="input-container" id="form-user-input-container">
                        <span>Nome</span>
                        <input type="text" id="form-input-user-nome" placeholder="Ex: Leo">
                    </div>
                    <div class="input-container" id="form-email-input-container">
                        <span>Email</span>
                        <input type="email" id="form-input-user-email" placeholder="Ex: n@n.com.br">
                    </div>
                    <div class="input-container" id="form-telefone-input-container">
                        <span>Telefone</span>
                        <input type="text" id="form-input-user-telefone" placeholder="(xx)xxxx-xxxx">
                    </div>
                    <p>Endereço:</p>
                    <div class="input-container" id="form-cep-input-container">
                        <span>Cep</span>
                        <input type="text" id="form-input-user-cep" placeholder="xxxxx-xxx">
                    </div>
                    <div class="input-container" id="form-rua-input-container">
                        <span>Rua</span>
                        <input type="text" id="form-input-user-rua" placeholder="Ex: Rua Andiba">
                    </div>
                    <div class="input-container" id="form-numero-input-container">
                        <span>Numero</span>
                        <input type="text" id="form-input-user-numero" placeholder="Ex: 99">
                    </div>
                    <div class="input-container" id="form-complemento-input-container">
                        <span>Complemento</span>
                        <input type="text" id="form-input-user-complemento" placeholder="Ex: Casa/Apt:909">
                    </div>
                    <input type="submit" value="Salvar Edição">
                </form>
                </section>
            `;
            this.addEventTocriarUserEditScreen();
        }

        addEventTocriarUserEditScreen(){

            /* ========================carrega o email de registro para o campo email================================== */
            let usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios-cadastrados'));
            let sessoesCriadas = JSON.parse(localStorage.getItem('sessoes-criadas'));

            sessoesCriadas.map((sessao) => {
                
                    if(sessao.sessionData.usuario.status === 'logado'){
                        qs('#form-input-user-nome').value = sessao.sessionData.pessoa.nome;
                        qs('#form-input-user-email').value = sessao.sessionData.pessoa.email || sessao.sessionData.usuario.email;
                        qs('#form-input-user-telefone').value = sessao.sessionData.pessoa.telefone;
                        qs('#form-input-user-cep').value = sessao.sessionData.pessoa.cep;
                        qs('#form-input-user-rua').value = sessao.sessionData.pessoa.endereco.rua;
                        qs('#form-input-user-numero').value = sessao.sessionData.pessoa.endereco.numero;
                        qs('#form-input-user-complemento').value = sessao.sessionData.pessoa.endereco.complemento;
                    }
                
            }); 
            
            

            /*=================== foca no primeiro input ========================================================*/
            qsa('input')[0].focus();

            /*===================== formata os campos d o formulario =========================================*/
            Array.from(qsa('input')).map((input) => {
                input.addEventListener('input', (e) => {
                    switch(true){
                        case input.id.indexOf('nome') >= 0:
                            if(!input.value.match(/^[\w\s]*$/)){
                                alert('Use apenas letras ou números.')
                                input.value = input.value.substr(0, input.value.length-1);
                            }
                        break;
                        case input.id.indexOf('telefone') >= 0:
                        {    
                        let inputValue;
                            if(input.value.length <= 14){
                                if((input.value.substr(-1)).match(/[\d\(\)-]/)){
                                    inputValue = input.value.replaceAll('(', '').replaceAll(')', '').replace('-', '').split('');
                                    (inputValue.length > 0) ? inputValue.splice(0, 0, '(') : '';
                                    (inputValue.length > 3) ? inputValue.splice(3, 0, ')') : '';
                                    
                                    if(inputValue.length > 11){
                                        inputValue.splice(9, 0, '-') 
                                    }else if(inputValue.length > 8 && inputValue.length <= 11){
                                        inputValue.splice(8, 0, '-')
                                    }
                                    input.value = '';
                                    input.value = inputValue.join(',').replaceAll(',','');
                                    
                                }else{
                                           
                                    alert('Este campo suporta npumeros apenas');
                                    input.value = input.value.substr(0, input.value.length-1);
                                }
                            }else{
                                alert('Este campo suporta apenas 12 digitos.');
                                input.value = input.value.substr(0, input.value.length-1);
                            }
                        }
                        break;
                        case input.id.indexOf('cep') >= 0:
                            let inputValue;
                            if(input.value.length <= 9){
                                if((input.value.substr(-1)).match(/[\d-]*/)){
                                    inputValue = input.value.replaceAll('(', '').replaceAll(')', '').replace('-', '').split('');
      
                                    if(inputValue.length > 5){
                                        inputValue.splice(5, 0, '-') 
                                    }
                                    input.value = '';
                                    input.value = inputValue.join(',').replaceAll(',','');
                                    
                                }else{
                                        
                                    alert('Este campo suporta npumeros apenas');
                                    input.value = input.value.substr(0, input.value.length-1);
                                }
                            }else{
                                alert('Este campo suporta apenas 9 digitos.');
                                input.value = input.value.substr(0, input.value.length-1);
                            }
                        break;
                    }
                });
            });

            /* =======================varifica formato do email=============================================== */
            qs('#form-input-user-email').addEventListener('blur', (e) => {
                
                if(!e.target.value.match(/\w{0,}@\w{0,}.\w{0,}?\.\w{0,}/) && e.target.value.length > 0){
                    alert('Seu email precisa estar no formato: Ex: leo@leo.com');
                    e.target.value = '';
                    e.target.focus();
                }
            })

            /* ====================submeter os dados=========================================== */
            qs('#page-user-edit-form').addEventListener('submit', (e) => {
                e.preventDefault();

                let errors = [];
                Array.from(qsa('input')).map((input) => {
                    if(input.value === ''){
                        errors.push(input.id.replace(input.id.substr(0, [input.id.lastIndexOf('-')+1]), ''));
                    }
                });

                if(errors.length > 0){
                    let errorsAlert = [];
                    errors.forEach((erro) => {
                        errorsAlert.push(erro[0].toUpperCase() + erro.substr(1, erro.length));
                    });
                    alert('Compete os seguintes cammpos: \n\n' + errorsAlert.join());
                }else{
                    let nome = qs('#form-input-user-nome').value;
                    let email = qs('#form-input-user-email').value;
                    let telefone = qs('#form-input-user-telefone').value;
                    let cep = qs('#form-input-user-cep').value;
                    let rua = qs('#form-input-user-rua').value;
                    let numero = qs('#form-input-user-numero').value;
                    let complemento = qs('#form-input-user-complemento').value;

                    let sessoesCriadas = JSON.parse(localStorage.getItem('sessoes-criadas'));

                    sessoesCriadas.map((sessoes) => {
                        
                            if(sessoes.sessionData.usuario.status === 'logado'){
                                
                                sessoes.sessionData.pessoa.nome = nome;
                                sessoes.sessionData.pessoa.email = email;
                                sessoes.sessionData.pessoa.telefone = telefone;
                                sessoes.sessionData.pessoa.cep = cep;
                                sessoes.sessionData.pessoa.endereco.rua = rua;
                                sessoes.sessionData.pessoa.endereco.numero = numero;
                                sessoes.sessionData.pessoa.endereco.complemento = complemento;

                                localStorage.setItem('sessoes-criadas', JSON.stringify(sessoesCriadas));
                                alert('Dados salvos com sucesso');
                                this.criarUserScreen();
                            }
                    });
                }
            }); 

        }

        criarMarketKart(){

            let sessoesCridadas = JSON.parse(localStorage.getItem('sessoes-criadas'));
            let total = 0;
                sessoesCridadas.map((sessao) => {
                    if(sessao.sessionData.carrinho.length > 0){
                    if(sessao.sessionData.usuario.status === 'logado'){
                        
                        qs('#page-main').innerHTML = `<section class="page-market-kart-screen">
                        ${sessao.sessionData.carrinho.map((produto, key) => {
                            total += produto.price * produto.quantidade;
                            console.log(total);
                            return `<header>
                            <p>Items no seu carrinho</p>
                        </header>
                        <article class="kart-item-card">
                            <div class="product-description">
                                <img src="${produto.photo}" />
                                <p>${produto.name}</p>
                            </div>
                            <section>
                                <div class="add-more">
                                    <i class="fas fa-minus"></i>
                                    <p class="unidades">${produto.quantidade}</p>
                                    <i class="fas fa-plus"></i>
                                </div>
                                <div class="remove-item">
                                    <p>Remover do carrinho</p>
                                    <i class="far fa-trash-alt"></i>
                                </div>
                                <div class="preco">
                                    R$
                                    <p>${produto.price * produto.quantidade}</p>
                                    ,00
                                </div>
                            </section>
                        </article>
                        `
                        })}
                        <footer>
                        <p>Total</p>
                        <p>${total}</p>
                    </footer>
                                    
                                </section>
                                `                    
                    }
                }else{
                    qs('#page-main').innerHTML = (sessao.sessionData.carrinho.length < 1) ? '<h1 id="carrinhoStatus">O carrinho está vazio</h1>' : '';        
                }
                
                });
                
                this.addEventTocriarMarketKart();
        }

        calculaTotal(session, total){
            
            session.map((items) => {
                
                if(items.sessionData.usuario.status == 'logado'){
                    items.sessionData.carrinho.map((item) => {
                        
                        total =  Number(item.price) * Number(item.quantidade);
                    })
                }
            });

            return total
        }

        calcularUnidades(price){
            let unidades = 0;
            
            Array.from(qsa('unidades')).map((unidade) => {
                unidades = unidade.innerText;
            })
        }

        addEventTocriarMarketKart(){
            let sessoesCriadas = JSON.parse(localStorage.getItem('sessoes-criadas'));
            let kartDeleteIcon = qsa('.fa-trash-alt');
            /* ================remove itens do carrinho======================== */
            Array.from(kartDeleteIcon).map((deleteBt, key) => {
                deleteBt.addEventListener('click', () => {
                    let confirmation = confirm('Deseja retirar esse produto do carrinho?');

                    sessoesCriadas.map((sessao) => {
                        if(sessao.sessionData.usuario.status === 'logado'){
                            
                            if(confirmation === true){
                                qsa('.kart-item-card')[key].remove();
                                sessao.sessionData.carrinho.splice(key, 1);
                                localStorage.setItem('sessoes-criadas', JSON.stringify(sessoesCriadas))
                                this.criarMarketKart();
                            };
                        }
                    })
                });
            });
            let btMenos = qsa('.fa-minus');
            let btMais = qsa('.fa-plus');
            
            Array.from(btMenos).map((menos, key) => {
                menos.addEventListener('click', () => {
                    sessoesCriadas.map((sessao) => {
                            sessao.sessionData.carrinho.map((item, keyEl) => {
                               if(keyEl === key){
                                item.quantidade = Number(item.quantidade) > 0 ? Number(item.quantidade) - 1 : Number(item.quantidade);
                               }
                            localStorage.setItem('sessoes-criadas', JSON.stringify(sessoesCriadas));
                            });
                    })
                    this.criarMarketKart();
                });
            });
            Array.from(btMais).map((mais, key) => {
                mais.addEventListener('click', () => {
                    sessoesCriadas.map((sessao) => {
                            sessao.sessionData.carrinho.map((item, keyEl) => {
                               if(keyEl === key){
                                item.quantidade = Number(item.quantidade) < 100 ? Number(item.quantidade) + 1 : Number(item.quantidade);
                               }
                            localStorage.setItem('sessoes-criadas', JSON.stringify(sessoesCriadas));
                            });
                    })
                    this.criarMarketKart();
                });
            });
        }
    }

    class ProductCard{
        constructor(){
            this.openAndCloseDescription();
            this.addEventToProductCard();
        }

        openAndCloseDescription(){
            Array.from(qsa('.product-card > .product-card-description-title')).map((card, key) => {
                card.addEventListener('click', () => {
                    qsa('.product-card-description')[key].classList.toggle('card-description-open');
                    qsa('.fa-chevron-down')[key].classList.toggle('rotate180');
                });
            })
            
        }

        addEventToProductCard(){

        }
    }

    async function init(){
        
        let usuario = new Usuario();
        let pessoa = new Pessoa();
        let session = new Session(usuario, pessoa);

        let header = new Header(usuario);
        header.verificaStatusUsuarioERenderizaNav();

        let main = new Main();
        main.criarPageInicial();

        let productCard = await new ProductCard();

        /* ============EVENTOS================ */

        document.documentElement.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if(String(e.target.id).includes('signin-bt')){
                main.criarSignInPage();
            }
            if(String(e.target.id).includes('signup-bt')){
                main.criarSignUpPage();
            }

            if(String(e.target.className).includes('page-signin')
            ||
            String(e.target.className).includes('page-signup')){
                main.criarPageInicial();
            }
            
            if(String(e.target.id).includes('signup-form-bt')){
                usuario.cadastrarUsuario();
                main.criarSignInPage();
            }

            if(String(e.target.id).includes('signin-form-bt')){
                usuario.logarUsuario();
                location.reload();
            }

            if(String(e.target.id).includes('signin-form-return')){
                main.criarSignInPage();
            }

            if(String(e.target.id).includes('logged-users-bt') 
            ||
            String(e.target.parentElement.id).includes('logged-users-bt')){
                main.criarUserScreen();
            }

            if(String(e.target.id).includes('logged-users-edit-bt')
            ||
            String(e.target.parentElement.id).includes('logged-users-edit-bt')){    
                main.criarUserEditScreen();
             }

            if(String(e.target.id).includes('market-kart-bt')
            ||
            String(e.target.parentElement.id).includes('market-kart-bt')){
                main.criarMarketKart();
            }

            if(String(e.target.id).includes('store-page-bt')
            ||
            String(e.target.parentElement.id).includes('store-page-bt')){
                main.criarPageInicial();
            }
            
        });

   
        
        window.onsubmit = (e) => {
            e.preventDefault();
        }
        
    }init();
    
}