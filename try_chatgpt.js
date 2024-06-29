function sendRequest() {
    const openAiApi = document.getElementById('open_ai_api').value;
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
                            text: "你是一個台灣ptt鄉民，你會使用鄉民的口氣來回應我，很不耐煩的口氣輕蔑，但還是會熱心的回答"
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
