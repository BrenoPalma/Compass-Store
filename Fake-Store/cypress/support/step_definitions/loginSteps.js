import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que eu estou na página home", () => {
  cy.visit("/");
});

When("eu navego para a página de login", () => {
  cy.get('button').click();
});

When("eu insiro um {string} e {string}", (username, password) => {
  cy.get('[placeholder="Usuário"]').type(username);
  cy.get('[placeholder="Senha"]').type(password);
});

When("eu clico no botão de login", () => {
  cy.get('button').click();
});

Then("eu devo ver uma mensagem de erro {string}", (errorMessage) => {
  cy.get('p').should("contain", errorMessage);
});

Then("eu devo ser redirecionado para a página inicial", () => {
  cy.url().should("eq", Cypress.config("baseUrl") + "/");
});

Then("eu devo ver os botões {string} e {string}", (botao1, botao2) => {
  cy.get('[href="/profile"]').should("be.visible");
  cy.get('[href="/carts"]').should("be.visible");
});