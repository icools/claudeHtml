async function sendRequest() {
    console.log("sendRequest");
    const apiKeyInput = document.getElementById("apiKey");
    const apiKey = apiKeyInput.getAttribute("data-original") || apiKeyInput.value;
    const question = document.getElementById("question").value;
    const model = document.getElementById("modelSelect").value;
    const loadingDiv = document.getElementById("loading");
    const responseDiv = document.getElementById("response");

    if (!apiKey) {
        alert("請輸入 Groq API Key");
        return;
    }

    apiKeyInput.style.display = "none";
    loadingDiv.style.display = "block";
    responseDiv.textContent = "";

    let displayText = "";
    try {
        const response = await translateText(model, question, apiKey);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            displayText = data.choices[0].message.content;
        } else {
            displayText = "No response received from the API.";
        }
    } catch (error) {
        responseDiv.textContent = `Error: ${error.message}`;
    } finally {
        responseDiv.textContent = displayText;
        loadingDiv.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.onload = function () {
        const apiKeyInput = document.getElementById("apiKey");
        const savedApiKey = localStorage.getItem("groqApiKey");
        if (savedApiKey) {
            apiKeyInput.value = "*".repeat(savedApiKey.length);
            apiKeyInput.setAttribute("data-original", savedApiKey);
        }

        // chrome.storage.local.get("selectedText", (data) => {
        //     if (data.selectedText) {
        //         document.getElementById("question").value = data.selectedText;
        //     }
        // });

        apiKeyInput.addEventListener("change", function () {
            if (this.value && this.value !== "*".repeat(this.value.length)) {
                localStorage.setItem("groqApiKey", this.value);
                this.setAttribute("data-original", this.value);
                this.value = "*".repeat(this.value.length);
            }
        });
        apiKeyInput.addEventListener("focus", function () {
            if (this.getAttribute("data-original")) {
                this.value = this.getAttribute("data-original");
            }
        });

        apiKeyInput.addEventListener("blur", function () {
            if (this.getAttribute("data-original")) {
                this.value = "*".repeat(this.getAttribute("data-original").length);
            }
        });

        document.getElementById("start_send").addEventListener("click", sendRequest);
    };
});

function clearApiKey() {
    localStorage.removeItem("groqApiKey");
    document.getElementById("apiKey").value = "";
    document.getElementById("apiKey").removeAttribute("data-original");
}

async function agent(model, text, groqApiKey, messages) {
    return await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${groqApiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messages),
    });
}

async function translateText(model, text, groqApiKey) {
    return agent(model, text, groqApiKey, {
        messages: [
            {
                role: "user",
                content: `將英文內容翻譯成用 繁體中文，不需要額外的解釋.${text}`,
            }
        ],
        model: model,
    });
}