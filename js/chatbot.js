document.addEventListener("DOMContentLoaded", function () {
    const chatBubble = document.getElementById("chat-bubble");
    const chatFullContainer = document.getElementById("chat-full-container");
    const chatMessages = document.getElementById("chat-messages");
    const chatInputField = document.getElementById("chat-input-field");
    const chatSendBtn = document.getElementById("chat-send-btn");
    const minimizeBtn = document.getElementById("minimize-btn");
    const chatHelpMessage = document.getElementById("chat-help-message");

    // Mostrar solo la burbuja al cargar o recargar la página
    chatBubble.style.display = "flex";
    chatFullContainer.style.display = "none";

    // Expandir el chatbox al hacer clic en la burbuja
    chatBubble.addEventListener("click", function () {
        chatFullContainer.style.display = "flex";
        chatBubble.style.display = "none";
    });

    // Minimizar el chat y mostrar solo la burbuja
    minimizeBtn.addEventListener("click", function () {
        chatFullContainer.style.display = "none";
        chatBubble.style.display = "flex";
        chatMessages.innerHTML = ''; // Limpiar mensajes (opcional)
    });

    // Crear efecto intermitente en el mensaje de "Ayuda"
    setInterval(() => {
        if (chatBubble.style.display === "flex") {
            chatHelpMessage.classList.toggle("hidden");
        }
    }, 1000);

    // Manejo de envío de mensajes
    chatSendBtn.addEventListener("click", handleUserMessage);
    chatInputField.addEventListener("keypress", function (event) {
        if (event.key === 'Enter') {
            handleUserMessage();
        }
    });

    async function handleUserMessage() {
        const userMessage = chatInputField.value.trim();
        if (!userMessage) return;

        appendMessage('Tú', userMessage);
        chatInputField.value = '';

        appendMessage('Bot', 'Pensando...');

        try {
            const botResponse = await fetchOpenAIResponse(userMessage);
            updateBotMessage(botResponse);
        } catch (error) {
            updateBotMessage('Lo siento, hubo un problema al conectar con el servidor.');
            console.error(error);
        }
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.style.marginBottom = '10px';
        messageElement.innerHTML = `<strong>${sender}:</strong> <span>${message}</span>`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function updateBotMessage(message) {
        const botMessages = chatMessages.querySelectorAll('span');
        botMessages[botMessages.length - 1].textContent = message;
    }

    // Función para hacer una solicitud al API de OpenAI
    async function fetchOpenAIResponse(prompt) {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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` // Reemplaza con tu clave de API
            },
            body: JSON.stringify({
                model: "text-davinci-003", // Escoge el modelo que necesites
                prompt: prompt,
                max_tokens: 150 // Ajusta según el contexto
            })
        });

        if (!response.ok) {
            throw new Error(`Error al conectar con el API: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].text.trim();
    }
});

