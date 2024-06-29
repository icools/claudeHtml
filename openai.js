function fetchChatGPTResponse(apiKey, systemPrompt, userPrompt, progressBar, progressInterval) {
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
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
