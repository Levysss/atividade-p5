let grid = [];
let cols, rows;
let w = 40; // Tamanho de cada célula
let start, target;

let bfsAgent, dfsAgent;

function setup() {
  createCanvas(600, 400);
  cols = floor(width / w);
  rows = floor(height / w);

  // Inicializa o Grid
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  // Define Início e Alvo
  start = grid[0][0];
  target = grid[cols - 1][rows - 1];
  start.wall = false;
  target.wall = false;

  // Cria os Agentes (Passando o tipo de busca)
  bfsAgent = new Agent(start, target, 'BFS', color(0, 150, 255, 100));
  dfsAgent = new Agent(start, target, 'DFS', color(255, 150, 0, 100));
}

function draw() {
  background(220);
  
  // Desenha o Mapa
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  // Atualiza e mostra os agentes
  bfsAgent.update();
  bfsAgent.show();
  
  dfsAgent.update();
  dfsAgent.show();
  
  // Legenda
  fill(0);
  noStroke();
  text("🤖 Robô (BFS - Caminho Curto)", 10, height - 25);
  text("👻 Fantasma (DFS - Explorador Profundo)", 10, height - 10);
}

// --- CLASSE CÉLULA ---
class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.wall = random(1) < 0.2; // 20% de chance de ser parede
  }

  show() {
    stroke(200);
    fill(this.wall ? 50 : 255);
    rect(this.i * w, this.j * w, w, w);
    if(this === target) fill(0, 255, 0), ellipse(this.i*w+w/2, this.j*w+w/2, w*0.6);
  }
}

// --- CLASSE AGENTE (Onde a mágica acontece) ---
class Agent {
  constructor(start, target, type, col) {
    this.type = type;
    this.color = col;
    this.queue = [start]; // Para BFS usa shift(), para DFS usa pop()
    this.visited = new Set();
    this.parentMap = new Map();
    this.path = [];
    this.found = false;
    this.finished = false;
  }

  update() {
    if (this.queue.length > 0 && !this.found) {
      // Diferença crucial: BFS remove o primeiro (FIFO), DFS remove o último (LIFO)
      let current = (this.type === 'BFS') ? this.queue.shift() : this.queue.pop();

      if (current === target) {
        this.found = true;
        this.reconstructPath(current);
        return;
      }

      if (!this.visited.has(current)) {
        this.visited.add(current);
        let neighbors = this.getNeighbors(current);
        for (let neighbor of neighbors) {
          if (!this.visited.has(neighbor) && !this.queue.includes(neighbor)) {
            this.parentMap.set(neighbor, current);
            this.queue.push(neighbor);
          }
        }
      }
    }
  }

  getNeighbors(cell) {
    let n = [];
    let {i, j} = cell;
    if (i < cols - 1 && !grid[i+1][j].wall) n.push(grid[i+1][j]);
    if (i > 0 && !grid[i-1][j].wall) n.push(grid[i-1][j]);
    if (j < rows - 1 && !grid[i][j+1].wall) n.push(grid[i][j+1]);
    if (j > 0 && !grid[i][j-1].wall) n.push(grid[i][j-1]);
    return n;
  }

  reconstructPath(cell) {
    let temp = cell;
    while (this.parentMap.has(temp)) {
      this.path.push(temp);
      temp = this.parentMap.get(temp);
    }
  }

  show() {
    // Mostra área visitada (Visualização da busca)
    fill(this.color);
    noStroke();
    for (let cell of this.visited) {
      rect(cell.i * w, cell.j * w, w, w);
    }

    // Mostra o caminho final
    stroke(this.type === 'BFS' ? [0, 0, 255] : [255, 0, 0]);
    strokeWeight(4);
    noFill();
    beginShape();
    for (let p of this.path) {
      vertex(p.i * w + w/2, p.j * w + w/2);
    }
    endShape();
  }
}