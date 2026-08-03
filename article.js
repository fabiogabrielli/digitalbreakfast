(() => {
  const canonicalUrl = document.querySelector('link[rel="canonical"]')?.href;
  const publishedUrl = window.location.protocol === 'file:'
    ? canonicalUrl
    : window.location.href.split('#')[0].split('?')[0];

  const articleUrl = publishedUrl || canonicalUrl || window.location.href;
  const linkedinButton = document.getElementById('linkedinShareButton');
  const copyButton = document.getElementById('copyLinkButton');

  if (linkedinButton && articleUrl) {
    linkedinButton.href =
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
  }

  copyButton?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = articleUrl;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }

    copyButton.classList.add('is-copied');
    copyButton.innerHTML =
      '<i data-lucide="check" class="h-4 w-4"></i><span>Link copiado!</span>';
    window.lucide?.createIcons();

    window.setTimeout(() => {
      copyButton.classList.remove('is-copied');
      copyButton.innerHTML =
        '<i data-lucide="link-2" class="h-4 w-4"></i><span>Copiar link</span>';
      window.lucide?.createIcons();
    }, 2200);
  });
})();
