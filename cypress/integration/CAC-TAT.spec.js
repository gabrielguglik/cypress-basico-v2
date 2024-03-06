describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('verifica se ao preencher os campos obrigatórios e enviar o formulário é exibido mensagem de sucesso', function() {
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

        cy.clock()

        cy.get('span[class="success"]')
            .should('be.visible')

        cy.tick(three_sec_in_ms)
        
        cy.get('span[class="success"]')
         .should('not.be.visible')
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

        cy.clock()

        cy.get('span[class="error"]')
            .should('be.visible')

        cy.tick(three_sec_in_ms)

        cy.get('span[class="error"]')
            .should('not.be.visible')
    })

    it('verifica se o campo de telefone aceita apenas valores numéricos', function() {
        cy.get('input[id="phone"]')
            .should('be.visible')
            .type('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
            .should('have.value', '')
    })

    const three_sec_in_ms = 3000

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

        cy.clock()

        cy.get('span[class="error"]')
            .should('be.visible')

        cy.tick(three_sec_in_ms)

        cy.get('span[class="error"]')
            .should('not.be.visible')
    })

    it('verifica se os campos nome, sobrenome, email e telefone foram limpos após preencher e limpar', function() {
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

        cy.clock()

        cy.get('span[class="error"]')
            .should('be.visible')

        cy.tick(three_sec_in_ms)

        cy.get('span[class="error"]')
            .should('be.visible')
    })

    it('verifica se é enviado o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.clock()

        cy.get('span[class="success"]')
            .should('be.visible')

        cy.tick(three_sec_in_ms)

        cy.get('span[class="success"]')
            .should('not.be.visible')
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
            .check()
            .should('be.checked')
            .last()
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
            .as('sampleFile')
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

    it('verifica se exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function() {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')

        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('verifica se preenche a area de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('testing', 20)

        cy.get('textarea[name="open-text-area"]')
            .should('be.visible')
            .invoke('val', longText)
            .should('have.value', longText)
    })

    it('verifica se retornou status, statusText e body ao fazer uma requisição HTTP', function() {
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            expect(response.body).to.include('CAC TAT')
        })
    })

    it('verifica se retornou status, statusText e body ao fazer uma requisição HTTP de outra maneira', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function (response) {
                const { status, statusText, body} = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
        })
    })

    it.only('verifica se consegue encontrar o gato na página do sistema', function() {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
    })

})