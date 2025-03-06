Feature: Login do usuário

  Scenario: Login com credenciais inválidas
    Given que eu estou na página home
    When eu navego para a página de login
    And eu insiro um "wrongUser" e "wrongPassword"
    And eu clico no botão de login
    Then eu devo ver uma mensagem de erro "Usuário ou senha inválidos!"

  Scenario: Login com credenciais válidas
    Given que eu estou na página home
    When eu navego para a página de login
    And eu insiro um "johnd" e "m38rmF$"
    And eu clico no botão de login
    Then eu devo ser redirecionado para a página inicial
    Then eu devo ver os botões "Carrinho" e "Perfil"
