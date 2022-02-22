
@@ -0,0 +1,77 @@
<sefertos="cipreste"/>

importação { ApiRest } de '.. /.. /.. /suporte/solicitações/ApiRest.js'
importação { FakeRestAPI } de '.. /.. /.. /suporte/solicitações/endpoints/FakeRestAPI.js'

contexto ('Teste de API', () => {

 const apiRest = novo ApiRest();
 const fakeApi = novo FakeRestAPI();

 it('Teste de solicitação GET', () => {
 apiRest. executarGet (fakeApi. getBooks()). ((resposta) => {
 esperar (resposta. status). para. eq(200)
 deixe bodyStr = JSON. stringify (resposta. corpo)
 esperar (bodyStr). contém ("Livro 1")
        })
    })

 it('Teste de solicitação POST', () => {

        /*Envio do CORPO como JSON pode ser feito dessa maneira ou como no próximo exemplo
        Depende muito de cada caso e da sua necessidade */

 deixar corpo = {}
 corpo. id = 12345
 corpo. título = "TESTE DE API"
 corpo. descrição = "TESTE DE API"
 corpo. pageCount = 1
 corpo. trecho = "string"
 corpo. publicadoDeuta = "2021-08-12T04:26:57.852Z"

 apiRest. executePost (fakeApi. postBooks(), corpo). ((resposta) => {
 esperar (resposta. status). para. eq(200)
 deixe bodyStr = JSON. stringify (resposta. corpo)
 esperar (bodyStr). para. eq(JSON. stringify(corpo))
        })
    });

 it('Teste de solicitar POST com Fixtures', () => {
 cy. luminária ('jsonBooks.json'). em seguida((booksJson) => {
 apiRest. executePost (fakeApi. postBooks(), booksJson). ((resposta) => {
 esperar (resposta. status). para. eq(200)
 deixe bodyStr = JSON. stringify (resposta. corpo)
 esperar (bodyStr). para. eq(JSON. stringify(booksJson))
            })
        })
    });

 it('Teste de solicitação GET por ID', () => {
 apiRest. executarGet (fakeApi. getBooksById(2)). ((resposta) => {
 esperar (resposta. status). para. eq(200)
 esperar (JSON. stringify (resposta. corpo)). para. contém('id":2')
        })
    });

 it('Teste de solicitação PUT por ID', () => {
 deixar corpo = {}
 corpo. id = 9876
 corpo. título = "TESTE DE API"
 corpo. descrição = "TESTE DE API"
 corpo. pageCount = 1
 corpo. trecho = "string"
 corpo. publicadoDeuta = "2021-08-12T04:26:57.852Z"

 apiRest. executarPut (fakeApi. putBooksById(9876), corpo). ((resposta) => {
 esperar (resposta. status). para. eq(200)
 esperar (JSON. stringify (resposta. corpo)). para. contém('id":9876')
        })
    });

 ('Teste de solicitação DELETE por ID', () => {
 apiRest. executarDelete (fakeApi. getBooksById(2)). ((resposta) => {
 esperar (resposta. status). para. eq(200)
 esperar (resposta. corpo). para. ser. vazio
        })
    });
})
