function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tabId).classList.add('active');
  btn.classList.add('active');
}

function toggleFaq(el) {
  const item = el.parentElement;
  item.classList.toggle('active');
}

document.querySelectorAll('.copy-button').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-copy-target');
    const text = document.getElementById(targetId).innerText;
    navigator.clipboard.writeText(text);
    const originalText = btn.innerText;
    btn.innerText = 'Copied!';
    setTimeout(() => btn.innerText = originalText, 2000);
  });
});
