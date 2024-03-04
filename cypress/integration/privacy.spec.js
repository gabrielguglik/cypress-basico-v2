Cypress._.times(5, () => {
    it('verifica se a página de política de privacidade funciona corretamente', function() {
        cy.visit('./src/privacy.html')

        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')

        cy.get('#title')
            .should('be.visible')
            .should(function($title) {
                expect($title).to.have.text('CAC TAT - Política de privacidade')
            })

        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
            .should('be.visible')

        cy.contains('Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.')
            .should('be.visible')

        cy.contains('No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.')
            .should('be.visible')

        cy.contains('Talking About Testing')
            .should('be.visible')
    })
})