async function askAI() {
    const input = document.getElementById("question");
    const question = input.value.trim();

    if (!question) return;

    const chat = document.getElementById("chat");

    chat.innerHTML += `
        <div class="user-message">
            ${question}
        </div>
    `;

    const thinkingId = "ai-" + Date.now();

    chat.innerHTML += `
        <div class="ai-message" id="${thinkingId}">
            Thinking...
        </div>
    `;

    input.value = "";

    try {
        const response = await fetch("/api/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        document.getElementById(thinkingId).innerHTML =
            data.answer || data.error || "Bir hata oluştu.";

    } catch (error) {
        document.getElementById(thinkingId).innerHTML =
            "Sunucuya bağlanılamadı.";
    }
}

document.getElementById("question").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        askAI();
    }
});