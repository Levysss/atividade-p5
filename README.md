# ⚔️ Desafio: O Duelo de Algoritmos (BFS vs DFS)

Este projeto é uma implementação interativa desenvolvida em **p5.js** para o **Meet 01 - Fundamentos de Grafos e Busca Cega**. O objetivo é demonstrar visualmente as diferenças comportamentais entre a busca em largura e a busca em profundidade.

## 📜 A Narrativa
A cena se passa em uma masmorra gerada proceduralmente via Grid:
- **🤖 O Robô (BFS):** Um agente sistemático e calculista. Ele analisa todas as opções ao seu redor antes de dar o próximo passo, garantindo sempre o **caminho mais curto**.
- **👻 O Fantasma (DFS):** Um agente impulsivo. Ele escolhe uma direção e segue nela até o fim, explorando becos profundos antes de retornar, o que nem sempre resulta no caminho mais eficiente.

---

## 🧠 Lógica de Implementação

A arquitetura do código foi projetada para destacar a diferença fundamental entre as duas buscas utilizando uma única classe `Agent`. A distinção ocorre na manipulação da **Fronteira de Busca**:

### 1. Breadth-First Search (BFS)
Implementado utilizando uma **Fila (Queue)**. No código, isso é feito através do método `.shift()`:
- **Lógica:** FIFO (*First In, First Out*).
- **Comportamento Visual:** Expande-se como uma "onda" ou mancha de óleo a partir do ponto inicial.
- **Resultado:** Encontra o caminho com o menor número de nós (ótimo).

### 2. Depth-First Search (DFS)
Implementado utilizando uma **Pilha (Stack)**. No código, isso é feito através do método `.pop()`:
- **Lógica:** LIFO (*Last In, First Out*).
- **Comportamento Visual:** Comporta-se como uma "cobra", mergulhando fundo em um caminho até encontrar um obstáculo e realizar o *backtracking*.
- **Resultado:** Encontra um caminho funcional, mas raramente o mais curto.

---

## 🛠️ Funcionalidades Técnicas

- **Mapa Dinâmico:** Um grid de células com obstáculos (paredes) gerados aleatoriamente (densidade de 20%).
- **Visualização da Fronteira:** O rastro semitransparente mostra em tempo real todos os nós que o algoritmo visitou/processou.
- **Reconstrução de Caminho:** Utiliza um `parentMap` (Dicionário de Pais) para traçar a linha final do objetivo até a origem.
- **Interface Visual:** Cores distintas para diferenciar os algoritmos e elementos visuais para facilitar a leitura do mapa.

---

## 🚀 Como Visualizar

1. Acesse o [p5.js Web Editor](https://editor.p5js.org/).
2. Cole o código fonte fornecido no arquivo `sketch.js`.
3. Pressione o botão **Play** ▶️.

---
**Desenvolvido para fins acadêmicos - Disciplina de IA/Grafos.**