window.onload = function() {
    const storedApiKey = localStorage.getItem('openai_api_key');
    const expiry = localStorage.getItem('openai_api_key_expiry');

    if (storedApiKey && expiry && new Date().getTime() < parseInt(expiry)) {
        document.getElementById('open_ai_api').value = atob(storedApiKey);
    } else {
        localStorage.removeItem('openai_api_key');
        localStorage.removeItem('openai_api_key_expiry');
    }
};

function sendRequest() {
    const openAiApi = document.getElementById('open_ai_api').value;
    const systemPrompt = document.getElementById('system_prompt').value;
    const userPrompt = document.getElementById('user_prompt').value;

    if (!openAiApi || !userPrompt) {
        alert('Please enter both the API key and your prompt.');
        return;
    }

    const sendButton = document.getElementById('sendButton');
    sendButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        sendButton.style.transform = 'scale(1)';
    }, 100);

    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    progressBar.style.display = 'block';
    progress.style.width = '0%';
    
    let progressInterval = setInterval(() => {
        let currentWidth = parseFloat(progress.style.width);
        if (currentWidth < 100) {
            progress.style.width = currentWidth + 1 + '%';
        } else {
            clearInterval(progressInterval);
        }
    }, 100);

    fetchChatGPTResponse(openAiApi, systemPrompt, userPrompt, progressBar, progressInterval);
}

function showFireworks() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.classList.add('firework');
            firework.style.position = 'fixed';
            firework.style.width = '5px';
            firework.style.height = '5px';
            firework.style.borderRadius = '50%';
            firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * window.innerHeight + 'px';
            document.body.appendChild(firework);
            setTimeout(() => {
                firework.remove();
            }, 500);
        }, i * 50);
    }
}

function saveApiKey() {
    const apiKey = document.getElementById('open_ai_api').value;
    const encryptedKey = btoa(apiKey);
    const expiryTime = new Date().getTime() + 3600 * 1000; // 1 hour

    localStorage.setItem('openai_api_key', encryptedKey);
    localStorage.setItem('openai_api_key_expiry', expiryTime.toString());
    alert('API Key saved. It will expire in 1 hour.');
}

function resetApiKey() {
    document.getElementById('open_ai_api').value = '';
    localStorage.removeItem('openai_api_key');
    localStorage.removeItem('openai_api_key_expiry');
    alert('API Key reset.');
}
