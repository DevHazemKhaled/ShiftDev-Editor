document.addEventListener('DOMContentLoaded', () => {
    const termLog = document.getElementById('terminal-log');

    function appendTerminal(msg, isError = false) {
        if (!termLog) return;
        const color = isError ? '#f38ba8' : '#a6e3a1';
        termLog.innerHTML += `<div style="color: ${color}; margin-top: 4px;">> ${msg}</div>`;
        termLog.scrollTop = termLog.scrollHeight;
    }

    appendTerminal("Connecting to ShiftDev PieSocket Terminal Cluster...");

    // تهيئة الاتصال بـ PieSocket SDK
    if (typeof PieSocket !== 'undefined') {
        const pieSocket = new PieSocket.default({
            clusterId: 'ضع_الـ_Cluster_ID_هنا',
            apiKey: 'ضع_الـ_API_Key_هنا'
        });

        const channel = pieSocket.subscribe('shiftdev-terminal');

        channel.on('open', () => {
            appendTerminal("✅ Connected to Cloud Terminal Bridge via WebSocket.");
        });

        channel.on('message', (data) => {
            appendTerminal(`[Server Echo]: ${data.message}`);
        });

        channel.on('error', (err) => {
            appendTerminal("❌ Connection Error to PieSocket Cluster", true);
        });
    } else {
        appendTerminal("⚠️ PieSocket SDK not loaded. Running in local fallback mode.", true);
    }
});
