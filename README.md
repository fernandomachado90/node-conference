# node-conference
Simple conference scheduling API written in Node.js.

## Requisites

- [Node](https://nodejs.org/en/)

## Commands

### `make setup`
Install dependencies.

### `make format`
Formats source files with [Prettier](https://prettier.io/).

### `make test`                    
Runs all available tests using [Jest](https://jestjs.io/) and [Supertest](https://github.com/visionmedia/supertest).

### `make run`
Starts the server application locally on port `3000`.

## Endpoints

#### `POST /`
Given the provided talks, responds with a possible schedule for the conference.

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
            "User Interface CSS in Rails Apps 30min"
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
                    "04:15PM User Interface CSS in Rails Apps 30min",
                    "05:00PM Networking Event",
                ]
            }
        ]
    }
