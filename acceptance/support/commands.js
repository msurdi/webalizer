const signinPath = "/auth/signin";

Cypress.Commands.add("login", (username, password) => {
  cy.location("pathname", { log: false }).then((currentPath) => {
    if (currentPath !== signinPath) {
      cy.visit(signinPath);
    }
  });

  cy.get("#username").type(username);
  cy.get("#password").type(password);

  cy.contains("Sign in").click();
});
