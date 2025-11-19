// Widget WhatsApp — Reutilizável em todas as páginas
(function() {
  const whatsappNumber = '5511999999999'; // Altere para seu número (com código do país)
  const currentLang = localStorage.getItem('lang') || 'pt';
  
  const messages = {
    pt: {
      title: 'Fale Conosco',
      subtitle: 'Dúvidas sobre Novembro Azul?',
      placeholder: 'Escreva sua mensagem...',
      send: 'Enviar',
      hello: 'Olá! Gostaria de saber mais sobre os serviços oferecidos.'
    },
    en: {
      title: 'Contact Us',
      subtitle: 'Questions about Blue November?',
      placeholder: 'Write your message...',
      send: 'Send',
      hello: 'Hello! I would like to know more about the services offered.'
    }
  };

  const lang = messages[currentLang] || messages.pt;

  // Criar estilos CSS
  const styles = `
    .whatsapp-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999;
      font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial;
    }

    .whatsapp-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #25d366 0%, #20ba5a 100%);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 24px rgba(37, 211, 102, 0.3);
      transition: all 0.3s ease;
      color: white;
      font-size: 28px;
    }

    .whatsapp-button:hover {
      transform: scale(1.1);
      box-shadow: 0 12px 32px rgba(37, 211, 102, 0.4);
    }

    .whatsapp-button:active {
      transform: scale(0.95);
    }

    .whatsapp-popup {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 340px;
      max-width: calc(100vw - 32px);
      background: white;
      border-radius: 14px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
      border: 1px solid #e0e0e0;
      display: none;
      flex-direction: column;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .whatsapp-popup.active {
      display: flex;
      opacity: 1;
      transform: translateY(0);
    }

    .whatsapp-header {
      background: linear-gradient(135deg, #25d366 0%, #20ba5a 100%);
      color: white;
      padding: 16px;
      border-radius: 14px 14px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .whatsapp-header h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 700;
    }

    .whatsapp-header p {
      margin: 4px 0 0;
      font-size: 0.85rem;
      opacity: 0.9;
    }

    .whatsapp-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 20px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      transition: transform 0.2s;
    }

    .whatsapp-close:hover {
      transform: rotate(90deg);
    }

    .whatsapp-content {
      padding: 16px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .whatsapp-message {
      font-size: 0.9rem;
      color: #50575c;
      line-height: 1.5;
    }

    .whatsapp-input-group {
      display: flex;
      gap: 8px;
      align-items: flex-end;
    }

    .whatsapp-input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 0.85rem;
      font-family: inherit;
      transition: border-color 0.2s;
      resize: none;
      max-height: 80px;
    }

    .whatsapp-input:focus {
      outline: none;
      border-color: #25d366;
      box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.1);
    }

    .whatsapp-send-btn {
      background: linear-gradient(135deg, #25d366 0%, #20ba5a 100%);
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px 16px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.85rem;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .whatsapp-send-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
    }

    .whatsapp-send-btn:active {
      transform: translateY(0);
    }

    @media (max-width: 480px) {
      .whatsapp-widget {
        bottom: 16px;
        right: 16px;
      }

      .whatsapp-button {
        width: 56px;
        height: 56px;
        font-size: 26px;
      }

      .whatsapp-popup {
        width: calc(100vw - 32px);
        max-width: 320px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .whatsapp-button,
      .whatsapp-popup,
      .whatsapp-send-btn,
      .whatsapp-close {
        transition: none;
      }
    }
  `;

  // Injetar estilos
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Criar HTML do widget
  const widgetHTML = `
    <div class="whatsapp-widget" id="whatsapp-widget">
      <button class="whatsapp-button" id="whatsapp-toggle" title="Abra o chat do WhatsApp">
        💬
      </button>
      
      <div class="whatsapp-popup" id="whatsapp-popup">
        <div class="whatsapp-header">
          <div>
            <h3>${lang.title}</h3>
            <p>${lang.subtitle}</p>
          </div>
          <button class="whatsapp-close" id="whatsapp-close-btn">✕</button>
        </div>
        
        <div class="whatsapp-content">
          <p class="whatsapp-message">${lang.subtitle}</p>
          
          <div class="whatsapp-input-group">
            <textarea 
              class="whatsapp-input" 
              id="whatsapp-message" 
              placeholder="${lang.placeholder}"
              rows="3"
              maxlength="500"
            ></textarea>
            <button class="whatsapp-send-btn" id="whatsapp-send">${lang.send}</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Adicionar widget ao final do body
  document.addEventListener('DOMContentLoaded', function() {
    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    const toggle = document.getElementById('whatsapp-toggle');
    const popup = document.getElementById('whatsapp-popup');
    const closeBtn = document.getElementById('whatsapp-close-btn');
    const messageInput = document.getElementById('whatsapp-message');
    const sendBtn = document.getElementById('whatsapp-send');

    // Toggle popup
    toggle.addEventListener('click', function() {
      popup.classList.toggle('active');
      if (popup.classList.contains('active')) {
        messageInput.focus();
      }
    });

    // Fechar popup
    closeBtn.addEventListener('click', function() {
      popup.classList.remove('active');
    });

    // Fechar ao clicar fora
    document.addEventListener('click', function(e) {
      const widget = document.getElementById('whatsapp-widget');
      if (widget && !widget.contains(e.target)) {
        popup.classList.remove('active');
      }
    });

    // Enviar mensagem
    sendBtn.addEventListener('click', function() {
      const message = messageInput.value.trim();
      if (message) {
        const encodedMsg = encodeURIComponent(message);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, '_blank');
        messageInput.value = '';
        popup.classList.remove('active');
      }
    });

    // Enviar ao pressionar Enter + Ctrl/Cmd
    messageInput.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        sendBtn.click();
      }
    });

    // Listener para mudança de idioma
    const observer = setInterval(function() {
      const currentLangNow = localStorage.getItem('lang') || 'pt';
      if (currentLangNow !== currentLang) {
        currentLang = currentLangNow;
        updateWidgetLanguage(currentLang);
      }
    }, 500);
  });

  function updateWidgetLanguage(lang) {
    const currentLangData = messages[lang] || messages.pt;
    const header = document.querySelector('.whatsapp-header h3');
    const subtitle = document.querySelector('.whatsapp-header p');
    const message = document.querySelector('.whatsapp-message');
    const input = document.getElementById('whatsapp-message');
    const sendBtn = document.getElementById('whatsapp-send');

    if (header) header.textContent = currentLangData.title;
    if (subtitle) subtitle.textContent = currentLangData.subtitle;
    if (message) message.textContent = currentLangData.subtitle;
    if (input) input.placeholder = currentLangData.placeholder;
    if (sendBtn) sendBtn.textContent = currentLangData.send;
  }
})();
