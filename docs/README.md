# Introdução

Informações básicas do projeto.

* **Projeto:** Midas - Organização financeira
* **Repositório GitHub:** https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-ppl-cc-m-20242-organizacao-financeira
* **Membros da equipe:**

  * Alessandro Andrade de Oliveira https://github.com/ale-andrade-o/ale-andrade-o
  * Pedro Henrique Cardoso Maia https://github.com/pedro-maia1337
  * André Almeida Costa https://github.com/And-30
  * Davi Manoel Bernardes https://github.com/DaviManoelB
  * Tiago Santos Nogueira https://github.com/TiagoSNogueira
  * Felipe Quites Lopes https://github.com/FelipeQLopes
  

A documentação do projeto é estruturada da seguinte forma:

1. Introdução
2. Contexto
3. Product Discovery
4. Product Design
5. Metodologia
6. Solução
7. Referências Bibliográficas



# Contexto

## Problema

Quando as pessoas começam a ter sua própria renda, é comum enfrentarem dificuldades para se organizar e planejar de forma eficiente como gastar e administrar seu dinheiro. Nosso projeto busca oferecer uma solução que ajudará essas pessoas a gerenciar melhor suas finanças, indicando como e quando gastar, onde investir e como controlar os gastos excessivos.

## Objetivos

O objetivo deste projeto é oferecer uma solução prática e eficaz para pessoas que enfrentam dificuldades em gerenciar suas finanças pessoais. Através de ferramentas intuitivas e personalizáveis, o aplicativo auxilia no controle dos gastos, planejamento de orçamento, acompanhamento de investimentos e na tomada de decisões financeiras mais conscientes. Queremos proporcionar uma experiência que simplifique o gerenciamento financeiro, ajudando os usuários a alcançar maior estabilidade e bem-estar econômico.

## Justificativa

A motivação para trabalhar com essa aplicação vem da crescente necessidade de educação financeira e controle eficiente de gastos, especialmente com a expansão do consumo digital. Escolhemos esses objetivos específicos para ajudar as pessoas a tomar decisões financeiras mais conscientes e evitar dívidas. Aprofundamos em aspectos como planejamento de orçamento e controle de investimentos porque são áreas-chave para promover estabilidade e segurança financeira no dia a dia.

## Público-Alvo

O público-alvo do nosso projeto são pessoas que enfrentam dificuldades em controlar suas finanças, com idade entre 25 e 65 anos. Este grupo inclui indivíduos em diferentes fases da vida, desde jovens adultos que estão começando a lidar com responsabilidades financeiras até aqueles que buscam mais estabilidade e controle em suas finanças pessoais.

# Product Discovery

## Etapa de Entendimento

> * **Matriz CSD**: também conhecida por Matriz de Alinhamento, é uma ferramenta utilizada no Design Thinking para organizar informações e facilitar o processo de tomada de decisão e solução de problemas.
>![Nossa Matriz](images/MatrizCSD.png)

> * **Mapa de stakeholders**: ferramenta que nos permite compreender o grupo de pessoas e entidades que devemos estudar e conversar para entender mais sobre o problema.
> ![Nossa Mapa](images/MapaStakeholders.png)

> * **Entrevistas qualitativas**: série de entrevistas qualitativas para validar suposições e solucionar as dúvidas com as principais pessoas envolvidas.
>  ![Nossa Entrevista](images/entrevista_quali1.png)

   ![Nossa Entrevista](images/entrevista_quali2.png)
   
   ![Nossa Entrevista](images/entrevista_quali3.png)
   
   ![Nossa Entrevista](images/entrevista_quali4.png)
   
> * **Highlights de pesquisa**: um compilado do levantamento realizado por meio das entrevistas.
>  ![Nossa Highlights](images/high1.png)

   ![Nossa Highlights](images/high2.png)
   
   ![Nossa Highlights](images/high3.png)
   
   ![Nossa Highlights](images/high4.png)

## Etapa de Definição

### Personas

## Persona 1
 ![Persona](images/persona1.png)

 ## Persona 2
 ![Persona](images/persona2.png)

 ## Persona 3
 ![Persona](images/persona3.png)

# Product Design

## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

