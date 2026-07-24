require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.38.0/min/vs' }});

require(['vs/editor/editor.main'], function() {
    window.editor = monaco.editor.create(document.getElementById('monaco-container'), {
        value: '// ShiftDev Studio - Engine Initialized\n\nfunction startStudio() {\n    console.log("Welcome to ShiftDev Cloud Studio Pro");\n}\n\nstartStudio();',
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true
    });
});
