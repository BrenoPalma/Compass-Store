import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que estou na página home", () => {
  cy.visit("/");
});

When("eu estou logado com {string} e {string}", (username, password) => {
  cy.login(username, password);
});

When("eu navego para a página do carrinho", () => {
    cy.get('[href="/carts"]').click();
});

Then("eu devo ver mensagem de carregamento {string}", (Carregando) => {
  cy.get('p').should("contain", Carregando);
});

Then("eu devo ver texto indicando {string}", (Carrinhos) => {
  cy.get('h2').should("contain", Carrinhos);
});
  