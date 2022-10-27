/// <reference types="cypress" />
function typeOnePassword(password) {
  cy.get("[data-cy=insert-password]").first().type(password);
}
function typeTwoPasswords(password1, password2) {
  typeOnePassword(password1);
  cy.get("[data-cy=insert-password]").last().type(password2);
}
function shouldBeMarkedAsFailed(selector) {
  cy.get(selector)
    .should("have.class", "checks__check--failed")
    .should("not.have.class", "checks__check--success");
}
function shouldBeMarkedAsPassed(selector) {
  cy.get(selector)
    .should("have.class", "checks__check--success")
    .should("not.have.class", "checks__check--failed");
}

describe("password check", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("should have two input elements", () => {
    cy.get("[data-cy=insert-password]").should("have.length", 2);
  });
  it("should initially have a button with text Show Passwords", () => {
    cy.get("button").should("have.text", "Show Passwords").should("exist");
  });
  it("should toggle between password and text", () => {
    typeOnePassword("test");
    cy.get("[data-cy=toggle-password]")
      .should("have.text", "Show Passwords")
      .click();
    cy.get("[data-cy=insert-password]")
      .first()
      .should("have.attr", "type", "text");
    cy.get("button").should("have.text", "Hide Passwords").click();
    cy.get("[data-cy=insert-password]")
      .first()
      .should("have.attr", "type", "password");
  });
  it("should have 5 tests implemented", () => {
    cy.get("[data-cy=check-password] li").should("have.length", 5);
  });
  it("should initially have all tests failed", () => {
    cy.get("[data-cy=check-password] li");
    shouldBeMarkedAsFailed("[data-cy=check-password] li");
  });
  it("should only run tests with two passwords", () => {
    typeOnePassword("test");
    cy.get("[data-cy=insert-password]").last().should("not.have.value");
    shouldBeMarkedAsFailed("[data-cy=check-password] li");
  });

  it("should have a check for equal passwords", () => {
    typeTwoPasswords("T3stingisfun", "t3stingisfun");
    shouldBeMarkedAsFailed("[data-cy=check-password-equal]");
  });
  it("should have a check for lower case letters", () => {
    typeTwoPasswords("T3STINGISFUN", "T3STINGISFUN");
    shouldBeMarkedAsFailed("[data-cy=check-password-lowercase]");
  });
  it("should have a check for upper case letters", () => {
    typeTwoPasswords("t3stingisfun", "t3stingisfun");
    shouldBeMarkedAsFailed("[data-cy=check-password-uppercase]");
  });
  it("should have a check for numbers", () => {
    typeTwoPasswords("Testingisfun", "Testingisfun");
    shouldBeMarkedAsFailed("[data-cy=check-password-numbers]");
  });
  it("should have a check for length at least 10", () => {
    typeTwoPasswords("T3sting", "T3sting");
    shouldBeMarkedAsFailed("[data-cy=check-password-length]");
  });
  it("should pass all checks with pw that meets all requirements", () => {
    typeTwoPasswords("T3stingisfun", "T3stingisfun");
    shouldBeMarkedAsPassed("[data-cy=check-password] li");
  });
  it("should only run tests if two passwords are equal", () => {
    typeTwoPasswords("T3stingisfun", "T3stingisfun");
    shouldBeMarkedAsPassed("[data-cy=check-password] li");
    cy.get("[data-cy=insert-password]").last().type("{backspace}");
    shouldBeMarkedAsFailed("[data-cy=check-password] li");
  });
});
