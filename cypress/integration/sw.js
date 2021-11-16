describe('Title', () => {
  it('finds the word "Star" on the page.', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Star');
  });
});

describe('Movie titles', () => {
  it('finds the content "A New Hope" on the page.', () => {
    cy.visit('http://localhost:3000');

    cy.contains('A New Hope');
  });
});

describe('Character details rendered', () => {
  it('finds the content "kg" on the page.', () => {
    cy.visit('http://localhost:3000');

    cy.contains('kg');
  });
});