| EU COMO                                                        | QUERO/PRECISO                                     | PARA                                                              |
| -------------------------------------------------------------- | --------------------------------------            | ----------------------------------------------------------------- |
| Alguém que sofre com dívidas                                   | Lembretes de vencimento de contas                 | Evitar pagar juros não essenciais                                 |
| Alguém que não tem muito tempo                                 | Painel de fluxo de caixa com relatórios visuais   | Gastar menos tempo organizando minhas finanças                    |
| Alguém desorganizado                                           | Painel de fluxo de caixa com gastos classificados | Saber as minhas maiores fontes de gastos                          |
| Alguém sem conhecimento de finanças pessoais                   | Dicas e aulas sobre finanças                      | Viver uma vida confortavel sem se preocupar com dinheiro          |
| Alguém que compra muito parcelado                              | Gráfico com o valor dos juros mensais             | Saber quanto estou gastando a mais em um produto                  |
| Alguém que quer viajar                                         | Registro de quanto estou juntando                 | Saber em quanto tempo vou ter o dinheiro suficiente               |
| Alguém que gastar valores muitos altos                         | Registrar quando gasta muito                      | Alerta quando o gasto esta muito alto                             |
| Usa muito cartão                                               | Colocar apelidos nos estabelecimentos na fatura   | Identificar de forma mais fácil na fatura qual foi o gasto e onde |
| Quero registrar e categorizar meus gastos diários facilmente   |Ferramentas de controle                            | Poder ter um maior controle do gasto mensal                       |

## Proposta de Valor

## Proposta da Persona 1
![proposta de valor](images/Proposta1.png)

## Proposta da Persona 2
![proposta de valor](images/Proposta2.png)

## Proposta da Persona 3
![proposta de valor](images/Proposta3.png)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais e restrições que detalham o escopo do projeto.

### Requisitos Funcionais

![Requisitos](images/Requisitos.png)

| ID      | Descrição dos Requisitos                                                                                                | Prioridade|
| ------  | ----------------------------------------------------------------------------------------------------------------------|-----------|
| RF-001  | O sistema deverá manter registro da entrada e saída do dinheiro mensal                                                | ALTA      |
| RF-002  | O sistema deverá mostra um relatório com todo o gasto e lucro do usuário em cada mês                                  | ALTA      |
| RF-003  | O sistema deverá ter um grafico de juros para saber quanto do valor do produto está sendo cobrado a mais              | MÉDIA     |
| RF-004  | O sistema deverá ter um calendário para lembrar o usuário do vencimento de contas cadastradas                         | ALTA      |
| RF-005  | O sistema deverá permitir colocar um nome fantasia na fatura do estabelecimento para ter uma identificação facilitada | MÉDIA     |
| RF-006  | Um sistema de cofre para saber quando uma meta específica será alcançada                                              | MÉDIA     |
| RF-007  | O sistema deverá ter uma divisão para cada tipo de gastos para maior organização financeira                           | ALTA      |
| RF-008  | O sitema deverá ter alertas quando um tipo de gasto esta alto                                                         | MÉDIA     |
| RF-009  | O sitema deverá ter acesso a conteúdos sobre educação financeira                                                      | MÉDIA     |
| RF-010  | O sistema deverá ter uma calculadora para mostra o gastos pro divida em cada mês.                                     | MÉDIA     |

### Requisitos não Funcionais

![Requisitos Não Funcionais](images/RequisitosN.png)

| ID      | Descrição dos Requisitos Não Funcionais                                                                       | Prioridade |
| ------- | ------------------------------------------------------------------------------------------------------------- | ---------- |
| RNF-001 | O aplicativo deve estar disponível tanto para versão web quanto para versão mobile                            | MÉDIA      |
| RNF-002 | O aplicativo deve ser capaz decarregar a página principal com resumo financeiro do usuário en até 2 segundos  | MÉDIA      |


### Restrições do Projeto

![Restrições](images/Restriçoes.png)

| ID      | Descrição das Restrições                                                                        | Prioridade |
| ------- | ----------------------------------------------------------------------------------------------- | ---------- |
| RE-001  | O usuário só pode criar um número limitado de categorias de gastos (por exemplo, no máxomp 30)  | MÉDIA      |
| RE-002  | O aplicativo pode impor uma restrição de gasto diário                                           | MÉDIA      |

## Projeto de Interface

Artefatos relacionados com a interface e a interacão do usuário na proposta de solução.

### Wireframes



![Wireframe](images/Wireframe.png)


### User Flow

![User Flow](images/User_FLow.png)

Para uma melhor visualização do User Flow acesse esse link: https://miro.com/app/board/uXjVLdtXMKg=/

### Protótipo Interativo


