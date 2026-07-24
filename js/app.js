const state = {
    projectName: "Cloud_Project",
    files: {
        "index.html": { content: "<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n    <header>\n        <h1>ShiftDev</h1>\n    </header>\n</body>\n</html>" },
        "style.css": { content: "body { background: #121212; color: #fff; }" },
        "script.js": { content: "console.log('ShiftDev Online Editor Connected!');" }
    },
    openFiles: ["index.html"],
    activeFile: "index.html",
    activePanel: "explorer"
};

window.addEventListener('DOMContentLoaded', () => {
    initCodeMirror();
    renderFileTree();
    renderTabs();
    initThemeToggle();
    initNavigation();
    initResizers();
    runLivePreview();
});

function saveSession() {
    localStorage.setItem("SHIFTDEV_CLOUD_STATE", JSON.stringify(state));
}

function initNavigation() {
    document.querySelectorAll('.activity-bar .nav-btn[data-panel]').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPanel = btn.getAttribute('data-panel');
            
            document.querySelectorAll('.activity-bar .nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.panel-content').forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const p = document.getElementById(`panel-${targetPanel}`);
            if (p) p.classList.add('active');

            state.activePanel = targetPanel;
        });
    });
}

function initThemeToggle() {
    const btn = document.getElementById('theme-toggle-btn');
    btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', nextTheme);
        btn.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
        
        if (cmEditor) {
            cmEditor.setOption("theme", nextTheme === 'dark' ? "dracula" : "neo");
        }
    });
}

function renderFileTree() {
    const container = document.getElementById('file-tree-container');
    if (!container) return;
    container.innerHTML = "";

    Object.keys(state.files).forEach(filePath => {
        const item = document.createElement('div');
        item.className = `tree-item ${state.activeFile === filePath ? 'active' : ''}`;
        item.style.padding = "6px 10px";
        item.style.cursor = "pointer";
        item.style.fontSize = "0.85rem";
        item.innerHTML = `📄 ${filePath}`;
        
        item.onclick = () => openFile(filePath);
        container.appendChild(item);
    });
}

function openFile(filename) {
    state.activeFile = filename;
    if (!state.openFiles.includes(filename)) state.openFiles.push(filename);
    
    renderTabs();
    renderFileTree();
    
    if (cmEditor && state.files[filename]) {
        cmEditor.setValue(state.files[filename].content);
        setEditorLanguageByExtension(filename);
    }
}

function renderTabs() {
    const container = document.getElementById('editor-tabs-bar');
    if (!container) return;
    container.innerHTML = "";

    state.openFiles.forEach(f => {
        const tab = document.createElement('div');
        tab.className = `tab ${state.activeFile === f ? 'active' : ''}`;
        tab.style.padding = "6px 12px";
        tab.style.fontSize = "0.8rem";
        tab.style.cursor = "pointer";
        tab.style.borderLeft = "1px solid var(--border-color)";
        tab.style.background = state.activeFile === f ? "var(--bg-main)" : "var(--bg-secondary)";
        tab.innerHTML = `${f} <span onclick="event.stopPropagation(); closeTab('${f}')" style="margin-right:8px; font-weight:bold;">×</span>`;
        tab.onclick = () => openFile(f);
        container.appendChild(tab);
    });
}

function closeTab(f) {
    state.openFiles = state.openFiles.filter(item => item !== f);
    if (state.activeFile === f) {
        state.activeFile = state.openFiles.length > 0 ? state.openFiles[0] : null;
    }
    renderTabs();
    renderFileTree();
    if (state.activeFile && cmEditor) {
        cmEditor.setValue(state.files[state.activeFile].content);
    }
}

function createNewFilePrompt() {
    const name = prompt("أدخل اسم الملف الجديد مع امتداده:");
    if (!name) return;
    state.files[name] = { content: "" };
    openFile(name);
}

function createNewFolderPrompt() {
    alert("تم تجهيز شجرة المجلدات المتداخلة.");
}

function initResizers() {
    const sidebarResizer = document.getElementById('resizer-sidebar');
    const sidebar = document.getElementById('sidebar-panel');

    if (sidebarResizer && sidebar) {
        let isResizing = false;

        sidebarResizer.addEventListener('mousedown', (e) => {
            isResizing = true;
            document.body.style.cursor = 'col-resize';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            let newWidth = e.clientX - 50;
            if (newWidth > 150 && newWidth < 500) {
                sidebar.style.width = newWidth + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            isResizing = false;
            document.body.style.cursor = 'default';
        });
    }
}

let autoPreviewTimer;
function triggerAutoPreview() {
    clearTimeout(autoPreviewTimer);
    autoPreviewTimer = setTimeout(() => {
        runLivePreview();
    }, 800);
}

function runLivePreview() {
    const iframe = document.getElementById('preview-iframe');
    if (!iframe) return;

    let html = state.files["index.html"] ? state.files["index.html"].content : "";
    let css = state.files["style.css"] ? `<style>${state.files["style.css"].content}</style>` : "";
    let js = state.files["script.js"] ? `<script>${state.files["script.js"].content}<\/script>` : "";

    iframe.srcdoc = html.replace('</head>', css + '</head>').replace('</body>', js + '</body>');
}
