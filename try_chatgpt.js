// 保留原有的代碼...

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

    // 按鈕按下效果
    const sendButton = document.getElementById('sendButton');
    sendButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        sendButton.style.transform = 'scale(1)';
    }, 100);

    // 顯示進度條
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

    // Fetch ChatGPT response
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openAiApi}`
        },
        body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: [
                        {
                            type: 'text',
                            text: systemPrompt
                        }
                    ]
                },
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: userPrompt
                        }
                    ]
                }
            ],
            temperature: 0.95,
            max_tokens: 165,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        })
    })
    .then(response => response.json())
    .then(data => {
        clearInterval(progressInterval);
        progressBar.style.display = 'none';
        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            const content = data.choices[0].message.content;
            document.getElementById('resultCard').innerHTML = `<p>${content.trim()}</p>`;
            showFireworks(); // 顯示煙火效果
        } else {
            document.getElementById('resultCard').innerHTML = '<p>Error: Invalid response format.</p>';
        }
    })
    .catch(error => {
        clearInterval(progressInterval);
        progressBar.style.display = 'none';
        console.error('Error:', error);
        document.getElementById('resultCard').innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

// 新增煙火效果函數
function showFireworks() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.classList.add('firework');
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * window.innerHeight + 'px';
            firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
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