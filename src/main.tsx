// Simple Hello World Application
console.log('Hello World App Started!');

// Create main content
const app = document.getElementById('root');
if (app) {
  app.innerHTML = `
    <div class="container">
      <header class="header">
        <h1 class="title">Hello World</h1>
        <p class="subtitle">シンプルなWebアプリケーション</p>
      </header>
      
      <main class="main">
        <div class="card">
          <h2>Welcome!</h2>
          <p>これは完全に単純化されたHello Worldアプリケーションです。</p>
          <button id="clickBtn" class="button">クリックしてください</button>
          <p id="message" class="message"></p>
        </div>
        
        <div class="features">
          <div class="feature-item">
            <h3>✨ シンプル</h3>
            <p>純粋なHTML、CSS、JavaScriptのみ</p>
          </div>
          <div class="feature-item">
            <h3>🚀 高速</h3>
            <p>外部依存なしで即座に動作</p>
          </div>
          <div class="feature-item">
            <h3>🔒 安全</h3>
            <p>外部通信なしで完全にローカル</p>
          </div>
        </div>
      </main>
      
      <footer class="footer">
        <p>&copy; 2024 Hello World App</p>
      </footer>
    </div>
  `;

  // Simple JavaScript interaction
  const button = document.getElementById('clickBtn');
  const message = document.getElementById('message');
  let clickCount = 0;

  if (button && message) {
    button.addEventListener('click', () => {
      clickCount++;
      message.textContent = `ボタンが ${clickCount} 回クリックされました！`;
      message.style.opacity = '0';
      setTimeout(() => {
        message.style.opacity = '1';
      }, 100);
    });
  }
}