✅ [Protótipo Interativo (MarvelApp)](https://marvelapp.com/prototype/fe0ehf8)  


# Metodologia

Detalhes sobre a organização do grupo e o ferramental empregado.

## Ferramentas

Relação de ferramentas empregadas pelo grupo durante o projeto.

| Ambiente                    | Plataforma | Link de acesso                                                                        |
| --------------------------- | ---------- | --------------------------------------------------------------------------------------|
| Processo de Design Thinking | Miro       | https://miro.com/app/board/uXjVKoWGKUQ=/                                              |
| Repositório de código       | GitHub     | https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-ppl-cc-m-20242-organizacao-financeira |
| Hospedagem do site          | Render     | https://site.render.com/XXXXXXX ⚠️ EXEMPLO ⚠️                                        |
| Protótipo Interativo        | MarvelApp  | https://marvelapp.com/prototype/fe0ehf8                                               |
|                             |            |                                                                                       |

## Gerenciamento do Projeto

Divisão de papéis no grupo e apresentação da estrutura da ferramenta de controle de tarefas (Kanban).

![Kanban](images/kanban.png)



# Solução Implementada

Esta seção apresenta todos os detalhes da solução criada no projeto.

## Vídeo do Projeto

O vídeo a seguir traz uma apresentação do problema que a equipe está tratando e a proposta de solução. ⚠️ EXEMPLO ⚠️

[![Vídeo do projeto](images/video.png)](https://www.youtube.com/embed/70gGoFyGeqQ)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> O video de apresentação é voltado para que o público externo possa conhecer a solução. O formato é livre, sendo importante que seja apresentado o problema e a solução numa linguagem descomplicada e direta.
>
> Inclua um link para o vídeo do projeto.

## Funcionalidades

Esta seção apresenta as funcionalidades da solução.Info

##### Funcionalidade 1 - Cadastro de Contatos ⚠️ EXEMPLO ⚠️

Permite a inclusão, leitura, alteração e exclusão de contatos para o sistema

* **Estrutura de dados:** [Contatos](#ti_ed_contatos)
* **Instruções de acesso:**
  * Abra o site e efetue o login
  * Acesse o menu principal e escolha a opção Cadastros
  * Em seguida, escolha a opção Contatos
* **Tela da funcionalidade**:

![Tela de Funcionalidade](images/exemplo-funcionalidade.png)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente cada uma das funcionalidades que a aplicação fornece tanto para os usuários quanto aos administradores da solução.
>
> Inclua, para cada funcionalidade, itens como: (1) titulos e descrição da funcionalidade; (2) Estrutura de dados associada; (3) o detalhe sobre as instruções de acesso e uso.

## Estruturas de Dados

Descrição das estruturas de dados utilizadas na solução com exemplos no formato JSON.Info

##### Estrutura de Dados - Contatos   ⚠️ EXEMPLO ⚠️

Contatos da aplicação

```json
  {
    "id": 1,
    "nome": "Leanne Graham",
    "cidade": "Belo Horizonte",
    "categoria": "amigos",
    "email": "Sincere@april.biz",
    "telefone": "1-770-736-8031",
    "website": "hildegard.org"
  }
  
```

##### Estrutura de Dados - Usuários  ⚠️ EXEMPLO ⚠️

Registro dos usuários do sistema utilizados para login e para o perfil do sistema

```json
  {
    id: "eed55b91-45be-4f2c-81bc-7686135503f9",
    email: "admin@abc.com",
    id: "eed55b91-45be-4f2c-81bc-7686135503f9",
    login: "admin",
    nome: "Administrador do Sistema",
    senha: "123"
  }
```

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente as estruturas de dados utilizadas na solução tanto para dados utilizados na essência da aplicação quanto outras estruturas que foram criadas para algum tipo de configuração
>
> Nomeie a estrutura, coloque uma descrição sucinta e apresente um exemplo em formato JSON.
>
> **Orientações:**
>
> * [JSON Introduction](https://www.w3schools.com/js/js_json_intro.asp)
> * [Trabalhando com JSON - Aprendendo desenvolvimento web | MDN](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Objects/JSON)

## Módulos e APIs

Esta seção apresenta os módulos e APIs utilizados na solução

**Images**:

* Unsplash - [https://unsplash.com/](https://unsplash.com/) ⚠️ EXEMPLO ⚠️

**Fonts:**

* Icons Font Face - [https://fontawesome.com/](https://fontawesome.com/) ⚠️ EXEMPLO ⚠️

**Scripts:**

* jQuery - [http://www.jquery.com/](http://www.jquery.com/) ⚠️ EXEMPLO ⚠️
* Bootstrap 4 - [http://getbootstrap.com/](http://getbootstrap.com/) ⚠️ EXEMPLO ⚠️

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente os módulos e APIs utilizados no desenvolvimento da solução. Inclua itens como: (1) Frameworks, bibliotecas, módulos, etc. utilizados no desenvolvimento da solução; (2) APIs utilizadas para acesso a dados, serviços, etc.

# Referências

As referências utilizadas no trabalho foram:

* SOBRENOME, Nome do autor. Título da obra. 8. ed. Cidade: Editora, 2000. 287 p ⚠️ EXEMPLO ⚠️

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
>
> **Orientações**:
>
> - [Formato ABNT](https://www.normastecnicas.com/abnt/trabalhos-academicos/referencias/)
> - [Referências Bibliográficas da ABNT](https://comunidade.rockcontent.com/referencia-bibliografica-abnt/)
