describe('App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('add new blog, like it and remove it', function() {
    cy.get('input:first').type('test')
    cy.get('input:last').type('test')
    cy.contains('Sign In').click()
    cy.contains('Test User')
    cy.get('div#newBlog > button').click()
    cy.get('input#author').type('Cypress user')
    cy.get('input#title').type('Best Practices')
    cy.get('input#url').type(
      'https://docs.cypress.io/guides/references/best-practices.html'
    )
    cy.contains('Submit').click()
    cy.contains('Best Practices')
    cy.get('td:first').click()
    cy.get('span:contains("Like")').click()
    cy.contains('Blog has 1 likes')
    cy.get('input#comment').type('What a great blog!')
    cy.get('span:contains("Add comment")').click()
    cy.contains('Blog has 1 likes')
    cy.get('span:contains("Delete")').click()
    cy.contains('Delete blog?')
    cy.get('span:contains("Yes")').click()
    cy.contains('Blog Best Practices deleted succesfully!')
  })
})
