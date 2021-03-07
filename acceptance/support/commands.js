const signinPath = "/auth/signin";

Cypress.Commands.add("login", (username, password) => {
  cy.location("pathname", { log: false }).then((currentPath) => {
    if (currentPath !== signinPath) {
      cy.visit(signinPath);
    }
  });

  cy.get("#username").clear().type(username);
  cy.get("#password").clear().type(password);

  cy.contains("Sign in").click();
});
