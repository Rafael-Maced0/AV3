# Guia de Inscrições: Provas e Concursos

Portal informativo, responsivo e acessível que reúne, em um só lugar, os passos e os **links oficiais** para inscrição e acompanhamento do local de prova de exames, vestibulares e concursos.

> Este site **não é um portal oficial**. Ele apenas organiza links diretos para os portais oficiais. Confirme sempre datas, regras e prazos nos editais.

## Conteúdo

Cada modalidade tem sua própria aba, com passo a passo numerado:

| Aba | O que traz |
| --- | --- |
| **ENEM** | Edital (MEC), inscrição na Página do Participante (INEP), acompanhamento do local de prova e provas anteriores |
| **ENCCEJA** | Edital (INEP), inscrição, acompanhamento do local de prova e provas anteriores |
| **Vestibular UFSC** | Portal COPERVE, cadastro, acompanhamento do local de prova e provas anteriores |
| **Vestibular FMP** | Site do vestibular da Faculdade FMP (Palhoça – SC), inscrição, acompanhamento, material de estudo (Google Drive) e editais 004/FMP/2026 e 014/FMP/2026 |
| **IFSC** | Editais abertos, escolha de cidade (campus) e curso, cadastro, acompanhamento do resultado e provas anteriores |
| **Concursos Públicos** | Busca por estado no PCI Concursos e escolha da vaga |

## Funcionalidades

- **Abas** com navegação por teclado (setas, `Home` e `End`).
- **Filtros por categoria:** Todos, Vestibulares/Exames e Concursos.
- **Menu rápido** no cabeçalho que abre a aba correspondente.
- **Link direto para uma aba** pela URL, por exemplo `index.html#ufsc`.
- **Acessibilidade:** link "Ir para o conteúdo", foco visível, atributos ARIA nas abas e links externos identificados como "abre em nova aba".
- **Responsivo:** funciona em celular, tablet e computador.

## Estrutura de arquivos

```
.
├── index.html      # Conteúdo e estrutura
├── styles.css      # Visual (cores, layout, responsividade)
├── script.js       # Abas e filtros
├── img/
│   ├── enem.png
│   ├── encceja.png
│   ├── ufsc.png
│   ├── fmp.png
│   └── ifsc.png
└── README.md
```

> Mantenha a pasta `img/` ao lado do `index.html`, senão os logos não aparecem.

## Como executar

Não precisa instalar nada. Use uma das opções:

1. **Direto no navegador:** dê dois cliques em `index.html`.
2. **Com o VS Code:** instale a extensão *Live Server*, clique com o botão direito em `index.html` e escolha **Open with Live Server** (abre em `http://127.0.0.1:5500/index.html`).

## Identidade visual

| Uso | Cor |
| --- | --- |
| Fundo principal | `#333333` |
| Azul institucional (cabeçalho, títulos, botões primários) | `#0A31A6` |
| Verde (botões secundários, tags) | `#009C3B` |
| Amarelo (destaques, avisos, abas ativas) | `#FFDF00` |

**Tipografia:** o CSS usa a fonte *Rawline* se ela estiver disponível e, caso contrário, a *Inter* (Google Fonts). A Rawline não tem CDN pública; para usá-la, declare os arquivos da fonte com `@font-face` no `styles.css`.

## Como personalizar

### Alterar um link
Procure o botão no `index.html` pelo texto (por exemplo, "Consultar Edital") e troque o valor de `href`.

### Adicionar uma nova aba
1. Em `index.html`, adicione um botão dentro de `<div class="tabs">`:
   ```html
   <button type="button" role="tab" id="tab-novo" class="tab"
           data-tab="novo" data-category="exames"
           aria-controls="novo" aria-selected="false" tabindex="-1">Novo</button>
   ```
   Use `data-category="exames"` ou `"concursos"` para o filtro funcionar.
2. Adicione o painel correspondente, copiando um `<article class="card" role="tabpanel">` existente e usando `id="novo"` e `aria-labelledby="tab-novo"`.
3. (Opcional) Adicione o link no menu `<nav class="main-nav">` com `href="#novo"`.
4. Coloque o logo em `img/` e use `<div class="card-logo"><img src="img/novo.png" alt="..."></div>`. Para logos brancos ou transparentes, use a classe `card-logo--dark`, que remove a placa branca.

### Mudar as cores
Edite as variáveis no bloco `:root` no início do `styles.css`.

## Créditos e direitos de imagem

Os logos de ENEM, ENCCEJA, UFSC, FMP e IFSC pertencem às respectivas instituições e são usados aqui apenas para identificar cada processo seletivo.
