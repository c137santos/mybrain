---
title: "Escondendo informações na aplicação Django"
date: 2022-06-30
tags: [python, django, variáveis-de-ambiente, segurança, backend]
---

# Escondendo informações na aplicação Django

Sem usar o Docker e usando o Pycharm, o VSCode e com `.env` e `python-decouple`.

- [a) Primeiro no Pycharm](#a-primeiro-no-pycharm)
- [b) Agora VSCode](#b-agora-no-vscode)
- [c) Arquivo .env e Python-decouple](#c-arquivo-env-e-python-decouple)

---

Após o push no nosso projeto inicial, eu e a [Marília Borgo](https://medium.com/@mariliaborg) recebemos um e-mail misterioso do GitHub. E-mail do GitHub Guardian com o recado que **"Django Secret Key exposed on GitHub"**. WTF? O que foi isso? O que é uma secret key?

Estamos no início do aprendizado do framework Django, ele também faz parte dos nossos primeiros passos no desenvolvimento web. No Django, a chave secreta é uma variável responsável por assinar, e consequentemente validar, alguns processos específicos que são acionados no projeto.

Eu, sem saber muita coisa, acabei subindo hardcode (ou seja, a minha própria chave) para o GitHub. O GitHub Guardian, que é uma aplicação do GitHub, veio me avisar que houve a exposição de informação sensível.

Se eu simplesmente retirasse aquela variável do código, apagar aquela linha, tudo ia quebrar! Pensando em uma solução, os devs **Bruno Picinin** e **Erle Carrara** me explicaram sobre um caminho. Eu não queria usar o Docker (talvez porque ainda nem faça ideia do que é isso). E TODO TUTORIAL TINHA DOCKER! Aí vai uma receita sem docker e com variáveis de ambiente.

Por meio de variável de ambiente pode ser possível esconder informações secretas como a `SECRET_KEY`!

Variáveis de ambiente são variáveis como aquelas que criamos em nossas aplicações (`a = 1 + 1`, `a = 2`). Porém, elas "moram" e são usadas para passar informações para determinado processo que está executando nossa aplicação. Variáveis de ambiente são uma boa maneira de definir variáveis necessárias em seu aplicativo, especificamente Django no Heroku.

O que é exportar uma variável de ambiente? Bem, é colocar uma variável e seu valor em um processo comum no seu OS.

Como eu utilizo o Pycharm, a receitinha utilizará a interface deste. Também existe o tutorial do VSCode, que foi escrito pela Marília Borgo. Porém, se você quer entender o assunto completamente, é super necessário que você leia como fazer no Pycharm, pois aqui eu adiciono mais explicações conceituais desse problema, enquanto no VSCode é bem direto ao ponto, e pode causar alguma confusão.

Futuramente, pretendemos fazer algo que utilize apenas comandos no terminal, porque escrever sobre botões de IDE envelhece bem rápido.

Sempre saiba que a interface executa comandos no terminal, por debaixo dos panos.

---

## a) Primeiro no Pycharm

### 1º Import os

Primeira coisa: importar a biblioteca que permitirá o acesso do valor da variável de ambiente. Então, importe o `os` no começo do código no arquivo `settings.py` do projeto Django.

```python
import os
```

### 2º Trocando o valor da variável por uma variável de ambiente

Escolha uma variável que você quer trocar o valor para uma variável de ambiente.

Em meu caso, o problema foi o `SECRET_KEY`. No meu projeto, como comentado, estava em hardcode dessa forma — expondo explicitamente minha chave lá no GitHub. Então, utilizando a extensão `getenv` da biblioteca `os`, você pega o valor da variável de ambiente que vamos exportar.

Vamos lá: por boas práticas, o nome da variável de ambiente exportada deve ter o mesmo nome da variável que pretende substituir. Então troque para algo como:

```python
SECRET_KEY = os.getenv('SECRET_KEY')
```

Escreve `os`, ponto (`.`), escreve `getenv` colado, abre parêntese, abre aspas, nome da variável exportada, fecha aspas e fecha parêntese.

> Essas variáveis de ambiente criadas dentro da venv não vão existir para outros processos, ok? Por isso cada projeto deve exportar e importar as suas variáveis de ambiente para que elas não interfiram umas nas outras em caso de exportação em um env do sistema operacional como um todo.

### 3º Exportando a variável de ambiente

No Pycharm, as variáveis de ambiente podem ser adicionadas no arquivo de edição de configuração do run.

O botão fica entre "code with me" (os dois bonequinhos) e o play do run code. No meu caso, como estou rodando Django, meu botão está escrito `manage`, mas pode estar escrito o nome de outro módulo — o mais comum é o módulo `main`.

Segundo botão da esquerda para direita. Não tem como eu ser mais clara!

Clique no botão e em **editar configurações**. Ao abrir a janela de Run/Debug Configuration, o setor que iremos mexer se chama **Environment**. Especificamente vamos alterar seu primeiro local, o **Environment Variables**. É preciso clicar no ícone de lista que existe no final da caixa de texto.

Ao clicar no ícone, a caixa de texto a seguir nos permite exportar variável de ambiente via IDE apenas para aquele projeto em específico. Você pode perceber que no meu caso já existe uma variável `PYTHONUNBUFF…` com valor `1` — já estava assim quando cheguei.

Ao clicar no `+` de adicionar User Environment Variables, é possível dar nome e valor. O valor da `SECRET_KEY` tem que ser longo e aleatório o suficiente para que seja aceito como uma secret key.

Agora é possível vê-la como uma variável de ambiente em nosso projeto por meio da IDE.

Como boas práticas, é preciso não apenas passar o valor real da secret, que funcionará em seu ambiente, mas também um **valor default**, porque outro dev que forkar e tentar rodar o código, sem esse valor default, o projeto vai quebrar, visto que o `os.getenv` não encontrará valor na variável buscada.

Portanto, o segundo parâmetro passado significa o valor default, para que o `os.getenv` possa rodar com alguma coisa e não quebrar toda a aplicação.

A nova forma, portanto, será:

```python
SECRET_KEY = os.getenv('SECRET_KEY', 'valor-default-para-outros-devs')
```

Apagamos a forma antiga que tinha a senha escrita e substituímos por essa nova sintaxe. Agora já sabemos esconder nossas informações, criar variáveis de ambiente e ainda deixar o código pronto para rodar para outros devs sem quebrá-los por falta de valor para retornar.

> **Comentário essencial do Victor Augusto — muito obrigada por contribuir!**
>
> "Se realizar esse procedimento para esconder variáveis de ambiente através do Pycharm usando o 'Environment variables', lembre-se que tudo que inserir ali será enviado para a pasta oculta `.idea/`, sendo esta a pasta de configurações de IDE.
>
> Acontece que realizar esse processo de esconder as credenciais pelas configurações do Pycharm faz com que as chaves sejam enviadas para o arquivo `.idea/workspace.xml`, dentro da chave `<envs>`.
>
> O Github com seu gitignore padrão NÃO ignora a pasta `.idea/`, assim esse arquivo será versionado para o repositório junto com as chaves.
>
> Lembre-se de colocar sempre a pasta `.idea/` no `.gitignore_global` para evitar este problema de chaves e de configurações da IDE também."

---

## b) Agora no VSCode

Para configurar essa variável de ambiente no VSCode e, ao mesmo tempo, já ajudar em futuros debugs! A primeira coisa que precisa ser feita é abrir a seção de debugs e clicar no hiperlink do "to customize Run and Debug, open a folder and create a `launch.json` file."

Ou seja, o arquivo que cuida dessas questões se chama `launch.json`. Após clicar, você deve selecionar que você está trabalhando em um projeto Python. O VSCode até sugere.

Agora ele vai criar um arquivo no seguinte modelo — e aqui será necessário adicionar dois pontos. Presta atenção nas vírgulas, tá?

**1 —** Insira abaixo de `program` outra chave e valor para o argumento de rodar o seu `runserver` pela IDE. Isso ajudará no debug depois. Então adicione:

```json
"args": ["runserver"],
```

**2 —** A variável de ambiente será adicionada em um `env`. A chave `env` tem um valor que será um outro dicionário com variáveis de ambiente necessárias. Nesse caso, você usará a `SECRET_KEY`:

```json
"env": {"SECRET_KEY": "essaSenhaDeveSerAleatóriaEGrandeSuficienteParaSerAceita"},
```

O arquivo completo deve ficar assim:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Django",
            "type": "python",
            "request": "launch",
            "program": "${workspaceFolder}/manage.py",
            "args": ["runserver"],
            "env": {
                "SECRET_KEY": "essaSenhaDeveSerAleatóriaEGrandeSuficienteParaSerAceita"
            }
        }
    ]
}
```

Entenda esse código:

- **Django** — é o nome da configuração de debug. Isso te ajudará no futuro com o VSCode.
- **cwd** — (change working directory) onde roda o comando.
- **program: manage.py** — é o arquivo que usar para rodar o programa.
- **args** — é o argumento para o `manage.py`.
- **env** — é onde a gente adiciona as variáveis de ambiente como a `SECRET_KEY`.

Agora:

a) Retorne ao seu código do arquivo `settings.py`.  
b) Importe a biblioteca `os` no início do código.  
c) Utilize a função `getenv` da biblioteca `os` para pegar o valor da variável de ambiente `SECRET_KEY`:

```python
SECRET_KEY = os.getenv('SECRET_KEY')
```

d) Agora rode o runserver, e espero que tudo tenha dado certo.

Agradeço especialmente à Marília Borgo pelo seu material.

---

## c) Arquivo .env e Python-decouple

O `python-decouple` serve para criar um arquivo com todas as informações sensíveis. É legal guardar, por exemplo, login e password do Banco de dados. O comportamento do decouple é procurar as variáveis de ambiente que não encontra no código e buscar no arquivo `.env`.

### 1º Baixar o python-decouple

Primeira coisa: instalar o `python-decouple` com a `.venv` ativa no seu terminal.

```bash
pip install python-decouple
```

### 2º Cria um arquivo .env na raiz

Crie um arquivo `.env` no seu projeto, no mesmo nível do `manage.py`, e adicione as variáveis com seus valores.

```
SECRET_KEY=valor-longo-e-aleatório-da-sua-chave
DB_NAME=nome_do_banco
DB_USER=usuario
DB_PASSWORD=senha
```

Não é necessário colocar entre `""`, visto que tudo no arquivo `.env` é compreendido como string. Assim como o decouple também converte tudo para string — então não se preocupe com as aspas.

> **Atenção:** NÃO pode ter ESPAÇO entre o nome da variável, o `=` e o valor dela. Tem que ser tudo coladinho mesmo, para não dar problema.

Outros frameworks são espertinhos o suficiente para identificar o `.env` e saber que é um arquivo de variáveis de ambiente, buscando seus valores lá automaticamente. No Django não é tão automático assim — é preciso uma biblioteca para auxiliar a organizar o ambiente e as variáveis. A ideia é não mais espalhar as variáveis sensíveis pelo arquivo `settings.py`.

Nesse caso vamos usar o `python-decouple`. Com essa lib não é mais necessário ficar setando variáveis de ambiente por meio da IDE ou código.

### 3º Trabalhando no settings.py

Agora no seu arquivo `settings.py` (ou em outro arquivo que precise esconder informações confidenciais), importe o `decouple` junto com as outras bibliotecas:

```python
from decouple import config
```

Agora você pode trocar o valor hardcode assim como trocamos com o `os`, porém, ao invés do `os.getenv`, utilize a função `config` + nome da variável de ambiente + nome da variável que possui um valor default + valor default:

```python
SECRET_KEY = config('SECRET_KEY', default='valor padrão, caso não exista essa variável de ambiente')
```

Exemplo com banco de dados:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', default=''),
        'USER': config('DB_USER', default=''),
        'PASSWORD': config('DB_PASSWORD', default=''),
    }
}
```

> **Um detalhe importante:** se você for subir isso no git, certifique que seu `.gitignore` está configurado para NÃO subir o arquivo `.env`! Se não, todo nosso trabalho vai por água abaixo.

Bem gente, não tem como ser mais Clara que isso.
