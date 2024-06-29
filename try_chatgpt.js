// Load the API key from localStorage if available
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

function sendRequest() {
    const openAiApi = document.getElementById('open_ai_api').value;
    const systemPrompt = document.getElementById('system_prompt').value;
    const userPrompt = document.getElementById('user_prompt').value;

    if (!openAiApi || !userPrompt) {
        alert('Please enter both the API key and your prompt.');
        return;
    }

    // Show loading progress bar
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
