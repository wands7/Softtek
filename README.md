# Softtek

A aplicação é um sistema de gerenciamento de pacientes desenvolvido em React, utilizando Redux Toolkit para controle de estado global. Ela permite autenticação de usuários, busca, cadastro e visualização de pacientes atuais e pacientes do legado. O layout é moderno, responsivo e utiliza apenas CSS tradicional para estilização.

Principais funcionalidades:

Login e logout de usuários com autenticação JWT, com o login padrão user: admin e password: admin
Busca de pacientes por nome, exibindo o resultado destacado.
Cadastro de novos pacientes com nome e data de nascimento.
Listagem separada de pacientes atuais e pacientes do legado.
Estado global gerenciado com Redux Toolkit (slices e async thunks).
Interface amigável, com feedback visual para ações e erros. 

Instruções para rodar backend e frontend.

Backend:
1- Abra a solução SofttekChallenger.sln com o Visual Studio (estou usando a versão 2022)
2- Execute o projeto Backend, abrirá uma aba do navegador com o swagger da aplicação

Frontend: 
1- Abra o projeto Frontend com o Visual Studio Code
2- Abra um terminal 
3- Execute o comando npm start, abrirá um aba do navegador com a tela de login, USER: admin SENHA: admin