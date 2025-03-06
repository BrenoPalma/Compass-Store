/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      /**
       * Realiza o login com um usuário e senha fornecidos.
       * @param username Nome de usuário
       * @param password Senha do usuário
       */
      login(username: string, password: string): Chainable<void>;
    }
  }
  