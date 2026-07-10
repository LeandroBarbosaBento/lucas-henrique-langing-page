# Lucas Henrique Santos — Landing page

Página institucional para um psicanalista de Natal/RN, com atendimento
presencial e online e contato direto por WhatsApp. Feita apenas com HTML, CSS
e JavaScript puros (Tailwind via CDN só para utilitários pontuais). Não
precisa de build nem servidor — basta abrir o `index.html` no navegador.

```
index.html    estrutura e conteúdo
estilos.css   todo o design (variáveis, layout, animações)
script.js     lanterna, revelações no scroll, WhatsApp e o "dia"
```

---

## Direção — "vir à luz"

O site inteiro é uma travessia: **começa na noite** (o não-dito, aquilo que
ainda não tem nome) e **só amanhece no final, no contato**. A metáfora não é
decorativa — ela reproduz o próprio movimento da análise: partir do escuro e
chegar à palavra. Cada decisão abaixo serve a essa ideia.

## Cores

Verde como pedido, mas trabalhado como hora do dia, não como cor de marca. A
paleta vai do quase-preto ao verde-aurora e está toda em variáveis CSS no topo
do [estilos.css](estilos.css):

| Papel | Hex | Onde |
|---|---|---|
| Noite / breu | `#04100C` · `#071C16` | fundo do herói e das seções escuras |
| Fundo profundo | `#0B2A20` | base verde da noite |
| Verde / brilho | `#3E9A78` · `#8FD6B4` | acentos, botões, luz da lanterna |
| Aurora | `#E7F0E2` | a luz do amanhecer (fundo do contato) |
| Tinta | `#0C2A1F` | texto escuro sobre a luz |

Decisão consciente: o amanhecer clichê é âmbar/laranja. Aqui a luz nasce
**verde-pálida**, como madrugada num lugar úmido — mantém a paleta e foge do
gradiente de nascer-do-sol de sempre.

## Tipografia

- **Fraunces** (display) — serifa com os eixos ópticos *SOFT* e *WONK*
  ativados, o que dá uma irregularidade orgânica; séria sem ser fria ou
  clínica. Usada com contenção, só nos títulos.
- **Karla** (corpo) — sem serifa, humanista, legível em textos longos.

A intenção foi que o par não parecesse o combo padrão (Playfair + Inter) que
aparece em qualquer landing.

## Elemento-assinatura — a lanterna

No herói, espalhados atrás do título, estão os "não-ditos" (*"o que se cala"*,
*"aquilo que volta"*, *"o sintoma"*…), quase invisíveis no escuro. Uma luz
suave segue o cursor com leve inércia e **acende** esses fragmentos conforme
passa por perto — o leitor literalmente ilumina o que já estava ali.

É o gesto central da página: o trabalho da análise virado em interação, não
enfeite. Implementado com uma `mask` radial ancorada na posição do ponteiro
(`--mx`/`--my`), atualizada num loop de `requestAnimationFrame`.

## O amanhecer

Um **único gradiente contínuo** atravessa as duas últimas seções ("Como
acontece" + contato), definido no contêiner `.crepusculo`. A escolha é técnica
e proposital: quando o degradê é dividido entre dois elementos, o encontro
deles deixa uma emenda visível (uma linha), por mais que as cores casem. Um só
gradiente elimina qualquer costura — a noite vira dia sem borda.

A primeira luz surge ainda na seção "Dois modos", sobe suave pelo FAQ e chega
à luz plena **antes** do conteúdo do contato, garantindo contraste no texto
escuro sobre o fundo claro. Ao cruzar o cabeçalho, ele inverte as cores (fica
claro) — a lógica do "dia" está no [script.js](script.js).

## Movimento e hover

Animação onde serve à travessia, não espalhada:

- **Entrada do herói** — título sobe linha a linha; kicker, subtítulo e botões
  revelam em sequência no load.
- **Revelação no scroll** — seções surgem ao entrar na tela
  (`IntersectionObserver`).
- **Hover** — cartas com brilho que nasce sob o cursor, links com sublinhado
  que desliza, botões que levitam, FAQ que abre com transição de altura.

Sem numeração decorativa (01/02/03): o conteúdo não é uma sequência, então
fingir que é seria enfeite vazio.

## Responsivo e acessível

- Coluna única no mobile; o CTA do topo dá lugar ao botão flutuante de
  WhatsApp.
- Foco de teclado sempre visível.
- `prefers-reduced-motion` respeitado — quem desativa animações vê tudo
  estático e legível.
- A lanterna depende de cursor: no toque, os fragmentos aparecem sutis e fixos
  (degradação intencional, sem tela vazia).

---

## Dados mockados (fáceis de trocar)

Tudo que é placeholder está marcado com o comentário `MOCK` no código:

- **WhatsApp e mensagem** — objeto `CONTATO` no topo do
  [script.js](script.js). Troque o número (formato `55DDNNNNNNNNN`) e ele se
  aplica a todos os botões de uma vez.
- **Nome, CRP, endereço, e-mail, Instagram** — direto no
  [index.html](index.html).
- **Foto** — placeholder em gradiente; em [estilos.css](estilos.css) há a
  variável `--foto` no seletor `.retrato__moldura` com instrução para apontar a
  imagem real.
