Feature: Página de carrinhos
Scenario: Verificar o botão de carrinho e a página
  Given que estou na página home
  And eu estou logado com "johnd" e "m38rmF$"
  When eu navego para a página do carrinho
  Then eu devo ver mensagem de carregamento "Carregando carrinhos"
  And eu devo ver texto indicando "Meus Carrinhos"
