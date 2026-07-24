document.addEventListener('DOMContentLoaded', () => {
    console.log('[ShiftDev App Engine] Frontend Controller Ready.');
    
    // جلب الشجرة من السيرفر وعرضها في السايد بار
    const treeRoot = document.getElementById('tree-root');
    if (treeRoot) {
        fetch('/api/fs/tree')
            .then(res => res.json())
            .then(data => {
                if(data.success && data.files) {
                    treeRoot.innerHTML = '<ul style="list-style:none; padding:0; line-height:2; color: #a6adc8;">' + 
                        data.files.map(f => `<li>📄 ${f}</li>`).join('') + 
                        '</ul>';
                }
            })
            .catch(() => {
                treeRoot.innerText = 'تعذر تحميل المستكشف';
            });
    }
});
