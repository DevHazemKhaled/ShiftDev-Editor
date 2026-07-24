console.log("[Terminal] Client script initialized.");
const termLog = document.getElementById('terminal-log');

function logTerminal(message) {
    if(termLog) {
        termLog.innerHTML += `<br>> ${message}`;
    }
}

logTerminal("Connecting to Cloud WebSockets Bridge...");
