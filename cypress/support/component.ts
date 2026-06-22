import "./commands";
import { mount } from "cypress/react";

export type { mount };

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);
