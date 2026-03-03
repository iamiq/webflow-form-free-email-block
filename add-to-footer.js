<script>
(() => {
  const blocked = new Set([
    "gmail.com","googlemail.com",
    "outlook.com","hotmail.com","hotmail.co.uk","hotmail.fr","hotmail.de","hotmail.es","hotmail.it",
    "live.com","live.co.uk","live.fr","live.de","live.nl","live.se","live.no","live.dk","live.com.au","msn.com",
    "yahoo.com","yahoo.co.uk","yahoo.fr","yahoo.de","yahoo.es","yahoo.it","yahoo.com.au","yahoo.ca","yahoo.in","yahoo.co.jp",
    "ymail.com","rocketmail.com",
    "icloud.com","me.com","mac.com",
    "aol.com","aol.co.uk",
    "proton.me","protonmail.com","protonmail.ch",
    "gmx.com","gmx.co.uk","gmx.de","gmx.net","gmx.at","gmx.ch","gmx.fr",
    "mail.com","email.com","usa.com","myself.com","consultant.com","engineer.com","worker.com","techie.com","writeme.com",
    "tutanota.com","tutamail.com","tuta.io","keemail.me",
    "fastmail.com","fastmail.fm","fastmail.cn","fastmail.to","fastmail.net","fastmail.org",
    "zoho.com",
    "mail.ru","yandex.com","yandex.ru","yandex.ua","yandex.kz","rambler.ru","bk.ru","inbox.ru","list.ru",
    "web.de","t-online.de","freenet.de",
    "laposte.net","free.fr","orange.fr","wanadoo.fr","sfr.fr","neuf.fr","bbox.fr",
    "libero.it","virgilio.it","tiscali.it","alice.it",
    "terra.com","terra.es",
    "ziggo.nl","kpnmail.nl","hetnet.nl","upcmail.nl",
    "telia.com","bredband.net",
    "naver.com","daum.net","hanmail.net","qq.com","163.com","126.com","sina.com","rediffmail.com",
    "inbox.com","lycos.com","aim.com","hushmail.com","hush.com","hushmail.me","startmail.com","mailfence.com","runbox.com",
    "posteo.de","posteo.net","disroot.org","guerrillamail.com","sharklasers.com","guerrillamailblock.com","grr.la",
    "guerrillamail.info","guerrillamail.biz","guerrillamail.de","guerrillamail.net","guerrillamail.org"
  ]);

  const ERROR_CLASS = "email-domain-error";

  function isBlocked(domain) {
    // Fast path
    if (blocked.has(domain)) return true;

    // Subdomain support: strip leftmost label(s) and check again.
    // Example: a.b.gmail.com -> b.gmail.com -> gmail.com
    let d = domain;
    while (true) {
      const dot = d.indexOf(".");
      if (dot === -1) return false;
      d = d.slice(dot + 1);
      if (blocked.has(d)) return true;
    }
  }

  function showError(input, message) {
    let msg = input.parentElement.querySelector(`.${ERROR_CLASS}`);
    if (!msg) {
      msg = document.createElement("div");
      msg.className = ERROR_CLASS;
      msg.style.cssText = "color:#d64545;margin-top:6px;font-size:14px;";
      input.parentElement.appendChild(msg);
    }
    msg.textContent = message;
    input.style.borderColor = "#d64545";
  }

  function clearError(input) {
    const msg = input.parentElement.querySelector(`.${ERROR_CLASS}`);
    if (msg) {
      msg.remove();
      input.style.borderColor = "";
    }
  }

  document.addEventListener("submit", (e) => {
    if (!(e.target instanceof HTMLFormElement)) return;

    const emailInput = e.target.querySelector('input[type="email"]');
    if (!emailInput) return;

    const value = (emailInput.value || "").trim().toLowerCase();
    const at = value.lastIndexOf("@");
    if (at < 0 || at === value.length - 1) return;

    const domain = value.slice(at + 1);
    if (isBlocked(domain)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      showError(emailInput, `Please use your work email (not @${domain}).`);
      emailInput.focus();
    }
  }, true);

  document.addEventListener("input", (e) => {
    if (e.target instanceof HTMLInputElement && e.target.type === "email") {
      clearError(e.target);
    }
  }, true);
})();
</script>
