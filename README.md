# A Simple MERN stack app

Simple Project on Adding and deleting items.
User authentication and Realtime data

# Getting Started

### 1. Clone the project and intall dependencies

Run the command

```
 npm install
```

> It will install all the dependency in server side

then,

```
 npm run client-intall
```

> It will install all the dependency in client side

### 2. Database URL and Secrete keys

Rename the file **_.env-default_** to **_.env_**

And, edit file

```
DBSTRING=<YOUR DATABASE STRING>
JWTSECRETE=<YOUR JWT  SECRETE KEY (Could be any random value)>
```

> Put your database string and a secret key (any random value) for JWTSECRETE **(without quotes)**

## 3. DONE

Finally, Run the command to see the result,

To run both the server and client

```
npm run dev
```

To run server alone,

```
npm run server
```

To run frontend alone,

```
npm run client
```
