// ai-town.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 載入 SVG 圖片
const assets = {
  grass: new Image(),
  church: new Image(),
  house: new Image(),
  park: new Image(),
  npcMaleYoung: new Image(),
  npcFemaleYoung: new Image(),
  npcMaleOld: new Image(),
  npcFemaleOld: new Image(),
};

// 設定圖像來源
assets.grass.src = 'assets/grass.svg';
assets.church.src = 'assets/church.svg';
assets.house.src = 'assets/house.svg';
assets.park.src = 'assets/park.svg';
assets.npcMaleYoung.src = 'assets/npc_male_young.svg';
assets.npcFemaleYoung.src = 'assets/npc_female_young.svg';
assets.npcMaleOld.src = 'assets/npc_male_old.svg';
assets.npcFemaleOld.src = 'assets/npc_female_old.svg';

// 定義角色類
class Character {
  constructor(name, sprite, x, y, role) {
    this.name = name;
    this.sprite = sprite; // Image 對象
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.direction = 'right';
    this.moving = false;
    this.role = role; // 角色職業或身份
  }

  draw() {
    ctx.drawImage(this.sprite, this.x, this.y, 48, 48); // 調整大小
  }

  update() {
    if (this.moving) {
      switch (this.direction) {
        case 'up':
          this.y -= this.speed;
          break;
        case 'down':
          this.y += this.speed;
          break;
        case 'left':
          this.x -= this.speed;
          break;
        case 'right':
          this.x += this.speed;
          break;
      }
      // 簡單的邊界檢查
      if (this.x < 0) this.x = 0;
      if (this.y < 0) this.y = 0;
      if (this.x > canvas.width - 48) this.x = canvas.width - 48;
      if (this.y > canvas.height - 48) this.y = canvas.height - 48;
    }
  }

  move(direction) {
    this.direction = direction;
    this.moving = true;
  }

  stop() {
    this.moving = false;
  }
}

// 創建角色實例
const characters = [];

// 圖片載入完成後初始化角色
let assetsLoaded = 0;
const totalAssets = Object.keys(assets).length;

for (let key in assets) {
  assets[key].onload = () => {
    assetsLoaded++;
    if (assetsLoaded === totalAssets) {
      initializeCharacters();
      requestAnimationFrame(gameLoop);
    }
  };
}

function initializeCharacters() {
  const npc1 = new Character('John', assets.npcMaleYoung, 100, 100, 'Farmer');
  const npc2 = new Character('Jane', assets.npcFemaleYoung, 200, 150, 'Teacher');
  const npc3 = new Character('Robert', assets.npcMaleOld, 300, 200, 'Retired');
  const npc4 = new Character('Emily', assets.npcFemaleOld, 400, 250, 'Baker');
  characters.push(npc1, npc2, npc3, npc4);
}

// 繪製背景
function drawBackground() {
  // 繪製草地
  ctx.drawImage(assets.grass, 0, canvas.height - 100, canvas.width, 100);

  // 繪製教堂
  ctx.drawImage(assets.church, 700, canvas.height - 300, 200, 200);

  // 繪製房屋
  ctx.drawImage(assets.house, 100, canvas.height - 250, 150, 150);
  ctx.drawImage(assets.house, 300, canvas.height - 250, 150, 150);

  // 繪製公園
  ctx.drawImage(assets.park, 500, canvas.height - 200, 200, 100);
}

// 遊戲主循環
function gameLoop() {
  // 清除畫布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 繪製背景
  drawBackground();

  // 更新並繪製角色
  characters.forEach(character => {
    character.update();
    character.draw();
  });

  requestAnimationFrame(gameLoop);
}

// 隨機移動角色
setInterval(() => {
  characters.forEach(character => {
    const directions = ['up', 'down', 'left', 'right', 'stop'];
    const choice = directions[Math.floor(Math.random() * directions.length)];
    if (choice === 'stop') {
      character.stop();
    } else {
      character.move(choice);
    }
  });
}, 2000);
