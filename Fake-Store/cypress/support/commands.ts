/// <reference types="cypress" />
Cypress.Commands.add('login', (username, password) => {
    cy.visit("/login");  // Visita a página inicial
    cy.get('[placeholder="Usuário"]').type(username);  // Preenche o campo de usuário
    cy.get('[placeholder="Senha"]').type(password);  // Preenche o campo de senha
    cy.get('button').click();  // Clica no botão de login
    cy.get('[href="/carts"]').should("be.visible");  // Verifica se o botão do carrinho está visível
  });