# node-conference
Simple conference scheduling API written in Node.js.

## Gerenciamento de Palestras

### Descrição

Sua empresa está organizando um grande evento de programação, e recebeu muitas
propostas de palestras para serem apresentadas. O problema é fazer todas elas
encaixarem no tempo -- tem muitas possibilidades! Então você decidiu escrever um
programa pra fazer isso pra você.

- Será um único dia de conferência, mas ocorrerão muitas trilhas simultaneamente. Cada
trilha tem uma sessão de manhã e outra de tarde. Cada sessão pode conter muitas
palestras.
- As sessões da manhã devem começar às 9 horas da manhã e terminar a tempo do almoço,
que será servido às 12 (meio dia).
- As sessões da tarde devem começar à 1 da tarde e terminar a tempo do happy hour.
- O happy hour não pode começar antes das 4 da tarde, nem depois das 5 da tarde. O
horário do happy hour deve ser o mesmo para todas as trilhas.
- Seu programa pode considerar que não haverá uma palestra com números no nome.
- A duração das palestras será dado em minutos ou com a string "lightning" indicando que ela
durará 5 minutos.
- Os palestrantes serão muito pontuais, você não precisa colocar um intervalo entre uma
palestra e outra.

### Solução

A arquitetura da aplicação está dividida em três camadas.
- `api.js`: Responsável por criar e disponibilizar o **servidor** para ouvir requisições. Apenas métodos `POST` serão aceitos (um erro `501` é retornado para métodos não implementados). Este nível contem **testes de integração** para simular casos de uso reais da aplicação.
- `parser.js`: Responsável por interpretar e converter o `body` das requisições para dados de **modelo de domínio** (e vice-versa).
- `scheduler.js`: Responsável por organizar a lista de `talks` recebidas em diferentes `tracks`, de acordo com as restrições definidas nas **regras de negócio**. O algoritmo proposto faz uma única passagem pela de lista de `talks`, tentando encaixar cada uma delas na `track` vigente e respeitando os intervalos fixos para almoço (12h-13h) e happy hour (17-18h). Se a palestra não couber na `track`, uma nova é criada.

## Requisitos

- [Node](https://nodejs.org/en/)

## Comandos

Através do `Makefile` provido, você pode rodar os comandos para instalar, testar e rodar a aplicação localmente.

### `make setup`
Instala dependências da aplicação.

### `make format`
Formata o código-fonte usando [Prettier](https://prettier.io/).

### `make test`                    
Roda testes disponíveis usando [Jest](https://jestjs.io/) e [Supertest](https://github.com/visionmedia/supertest).

### `make run`
Inicia o servidor da aplicação na porta `3000`.

## Endpoints

#### `POST /`
Dada um conjunto de palestras, responde com uma organização possível para a conferência.

###### request
    {
        "data": [
            "Writing Fast Tests Against Enterprise Rails 60min",
            "Overdoing it in Python 45min",
            "Lua for the Masses 30min",
            "Ruby Errors from Mismatched Gem Versions 45min",
            "Common Ruby Errors 45min",
            "Rails for Python Developers lightning",
            "Communicating Over Distance 60min",
            "Accounting-Driven Development 45min",
            "Woah 30min",
            "Sit Down and Write 30min",
            "Pair Programming vs Noise 45min",
            "Rails Magic 60min",
            "Ruby on Rails: Why We Should Move On 60min",
            "Clojure Ate Scala (on my project) 45min",
            "Programming in the Boondocks of Seattle 30min",
            "Ruby vs. Clojure for Back-End Development 30min",
            "Ruby on Rails Legacy App Maintenance 60min",
            "A World Without HackerNews 30min",
            "User Interface CSS in Rails Apps 45min"
        ]
    }
###### response
    {
        "data": [
            {
                "title": "Track 1",
                "data": [
                    "09:00AM Writing Fast Tests Against Enterprise Rails 60min",
                    "10:00AM Overdoing it in Python 45min",
                    "10:45AM Lua for the Masses 30min",
                    "11:15AM Ruby Errors from Mismatched Gem Versions 45min",
                    "12:00PM Lunch",
                    "01:00PM Common Ruby Errors 45min",
                    "01:45PM Rails for Python Developers lightning",
                    "01:50PM Communicating Over Distance 60min",
                    "02:50PM Accounting-Driven Development 45min",
                    "03:35PM Woah 30min",
                    "04:05PM Sit Down and Write 30min",
                    "05:00PM Networking Event",
                ]
            },
            {
                "title": "Track 2",
                "data": [
                    "09:00AM Pair Programming vs Noise 45min",
                    "09:45AM Rails Magic 60min",
                    "10:45AM Ruby on Rails: Why We Should Move On 60min",
                    "12:00PM Lunch",
                    "01:00PM Clojure Ate Scala (on my project) 45min",
                    "01:45PM Programming in the Boondocks of Seattle 30min",
                    "02:15PM Ruby vs. Clojure for Back-End Development 30min",
                    "02:45PM Ruby on Rails Legacy App Maintenance 60min",
                    "03:45PM A World Without HackerNews 30min",
                    "04:15PM User Interface CSS in Rails Apps 45min",
                    "05:00PM Networking Event",
                ]
            }
        ]
    }
