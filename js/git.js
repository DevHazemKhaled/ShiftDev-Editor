function connectGithub() {
    const token = document.getElementById('github-token').value.trim();
    const repo = document.getElementById('github-repo').value.trim();

    if (!token || !repo) {
        alert("يرجى إدخال Personal Access Token واسم المستودع بشكل صحيح.");
        return;
    }

    localStorage.setItem("GH_TOKEN", token);
    localStorage.setItem("GH_REPO", repo);
    printTerminalLog(`تم حفظ إعدادات GitHub للمستودع: ${repo}`, "success");
}

async function quickPushGit() {
    const token = localStorage.getItem("GH_TOKEN") || document.getElementById('github-token').value.trim();
    const repo = localStorage.getItem("GH_REPO") || document.getElementById('github-repo').value.trim();
    const commitMsg = document.getElementById('commit-msg').value.trim() || "تحديث تلقائي من ShiftDev Editor";

    if (!token || !repo) {
        alert("قم بضبط إعدادات الربط مع GitHub أولاً.");
        return;
    }

    printTerminalLog("جاري الرفع إلى GitHub...", "log");

    try {
        for (let filepath in state.files) {
            const content = state.files[filepath].content;
            const encodedContent = btoa(unescape(encodeURIComponent(content)));

            let sha = await getFileSha(repo, filepath, token);

            const bodyData = {
                message: commitMsg,
                content: encodedContent
            };
            if (sha) bodyData.sha = sha;

            const res = await fetch(`https://api.github.com/repos/${repo}/contents/${filepath}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });

            if (res.ok) {
                printTerminalLog(`تم رفع الملف بنجاح: ${filepath}`, "success");
            } else {
                const err = await res.json();
                printTerminalLog(`فشل رفع ${filepath}: ${err.message}`, "error");
            }
        }
    } catch (e) {
        printTerminalLog(`خطأ أثناء عملية الـ Push: ${e.message}`, "error");
    }
}

async function getFileSha(repo, filepath, token) {
    try {
        const res = await fetch(`https://api.github.com/repos/${repo}/contents/${filepath}`, {
            headers: { 'Authorization': `token ${token}` }
        });
        if (res.ok) {
            const data = await res.json();
            return data.sha;
        }
    } catch (e) {}
    return null;
}

function handleGitTerminalCommand(args) {
    const subCmd = args[0];
    if (subCmd === 'status') {
        printTerminalLog("التغييرات جاهزة للرفع (Staged for commit).", "success");
    } else if (subCmd === 'push') {
        quickPushGit();
    } else {
        printTerminalLog(`امر Git فرعي: ${subCmd || 'غير محدد'}. استخدم زر Push السريع للرفع مباشرة.`, "log");
    }
}
