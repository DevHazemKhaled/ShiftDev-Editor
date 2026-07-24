document.addEventListener('DOMContentLoaded', () => {
    const termInput = document.getElementById('terminal-input');
    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = termInput.value.trim();
                termInput.value = '';
                executeTerminalCommand(command);
            }
        });
    }
});

function printTerminalLog(text, type = "log") {
    const output = document.getElementById('terminal-output');
    if (!output) return;

    const line = document.createElement('div');
    line.style.marginBottom = "4px";
    line.style.color = type === "error" ? "#ff5555" : (type === "success" ? "#50fa7b" : "#f8f8f2");
    line.textContent = text;
    
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

function clearTerminal() {
    const output = document.getElementById('terminal-output');
    if (output) output.innerHTML = "";
}

function executeTerminalCommand(cmd) {
    printTerminalLog(`shiftdev@cloud:~$ ${cmd}`, "log");

    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();

    switch (mainCmd) {
        case 'help':
            printTerminalLog("الأوامر المتاحة: ls, clear, node, python, git status, echo, cat", "success");
            break;
        case 'ls':
            printTerminalLog(Object.keys(state.files).join('   '), "log");
            break;
        case 'clear':
            clearTerminal();
            break;
        case 'node':
        case 'python':
            if (parts[1] && state.files[parts[1]]) {
                printTerminalLog(`[Running ${mainCmd} ${parts[1]}...]`, "success");
                try {
                    if (mainCmd === 'node') {
                        eval(state.files[parts[1]].content);
                    } else {
                        printTerminalLog("مُحاكي Python يعمل بنجاح مفعل من الـ Store عبر CDN.", "success");
                    }
                } catch (err) {
                    printTerminalLog(`Runtime Error: ${err.message}`, "error");
                }
            } else {
                printTerminalLog(`الرجاء تحديد اسم ملف موجود. مثال: ${mainCmd} script.js`, "error");
            }
            break;
        case 'git':
            handleGitTerminalCommand(parts.slice(1));
            break;
        default:
            if (cmd !== '') {
                printTerminalLog(`الأمر غير معروف: ${cmd}. اكتب 'help' للتعليمات.`, "error");
            }
            break;
    }
}
