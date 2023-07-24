describe('User CRUD', () => {
  
  beforeEach(() => {
    cy.task('db:erase');
    cy.visit('http://localhost:3000');
  });

  it('Deve listar todos os usuários', () => {
    cy.task('db:create', {
      name: "Angela",
      email: "angela_santos@gmail.com",
      password: "123456"
    });
    cy.contains("Angela");
  });

  it('Validar que a mensagem "No users yet." é exibido quando não existir nenhum usuário no banco de dados', () => {
    cy.visit('http://localhost:3000');
    cy.get('.RaEmpty-message > .MuiTypography-paragraph');
    cy.contains('No User yet.');
  });

  it('Deve criar um novo usuário usando o botão SAVE', () => {
    cy.get('.RaCreateButton-root').click();
    cy.get('#name').type('James');
    cy.get('#email').type('james@gmail.com');
    cy.get('#password').type('senha123');
    cy.get('.RaToolbar-defaultToolbar > .MuiButtonBase-root').click();
    cy.contains('Element created');
    cy.visit('http://localhost:3000');
    cy.contains('James');
  });

  it('Deve criar um usuário usando o botão ENTER', () => {
    cy.get('.RaCreateButton-root').click();
    cy.get('#name').type('James');
    cy.get('#email').type('james@gmail.com');
    cy.get('#password').type('senha123{enter}');
    cy.contains('Element created');
    cy.visit('http://localhost:3000');
    cy.contains('James');
  });

  it('Deve remover um usuário', () => {
    cy.task('db:create', {
      name: "Angela",
      email: "angela_santos@gmail.com",
      password: "123456"
    });
    cy.get('.MuiTableBody-root > :nth-child(1)').click();
    cy.get('.ra-delete-button').click();
    cy.contains('Element deleted');
  });

  it('Deve remover um usuário e cancelar a remoção', () => {
    cy.task('db:create', {
      name: "Angela",
      email: "angela_santos@gmail.com",
      password: "123456"
    });
    cy.get('.MuiTableBody-root > :nth-child(1)').click();
    cy.get('.ra-delete-button').click();
    cy.get('.RaNotification-undo').click();
    cy.contains("Angela");
  });

  it('Deve atualizar um usuário', () => {
    cy.task('db:create', {
      name: "Angela",
      email: "angela_santos@gmail.com",
      password: "123456"
    });
    cy.get('.MuiTableBody-root > :nth-child(1)').click();
    cy.get('#name').clear().type('James');
    cy.get('#email').clear().type('james@gmail.com');
    cy.get('#password').clear().type('senha123');
    cy.get('.RaToolbar-defaultToolbar > .MuiButton-contained').click();
    cy.contains('Element updated');
    cy.contains('James');
  });

  it('Deve cancelar a atualização de um usuário', () => {
    cy.task('db:create', {
      name: "Angela",
      email: "angela_santos@gmail.com",
      password: "123456"
    });
    cy.get('.MuiTableBody-root > :nth-child(1)').click();
    cy.get('#name').clear().type('James');
    cy.get('#email').clear().type('james@gmail.com');
    cy.get('#password').clear().type('senha123');
    cy.get('.RaToolbar-defaultToolbar > .MuiButton-contained').click();
    cy.contains('Element updated');
    cy.get('.RaNotification-undo').click();
    cy.contains('Angela');
  });
});