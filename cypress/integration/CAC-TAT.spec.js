describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios, envia o formulário e verifica se é exibido mensagem de sucesso', function() {
        cy.get('input[name="firstName"]')
          .should('be.visible')
          .type('Gabriel', { delay: 0 })
          .should('have.value', 'Gabriel')

        cy.get('input[name="lastName"]')
          .should('be.visible')
          .type('Guglielmi Kirtschig', { delay: 0 })
          .should('have.value', 'Guglielmi Kirtschig')

        cy.get('input[id="email"]')
          .should('be.visible')
          .type('gabrielguglielmik@gmail.com', { delay: 0 })
          .should('have.value', 'gabrielguglielmik@gmail.com')

        cy.get('textarea[name="open-text-area"]')
          .should('be.visible')
          .type('I am just testing', { delay: 0 })
          .should('have.value', 'I am just testing')

        cy.get('button[type="submit"]')
            .should('be.visible')
            .click()

        cy.get('span[class="success"]') // poderia utlizar apenas cy.get('.success') para representar qualquer elemento que tenha essa classe (já que é o único)
            .should('be.visible')
    })

    it('verifica se é exibido mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('input[name="firstName"]')
            .should('be.visible')
            .type('Gabriel')
            .should('have.value', 'Gabriel')

        cy.get('input[name="lastName"]')
            .should('be.visible')
            .type('Guglielmi Kirtschig')
            .should('have.value', 'Guglielmi Kirtschig')

        cy.get('input[id="email"]')
            .should('be.visible')
            .type('email.fora.de.formatacao')
            .should('have.value', 'email.fora.de.formatacao')

        cy.get('textarea[name="open-text-area"]')
            .should('be.visible')
            .type('I am just testing')
            .should('have.value', 'I am just testing')

        cy.contains('button[type="submit"]', 'Enviar')
            .should('be.visible')
            .click()

        cy.get('span[class="error"]')
            .should('be.visible')
    })

    it('verifica se o campo de telefone aceita apenas valores numéricos', function() {
        cy.get('input[id="phone"]') // poderia utlizar apenas cy.get(#phone) (# representa o id)
            .should('be.visible')
            .type('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
            .should('have.value', '')
    })

    it('verifica se é exibido mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('input[name="firstName"]')
            .should('be.visible')
            .type('Gabriel')
            .should('have.value', 'Gabriel')

        cy.get('input[name="lastName"]')
            .should('be.visible')
            .type('Guglielmi Kirtschig')
            .should('have.value', 'Guglielmi Kirtschig')

        cy.get('input[id="email"]')
            .should('be.visible')
            .type('gabrielguglielmik@gmail.com')
            .should('have.value', 'gabrielguglielmik@gmail.com')

        cy.get('textarea[name="open-text-area"]')
            .should('be.visible')
            .type('I am just testing')
            .should('have.value', 'I am just testing')

        cy.get('input[id="phone-checkbox"]')
            .should('be.visible')
            .check()

        cy.contains('button[type="submit"]', 'Enviar')
            .should('be.visible')
            .click()

        cy.get('span[class="error"]')
            .should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone e verifica se foram limpos', function() {
        cy.get('input[name="firstName"]')
            .should('be.visible')
            .type('Gabriel')
            .should('have.value', 'Gabriel')
            .clear()
            .should('have.value', '')

        cy.get('input[name="lastName"]')
            .should('be.visible')
            .type('Guglielmi Kirtschig')
            .should('have.value', 'Guglielmi Kirtschig')
            .clear()
            .should('have.value', '')

        cy.get('input[id="email"]')
            .should('be.visible')
            .type('gabrielguglielmik@gmail.com')
            .should('have.value', 'gabrielguglielmik@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('input[id="phone"]')
            .should('be.visible')
            .type('123456789')
            .should('have.value', '123456789')
            .clear()
            .should('have.value', '')
    })

    it('verifica se é exibido mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button[type="submit"]', 'Enviar')
            .should('be.visible')
            .click()

        cy.get('span[class="error"]')
            .should('be.visible')
    })

    it('verifica se é enviado o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('span[class="success"]')
            .should('be.visible')
    })

    it('verifica se a opção realmente é selecionada quando seleciona o produto "Youtube" por seu texto', function() {
        cy.get('#product')
            .should('be.visible')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('verifica se a opção realmente é selecionada quando seleciona o produto "Mentoria" por seu valor', function() {
        const selectValueMentoria = 'mentoria'

        cy.get('#product')
            .should('be.visible')
            .select(selectValueMentoria)
            .should('have.value', selectValueMentoria)
    })

    it('verifica se a opção realmente é selecionada quando seleciona o produto "Blog" por seu índice', function() {
        cy.get('#product')
            .should('be.visible')
            .select(1)
            .should('have.value', 'blog')
    })

    it('verifica se realmente marca a opção "Feedback" no tipo de atendimento', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .should('be.visible')
            .check()
            .should('be.checked').and('have.value', 'feedback')
    })

    it('verifica se realmente marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio)
                    .check()
                cy.wrap($radio)
                    .should('be.checked')
            })
    })

    it('verifica se marcou todos os checkbox e se desmarcou o último ', function() {
        cy.get('input[type="checkbox"]')
            .check() // marca todos os elementos do checkbox pois não foi passado um seletor específico
            .should('be.checked')
            .last() // seleciona apenas o último elemento a partir daqui
            .uncheck()
            .should('not.be.checked')
    })

    it('verfica se ao selecionar um arquivo, o nome do arquivo é persistido no objeto', function() {
        cy.get('input[type="file"]#file-upload')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verfica se ao selecionar um arquivo simulando um drag-and-drop, o nome do arquivo é persistido no objeto', function() {
        cy.get('input[type="file"]#file-upload')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json', { action: 'drag-drop'})
            })
    })

    it('verifica se ao selecionar um arquivo utilizando uma fixture para a qual foi dada um alias, o nome do arquivo é persistido no objeto', function() {
        cy.fixture('example.json')
            .as('sampleFile') // criado um alias
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica se a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.contains('a', 'Política de Privacidade')
            .should('have.attr', 'target', '_blank')
    })

    it('verifica se acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target')
            .click()

        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })

})