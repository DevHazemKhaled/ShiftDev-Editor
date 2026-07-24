const availableExtensions = [
    { id: "python", name: "Python Support", desc: "تفعيل المحرك والإكمال التلقائي للغة بايثون", cdn: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/python/python.min.js" },
    { id: "clike", name: "C / C++ Support", desc: "دعم قواعد وتظليل لغات C و C++", cdn: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/clike/clike.min.js" },
    { id: "php", name: "PHP Language Pack", desc: "تلوين وإكمال تلقائي لملفات PHP", cdn: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/php/php.min.js" }
];

document.addEventListener('DOMContentLoaded', () => {
    renderExtensionStore();
});

function renderExtensionStore() {
    const container = document.getElementById('store-items-container');
    if (!container) return;

    container.innerHTML = "";
    availableExtensions.forEach(ext => {
        const card = document.createElement('div');
        card.style.background = "var(--bg-main)";
        card.style.border = "1px solid var(--border-color)";
        card.style.padding = "10px";
        card.style.borderRadius = "6px";
        card.style.marginBottom = "10px";

        card.innerHTML = `
            <h4 style="margin-bottom:4px; font-size:0.9rem;">${ext.name}</h4>
            <p style="font-size:0.75rem; color:var(--text-color); margin-bottom:8px;">${ext.desc}</p>
            <button class="btn btn-primary" onclick="installExtension('${ext.id}', '${ext.cdn}')">⚡ تثبيت بضغطة زر</button>
        `;
        container.appendChild(card);
    });
}

function installExtension(id, cdnUrl) {
    if (document.getElementById(`ext-${id}`)) {
        alert("هذه إضافة مثبتة بالفعل!");
        return;
    }

    const script = document.createElement('script');
    script.id = `ext-${id}`;
    script.src = cdnUrl;
    script.onload = () => {
        printTerminalLog(`تم تثبيت إضافة ${id} بنجاح عبر الـ CDN!`, "success");
        alert(`تم تثبيت ${id} بنجاح!`);
    };
    document.head.appendChild(script);
}
