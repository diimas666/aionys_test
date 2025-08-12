describe('Notes E2E (web)', () => {
  it('adds, edits and deletes a note', () => {
    cy.visit('/');

    // Add
    cy.get('[data-testid="add-btn"]').click();
    cy.get('[data-testid="title-input"]').should('be.visible').type('New Note');
    cy.get('[data-testid="content-input"]').should('be.visible').type('Body');
    cy.get('[data-testid="save-btn"]').should('be.visible').click();

    cy.contains('New Note').should('exist');

    // Edit
    cy.get('[data-testid="edit-btn"]').first().click();

    cy.get('[data-testid="title-input"]')
      .should('be.visible')
      .type('{selectall}{backspace}Updated');

    cy.get('[data-testid="content-input"]')
      .should('be.visible')
      .type('{selectall}{backspace}Updated Body');

    cy.get('[data-testid="save-btn"]').click();
    cy.contains('Updated').should('exist');

    // Delete
    cy.get('[data-testid="delete-btn"]').first().click();
    cy.contains('Updated').should('not.exist');
  });
});
