(() => {
  const articleUrl = 'https://digitalbreakfast.com.br/sua-corretora-nao-precisa-de-mais-leads-precisa-aproveitar-melhor-os-que-ja-tem/';
  const linkedinButton = document.getElementById('linkedinShareButton');
  const copyButton = document.getElementById('copyLinkButton');

  if (linkedinButton) {
    linkedinButton.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
  }

  copyButton?.addEventListener('click', async () => {
    const label = copyButton.querySelector('span');

    try {
      await navigator.clipboard.writeText(window.location.href || articleUrl);
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href || articleUrl;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }

    copyButton.classList.add('is-copied');
    copyButton.innerHTML = '<i data-lucide="check" class="h-4 w-4"></i><span>Link copiado!</span>';
    window.lucide?.createIcons();

    window.setTimeout(() => {
      copyButton.classList.remove('is-copied');
      copyButton.innerHTML = '<i data-lucide="link-2" class="h-4 w-4"></i><span>Copiar link</span>';
      window.lucide?.createIcons();
    }, 2200);
  });
})();
