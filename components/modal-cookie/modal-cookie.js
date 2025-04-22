export function modalCookieConsent() {
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptAllButton = document.getElementById("accept-all-cookies");
  const customizeButton = document.getElementById("customize-cookies");
  const rejectAllButton = document.getElementById("reject-all-cookies");
  const cookieModal = document.getElementById("cookie-modal");
  const closeButton = document.querySelector(".close-button");
  const savePreferencesButton = document.getElementById("save-preferences");
  const analyticsCheckbox = document.getElementById("analytics-cookies");
  const marketingCheckbox = document.getElementById("marketing-cookies");
  const openCookieModalButton = document.getElementById("open-cookie-modal");

  const cookieName = "cookieConsent";

  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function showBanner() {
    cookieBanner.style.display = "block";
  }

  function hideBanner() {
    cookieBanner.style.display = "none";
  }

  function showModal() {
    cookieModal.style.display = "block";
  }

  function hideModal() {
    cookieModal.style.display = "none";
  }

  function checkConsent() {
    const consent = getCookie(cookieName);
    if (!consent) {
      showBanner();
      if (openCookieModalButton) {
        openCookieModalButton.style.display = "none";
      }
    } else {
      if (openCookieModalButton) {
        openCookieModalButton.style.display = "block";
      }
      hideBanner();
      const consentData = JSON.parse(consent);
      if (consentData.analytics) {
        //console.log("Cookies de análise ativados");
        // Ativar seus scripts de análise aqui
        analyticsCheckbox.checked = true;
      }
      if (consentData.marketing) {
        //console.log("Cookies de marketing ativados");
        // Ativar seus scripts de marketing aqui
        marketingCheckbox.checked = true;
      }
    }
  }

  acceptAllButton.addEventListener("click", function () {
    setCookie(
      cookieName,
      JSON.stringify({ necessary: true, analytics: true, marketing: true }),
      30
    );
    hideBanner();
    checkConsent();
    // Ativar todos os cookies aqui
    // console.log("Todos os cookies aceitos");
    // Recarregar a página ou executar as funções para ativar os cookies
  });

  rejectAllButton.addEventListener("click", function () {
    setCookie(
      cookieName,
      JSON.stringify({ necessary: true, analytics: false, marketing: false }),
      30
    );
    hideBanner();
    checkConsent();
    // Desativar todos os cookies não essenciais aqui
    // console.log("Todos os cookies rejeitados");
    // Recarregar a página ou executar as funções para desativar os cookies não essenciais
  });

  customizeButton.addEventListener("click", showModal);
  closeButton.addEventListener("click", hideModal);
  window.addEventListener("click", function (event) {
    if (event.target === cookieModal) {
      hideModal();
      checkConsent();
    }
  });

  savePreferencesButton.addEventListener("click", function () {
    const analyticsAccepted = analyticsCheckbox.checked;
    const marketingAccepted = marketingCheckbox.checked;
    setCookie(
      cookieName,
      JSON.stringify({
        necessary: true,
        analytics: analyticsAccepted,
        marketing: marketingAccepted,
      }),
      30
    );
    hideModal();
    hideBanner();
    checkConsent();
    // Ativar/desativar os cookies com base nas preferências
    // console.log("Preferências de cookies salvas:", {
    //   analytics: analyticsAccepted,
    //   marketing: marketingAccepted,
    // });
    // Recarregar a página ou executar as funções para ativar/desativar os cookies
  });

  openCookieModalButton.addEventListener("click", showModal);

  checkConsent();
}
