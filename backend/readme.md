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
