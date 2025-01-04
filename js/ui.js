export function copyToClipboard() {
    const outputJson = document.getElementById('outputJson');
    outputJson.select();
    document.execCommand('copy');
    
    const copyBtn = document.querySelector('.btn-secondary');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyBtn.textContent = originalText;
    }, 2000);
}