# Api Rest usuarios

## end points

### GET/users

esse endpoint é responsável por retornar os usuários cadastrados

### Parametros

nenhum

### Respostas

#### ok! 200

caso essa resposta você resceberá a listagem dos usuarios

## exemplo de resposta:

```
[
      {
            "id": 11,
            "nome": "pedro alvarez cabral",
            "idade": "32",
            "email": "alvarez@gmail.com",
            "createdAt": "2022-11-12T19:42:36.000Z",
            "updatedAt": "2022-11-16T20:35:15.000Z"
      },
      {
            "id": 26,
            "nome": "lauricio teste",
            "idade": "12",
            "email": "lauricio@gmail.com",
            "createdAt": "2022-11-16T21:03:02.000Z",
            "updatedAt": "2022-11-16T21:03:02.000Z"
      },
      {
            "id": 27,
            "nome": "lauricio",
            "idade": "22",
            "email": "lauriciomalek@gmail.com",
            "createdAt": "2022-11-18T12:27:27.000Z",
            "updatedAt": "2022-11-18T12:27:27.000Z"
      }
]
```

#### Falha na altenticação ! 401

caso esse resposta houve algum durante o processo de autenticação de requisição.

#### possiveis erros : token inválido, token expirado.

### exemplo de resposta:

```
{
      "erro": "token invalido"
}
```


### POST /auth 
esse endpoint é responsável por fazer o processo de login;
### Parametros :
email:"email cadastrado",
password:"senha correspondente ao email"


### exemplo:
```
{

      "email":"lauricio@gmail.com",
      "password":"lauricio22"
}
```


#### Respostas:


#### ok! 200

caso essa resposta você resceberá o token jwt para conseguir acessar endpoints protejidos

## exemplo de resposta:

```
{
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhdXJpY2lvQGdtYWlsLmNvbSIsImlhdCI6MTY2ODc4MTA2NywiZXhwIjoxNjY4OTUzODY3fQ.uvbWW0bBcWM2MOIY5o0waw58V9bYVdJtsiXvTzfBR5I"
}
```

#### Falha na altenticação ! 401

caso esse resposta houve algum durante o processo de autenticação de requisição.

#### possiveis erros : senha/email incorretos.

### exemplo de resposta:

```
{
      "erro": "credenciais inválidas"
}
```

