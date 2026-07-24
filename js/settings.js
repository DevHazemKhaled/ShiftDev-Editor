function updateEditorSettings() {
    const fontSize = document.getElementById('setting-font-size').value;
    const tabSize = document.getElementById('setting-tab-size').value;
    const theme = document.getElementById('setting-editor-theme').value;

    if (cmEditor) {
        cmEditor.setOption("tabSize", parseInt(tabSize));
        cmEditor.setOption("theme", theme);
        
        const wrapper = cmEditor.getWrapperElement();
        wrapper.style.fontSize = fontSize + "px";
        cmEditor.refresh();
    }
}
