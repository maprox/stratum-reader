# Stratum Reader

Reads data from stratum proxy and sends to AMQP exchange

## Requirements

* [Node.JS](https://nodejs.org)
* Some AMQP server (tested only with [RabbitMQ](https://www.rabbitmq.com),
  but theoretically can work with others)

## Installation

    git clone https://github.com/maprox/stratum-reader.git
    cd stratum-reader
    npm install

## Run

    npm start

### Options

* **WS_URL** - Stratum websockets path / **REQUIRED**

* **WEB_LOGIN** - Stratum web login / **REQUIRED**

* **LOG_LEVEL** [*debug*] - Log level

* **LOG_FORMAT** [*\[%t\] %l:*] - Log format

* **AMQP_EXCHANGE** [*stratum*] - exchange name in AMQP server.
    All messages will be published to this exchange.

* **AMQP_CONNECTION** [*amqp://guest:guest@127.0.0.1//*] - AMQP
    connection string

---

[![forthebadge](http://forthebadge.com/images/badges/designed-in-ms-paint.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/fuck-it-ship-it.svg)](http://forthebadge.com)

