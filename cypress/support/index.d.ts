/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      mount(component: React.ReactNode): Chainable<void>;
    }
  }
}
