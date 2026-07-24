let cmEditor = null;

function initCodeMirror() {
    const container = document.getElementById('codemirror-editor-container');
    if (!container) return;

    cmEditor = CodeMirror(container, {
        value: "<!DOCTYPE html>\n<html lang=\"ar\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>ShiftDev App</title>\n</head>\n<body>\n    <header>\n        <h1>مرحباً بك في ShiftDev Editor!</h1>\n    </header>\n</body>\n</html>",
        mode: "htmlmixed",
        theme: "dracula",
        lineNumbers: true,
        lineWrapping: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        extraKeys: {
            "Ctrl-Q": function(cm) { cm.foldCode(cm.getCursor()); },
            "Ctrl-Space": "autocomplete"
        }
    });

    cmEditor.setSize("100%", "100%");

    cmEditor.on("change", () => {
        if (state.activeFile && state.files[state.activeFile]) {
            state.files[state.activeFile].content = cmEditor.getValue();
            saveSession();
            triggerAutoPreview();
        }
    });
}

function setEditorLanguageByExtension(filename) {
    if (!cmEditor) return;
    const ext = filename.split('.').pop().toLowerCase();
    
    let mode = "htmlmixed";
    if (ext === "js") mode = "javascript";
    if (ext === "css") mode = "css";
    if (ext === "json") mode = "javascript";
    if (ext === "py") mode = "python";

    cmEditor.setOption("mode", mode);
}
