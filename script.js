const homefixPhone = "224654255506";

const serviceDetails = {
  Plomberie: {
    summary:
      "Pour les fuites, robinets, WC, évacuations, lavabos, chauffe-eau simples et petits dépannages sanitaires à Kipé et Conakry.",
    points: [
      "Indiquez le quartier exact et depuis quand le problème existe.",
      "Ajoutez une photo ou vidéo si l’eau coule, fuit ou bloque l’utilisation.",
      "Une visite peut être proposée avant devis si le problème doit être vérifié.",
    ],
  },
  Électricité: {
    summary:
      "Pour les pannes électriques, prises, interrupteurs, luminaires, disjoncteurs et petits contrôles d’installation.",
    points: [
      "Précisez si toute la maison est touchée ou seulement une pièce.",
      "Ne manipulez pas un tableau ou câble dangereux avant avis.",
      "Les urgences sont priorisées si la sécurité est concernée.",
    ],
  },
  Climatisation: {
    summary:
      "Pour l’entretien, le nettoyage, les pannes, les fuites d’eau, le manque de froid et les contrôles de climatisation.",
    points: [
      "Indiquez la marque si vous la connaissez et le type de panne.",
      "Précisez si l’appareil s’allume, refroidit ou coule.",
      "Une photo de l’unité intérieure aide à qualifier la demande.",
    ],
  },
  Peinture: {
    summary:
      "Pour retouches, murs abîmés, rafraîchissement de pièces, bureaux, chambres, façades simples et finitions propres.",
    points: [
      "Envoyez les dimensions approximatives ou une photo du mur.",
      "Indiquez si vous avez déjà la peinture ou si un achat est nécessaire.",
      "Un devis peut dépendre de la préparation du support.",
    ],
  },
  Menuiserie: {
    summary:
      "Pour portes, serrures simples, meubles, charnières, étagères, petits ajustements et réparations bois.",
    points: [
      "Expliquez si la porte ferme mal, bloque ou doit être réparée.",
      "Ajoutez une photo de la pièce ou du meuble concerné.",
      "Les demandes sur mesure nécessitent souvent une visite.",
    ],
  },
  Nettoyage: {
    summary:
      "Pour nettoyage de maison, bureau, après travaux, entretien ponctuel, remise en état légère et préparation d’espace.",
    points: [
      "Indiquez la taille de l’espace et le type de nettoyage attendu.",
      "Précisez si le matériel doit être fourni par l’équipe.",
      "Les bureaux et résidences peuvent demander un forfait régulier.",
    ],
  },
  "Petits travaux": {
    summary:
      "Pour fixation, montage, réparation légère, installation simple, poignée, rideau, étagère, support TV ou ajustement rapide.",
    points: [
      "Listez tous les petits travaux à faire pour optimiser le déplacement.",
      "Ajoutez des photos pour éviter une mauvaise estimation.",
      "HomeFix 224 peut regrouper plusieurs tâches dans une même intervention.",
    ],
  },
  "Maintenance bureaux": {
    summary:
      "Pour PME, écoles, restaurants, commerces, résidences et bureaux qui veulent un suivi régulier avec un seul contact.",
    points: [
      "Indiquez le type d’espace, la fréquence souhaitée et les priorités.",
      "Les forfaits peuvent inclure prévention, coordination et interventions prioritaires.",
      "Idéal pour expatriés, bureaux et résidences qui veulent gagner du temps.",
    ],
  },
};

const baseMessage = {
  service: "Plomberie",
  urgency: "Non",
  name: "",
  phone: "",
  district: "Kipé",
  city: "Conakry",
  description: "",
  photo: "Non",
};

const form = document.querySelector(".request-form");
const formStatus = document.querySelector(".form-status");
const serviceSelect = document.querySelector("#service");
const servicePanel = document.querySelector("#service-panel");
const serviceTitle = document.querySelector("#service-title");
const serviceSummary = document.querySelector("#service-summary");
const servicePoints = document.querySelector("#service-points");
const serviceWhatsapp = document.querySelector("#service-whatsapp");
const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");
const urgentLink = document.querySelector("[data-urgent-link]");
const planLink = document.querySelector("[data-plan-link]");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const processSlider = document.querySelector("[data-process-slider]");
const processTabs = document.querySelectorAll("[data-process-step]");
const processPrevButton = document.querySelector("[data-process-prev]");
const processNextButton = document.querySelector("[data-process-next]");
const proofSection = document.querySelector("#confiance");
const proofControls = document.querySelectorAll("[data-proof-step]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const processSteps = [
  {
    number: "01",
    label: "Problème à la maison",
    title: "Le client signale son urgence",
    text:
      "Une fuite, une panne ou une clim bloquée : il envoie le quartier, une photo et le niveau d’urgence sur WhatsApp.",
    image: "assets/homefix-process-demande.jpg",
    alt: "Client HomeFix montrant une photo de son problème à un technicien",
  },
  {
    number: "02",
    label: "Diagnostic rapide",
    title: "HomeFix clarifie le besoin",
    text:
      "Nous vérifions le service, la priorité, le quartier et les informations utiles avant d’envoyer quelqu’un.",
    image: "assets/homefix-mission-client.jpg",
    alt: "Techniciens HomeFix échangeant avec une cliente à Conakry",
  },
  {
    number: "03",
    label: "Solution proposée",
    title: "Une estimation plus claire",
    text:
      "Selon le cas, le client reçoit une orientation, une estimation ou une proposition de visite avant confirmation.",
    image: "assets/homefix-proof-tech.jpg",
    alt: "Technicienne HomeFix contrôlant un tableau électrique",
  },
  {
    number: "04",
    label: "Intervention terrain",
    title: "L’intervention est organisée",
    text:
      "Le prestataire adapté intervient selon l’urgence, la disponibilité et le quartier, avec un suivi HomeFix.",
    image: "assets/homefix-process-intervention.jpg",
    alt: "Technicien HomeFix réalisant une intervention de plomberie",
  },
];

let activeProcessStep = 0;
let processAutoplay;

const proofSlides = [
  {
    rating: "★★★★★",
    quote:
      "“Quand il y a une fuite ou une panne, je veux une réponse claire avant que le problème ne s’aggrave.”",
    title: "Urgence à domicile",
    meta: "Plomberie, électricité, climatisation et petits dépannages",
    leftImage: "assets/homefix-mission-clim.jpg",
    rightImage: "assets/homefix-mission-peinture.jpg",
  },
  {
    rating: "★★★★★",
    quote:
      "“Voir une équipe organisée et identifiable donne déjà plus confiance avant de confirmer une intervention.”",
    title: "Équipe identifiable",
    meta: "Techniciens HomeFix, tenue claire, outils adaptés",
    leftImage: "assets/homefix-mission-equipe.jpg",
    rightImage: "assets/homefix-mission-clim.jpg",
  },
  {
    rating: "★★★★★",
    quote:
      "“Pour un bureau, il nous faut un contact unique qui comprend vite le besoin et organise la suite.”",
    title: "PME & bureaux",
    meta: "Maintenance, nettoyage, climatisation et suivi régulier",
    leftImage: "assets/homefix-proof-maintenance.jpg",
    rightImage: "assets/homefix-mission-visite.jpg",
  },
  {
    rating: "★★★★★",
    quote:
      "“Une demande bien expliquée, une photo et un suivi sérieux évitent les mauvaises surprises.”",
    title: "Intervention mieux préparée",
    meta: "Demande qualifiée, estimation plus claire, déplacement plus utile",
    leftImage: "assets/homefix-mission-peinture.jpg",
    rightImage: "assets/homefix-mission-client.jpg",
  },
];

let activeProofSlide = 0;
let proofAutoplay;

function encodeWhatsAppMessage(data = baseMessage) {
  const lines = [
    "Bonjour HomeFix 224, j’ai besoin d’un service.",
    "",
    `Service souhaité : ${data.service || ""}`,
    `Quartier : ${data.district || "Kipé"}`,
    `Ville : ${data.city || "Conakry"}`,
    `Urgence : ${data.urgency || "Non"}`,
    `Nom : ${data.name || ""}`,
    `Téléphone : ${data.phone || ""}`,
    `Description : ${data.description || ""}`,
    `Photo disponible : ${data.photo || "Oui / Non"}`,
  ];

  return `https://wa.me/${homefixPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

const assistantSteps = [
  {
    key: "service",
    title: "Quel service vous faut-il ?",
    helper: "Choisissez le besoin principal. Vous pourrez ajouter des détails ensuite.",
    type: "choices",
    options: Object.keys(serviceDetails),
  },
  {
    key: "urgency",
    title: "Est-ce urgent ?",
    helper: "Une urgence peut être une fuite importante, une panne dangereuse ou un problème qui bloque l’usage du lieu.",
    type: "choices",
    options: ["Oui", "Non"],
  },
  {
    key: "district",
    title: "Dans quel quartier ?",
    helper: "Exemple : Kipé, Nongo, Kaloum, Lambanyi, Taouyah...",
    type: "text",
    placeholder: "Kipé",
    required: true,
  },
  {
    key: "description",
    title: "Expliquez le problème.",
    helper: "Décrivez ce qui se passe, depuis quand, et ce que vous avez déjà remarqué.",
    type: "textarea",
    placeholder: "Ex : fuite sous l’évier depuis ce matin, l’eau coule quand on ouvre le robinet...",
    required: true,
  },
  {
    key: "photo",
    title: "Avez-vous une photo ou vidéo ?",
    helper: "Une photo aide HomeFix 224 à comprendre plus vite la situation.",
    type: "choices",
    options: ["Oui", "Non"],
  },
  {
    key: "name",
    title: "Votre nom complet ?",
    helper: "Cela permet de retrouver facilement votre demande.",
    type: "text",
    placeholder: "Votre nom",
    required: true,
  },
  {
    key: "phone",
    title: "Votre numéro WhatsApp ?",
    helper: "HomeFix 224 pourra vous rappeler ou confirmer les détails.",
    type: "tel",
    placeholder: "+224 ...",
    required: true,
  },
];

const assistantData = {
  service: baseMessage.service,
  urgency: baseMessage.urgency,
  district: baseMessage.district,
  city: "Conakry",
  description: "",
  photo: "Non",
  name: "",
  phone: "",
};

let assistantStepIndex = 0;

function buildAssistantSummary(data = assistantData) {
  return [
    ["Service", data.service],
    ["Quartier", data.district || "Kipé"],
    ["Ville", "Conakry"],
    ["Urgence", data.urgency || "Non"],
    ["Nom", data.name],
    ["Téléphone", data.phone],
    ["Photo disponible", data.photo || "Non"],
    ["Description", data.description],
  ];
}

function submitAssistantRequest(data) {
  const payload = new URLSearchParams();
  payload.set("form-name", "demande-service-homefix");
  payload.set("subject", "Nouvelle demande HomeFix 224 via assistant");
  payload.set("Ville", "Conakry");
  payload.set("Email destination", "homefix224@gmail.com");
  payload.set("Nom", data.name || "");
  payload.set("Téléphone WhatsApp", data.phone || "");
  payload.set("Quartier", data.district || "Kipé");
  payload.set("Service", data.service || "Plomberie");
  payload.set("Urgence", data.urgency || "Non");
  payload.set(
    "Description",
    `${data.description || ""}\n\nPhoto disponible : ${data.photo || "Non"}\nSource : Assistant HomeFix 224`
  );

  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: payload.toString(),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Assistant request failed with status ${response.status}`);
    }
    return response;
  });
}

function createAssistantWidget() {
  if (document.querySelector(".assistant-widget")) {
    return;
  }

  const widget = document.createElement("aside");
  widget.className = "assistant-widget";
  widget.innerHTML = `
    <button class="assistant-toggle" type="button" aria-expanded="false" aria-controls="assistant-panel">
      <span class="assistant-toggle-icon" aria-hidden="true">?</span>
      <span><strong>Assistant HomeFix</strong><small>Décrire mon problème</small></span>
    </button>
    <section class="assistant-panel" id="assistant-panel" aria-hidden="true" aria-label="Assistant de demande HomeFix 224">
      <div class="assistant-head">
        <div>
          <span>Assistant HomeFix 224</span>
          <strong>Réponse guidée en moins d’une minute.</strong>
        </div>
        <button class="assistant-close" type="button" aria-label="Fermer l’assistant">×</button>
      </div>
      <div class="assistant-progress" aria-hidden="true"><span></span></div>
      <div class="assistant-body" data-assistant-body></div>
      <p class="assistant-status" data-assistant-status role="status" aria-live="polite"></p>
    </section>
  `;
  document.body.append(widget);

  const toggle = widget.querySelector(".assistant-toggle");
  const panel = widget.querySelector(".assistant-panel");
  const close = widget.querySelector(".assistant-close");

  function setOpen(isOpen) {
    widget.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    panel.setAttribute("aria-hidden", isOpen ? "false" : "true");
    if (isOpen) {
      renderAssistantStep();
    }
  }

  toggle.addEventListener("click", () => setOpen(!widget.classList.contains("is-open")));
  close.addEventListener("click", () => setOpen(false));
}

function setAssistantStatus(message, tone = "") {
  const status = document.querySelector("[data-assistant-status]");
  if (!status) {
    return;
  }

  status.textContent = message;
  status.dataset.tone = tone;
}

function renderAssistantStep() {
  const body = document.querySelector("[data-assistant-body]");
  const progress = document.querySelector(".assistant-progress span");
  if (!body || !progress) {
    return;
  }

  setAssistantStatus("");
  const isSummary = assistantStepIndex >= assistantSteps.length;
  progress.style.width = `${Math.round(((assistantStepIndex + 1) / (assistantSteps.length + 1)) * 100)}%`;

  if (isSummary) {
    const rows = buildAssistantSummary()
      .map(([label, value]) => `<li><span>${label}</span><strong>${value || "Non renseigné"}</strong></li>`)
      .join("");

    body.innerHTML = `
      <p class="assistant-kicker">Résumé de la demande</p>
      <h2>Tout est prêt pour HomeFix 224.</h2>
      <ul class="assistant-summary">${rows}</ul>
      <div class="assistant-actions">
        <button class="assistant-secondary" type="button" data-assistant-back>Modifier</button>
        <button class="assistant-primary" type="button" data-assistant-submit>Envoyer à HomeFix</button>
      </div>
      <p class="assistant-note">La demande sera enregistrée, puis WhatsApp s’ouvrira avec le message prérempli.</p>
    `;

    body.querySelector("[data-assistant-back]").addEventListener("click", () => {
      assistantStepIndex = assistantSteps.length - 1;
      renderAssistantStep();
    });

    body.querySelector("[data-assistant-submit]").addEventListener("click", async (event) => {
      const button = event.currentTarget;
      button.disabled = true;
      button.textContent = "Envoi en cours...";
      const whatsappWindow = window.open(encodeWhatsAppMessage(assistantData), "_blank", "noopener");

      try {
        await submitAssistantRequest(assistantData);
        setAssistantStatus(
          whatsappWindow
            ? "Demande enregistrée. Envoyez aussi le message WhatsApp ouvert pour accélérer la réponse."
            : "Demande enregistrée. Si WhatsApp ne s’est pas ouvert, utilisez le bouton WhatsApp du site.",
          "success"
        );
        button.textContent = "Demande envoyée";
      } catch (error) {
        setAssistantStatus(
          "WhatsApp est ouvert avec votre message. L’enregistrement automatique sera retenté si besoin.",
          "warning"
        );
        button.disabled = false;
        button.textContent = "Réessayer l’envoi";
      }
    });
    return;
  }

  const step = assistantSteps[assistantStepIndex];
  const currentValue = assistantData[step.key] || "";
  const inputMarkup =
    step.type === "choices"
      ? `<div class="assistant-choice-grid">${step.options
          .map(
            (option) =>
              `<button class="${currentValue === option ? "is-selected" : ""}" type="button" data-assistant-choice="${option}">${option}</button>`
          )
          .join("")}</div>`
      : step.type === "textarea"
        ? `<textarea data-assistant-input rows="4" placeholder="${step.placeholder || ""}">${currentValue}</textarea>`
        : `<input data-assistant-input type="${step.type}" value="${currentValue}" placeholder="${step.placeholder || ""}" />`;

  body.innerHTML = `
    <p class="assistant-kicker">Question ${assistantStepIndex + 1} sur ${assistantSteps.length}</p>
    <h2>${step.title}</h2>
    <p class="assistant-helper">${step.helper}</p>
    ${inputMarkup}
    <div class="assistant-actions">
      <button class="assistant-secondary" type="button" data-assistant-back ${assistantStepIndex === 0 ? "disabled" : ""}>Retour</button>
      <button class="assistant-primary" type="button" data-assistant-next>${assistantStepIndex === assistantSteps.length - 1 ? "Voir le résumé" : "Continuer"}</button>
    </div>
  `;

  const input = body.querySelector("[data-assistant-input]");
  const next = body.querySelector("[data-assistant-next]");

  function saveAndContinue() {
    if (input) {
      const value = input.value.trim();
      if (step.required && !value) {
        setAssistantStatus("Ce champ est nécessaire pour bien qualifier la demande.", "warning");
        input.focus();
        return;
      }
      assistantData[step.key] = value;
    }
    assistantStepIndex += 1;
    renderAssistantStep();
  }

  body.querySelectorAll("[data-assistant-choice]").forEach((choice) => {
    choice.addEventListener("click", () => {
      assistantData[step.key] = choice.dataset.assistantChoice;
      assistantStepIndex += 1;
      renderAssistantStep();
    });
  });

  body.querySelector("[data-assistant-back]").addEventListener("click", () => {
    assistantStepIndex = Math.max(assistantStepIndex - 1, 0);
    renderAssistantStep();
  });

  next.addEventListener("click", saveAndContinue);
  input?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && step.type !== "textarea") {
      event.preventDefault();
      saveAndContinue();
    }
  });
}

function getFormData() {
  const formData = new FormData(form);

  return {
    name: formData.get("Nom")?.toString().trim(),
    phone: formData.get("Téléphone WhatsApp")?.toString().trim(),
    district: formData.get("Quartier")?.toString().trim() || "Kipé",
    city: "Conakry",
    service: formData.get("Service")?.toString().trim() || "Plomberie",
    urgency: formData.get("Urgence")?.toString().trim() || "Non",
    description: formData.get("Description")?.toString().trim(),
  };
}

function updateDefaultLinks() {
  whatsappLinks.forEach((link) => {
    const service = link.dataset.service || baseMessage.service;
    link.href = encodeWhatsAppMessage({
      ...baseMessage,
      service,
      description: link.dataset.message || baseMessage.description,
    });
  });

  if (urgentLink) {
    urgentLink.href = encodeWhatsAppMessage({
    ...baseMessage,
    urgency: "Oui",
    description: "J’ai une urgence et je souhaite être contacté rapidement.",
    });
  }

  if (planLink) {
    planLink.href = encodeWhatsAppMessage({
    ...baseMessage,
    service: "Forfait maintenance",
    description: "Je souhaite recevoir des informations sur un forfait maintenance.",
    });
  }
}

function updateServicePanel(serviceName, shouldScroll = false) {
  if (!servicePanel || !serviceTitle || !serviceSummary || !servicePoints || !serviceWhatsapp) {
    return;
  }

  const detail = serviceDetails[serviceName] || serviceDetails.Plomberie;
  serviceTitle.textContent = serviceName;
  serviceSummary.textContent = detail.summary;
  servicePoints.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");
  serviceWhatsapp.href = encodeWhatsAppMessage({
    ...baseMessage,
    service: serviceName,
    description: `Je souhaite demander le service ${serviceName}.`,
  });

  if (serviceSelect) {
    serviceSelect.value = serviceName;
  }

  servicePanel.classList.remove("is-updating");
  window.requestAnimationFrame(() => {
    servicePanel.classList.add("is-updating");
  });

  if (shouldScroll && window.matchMedia("(max-width: 759px)").matches) {
    servicePanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function getProcessStep(index) {
  return processSteps[(index + processSteps.length) % processSteps.length];
}

function animateSection(element) {
  if (!element || prefersReducedMotion) {
    return;
  }

  element.classList.remove("is-animating");
  void element.offsetWidth;
  element.classList.add("is-animating");
  window.setTimeout(() => element.classList.remove("is-animating"), 620);
}

function updateProcessSlider(index = 0, shouldAnimate = false) {
  if (!processSlider) {
    return;
  }

  activeProcessStep = (index + processSteps.length) % processSteps.length;
  const step = getProcessStep(activeProcessStep);
  const prevStep = getProcessStep(activeProcessStep - 1);
  const nextStep = getProcessStep(activeProcessStep + 1);
  const processImage = processSlider.querySelector("[data-process-image]");
  const processNumber = processSlider.querySelector("[data-process-number]");
  const processLabel = processSlider.querySelector("[data-process-label]");
  const processTitle = processSlider.querySelector("[data-process-title]");
  const processText = processSlider.querySelector("[data-process-text]");
  const prevImage = processSlider.querySelector("[data-process-prev-image]");
  const nextImage = processSlider.querySelector("[data-process-next-image]");
  const prevNumber = processSlider.querySelector("[data-process-prev-number]");
  const nextNumber = processSlider.querySelector("[data-process-next-number]");

  processImage.src = step.image;
  processImage.alt = step.alt;
  processNumber.textContent = step.number;
  processLabel.textContent = step.label;
  processTitle.textContent = step.title;
  processText.textContent = step.text;
  prevImage.src = prevStep.image;
  nextImage.src = nextStep.image;
  prevNumber.textContent = prevStep.number;
  nextNumber.textContent = nextStep.number;

  processSlider.querySelectorAll(".process-progress span").forEach((item, itemIndex) => {
    item.classList.toggle("is-active", itemIndex <= activeProcessStep);
  });

  processTabs.forEach((tab, tabIndex) => {
    tab.classList.toggle("is-active", tabIndex === activeProcessStep);
  });

  if (shouldAnimate) {
    animateSection(processSlider);
  }
}

function stopProcessAutoplay() {
  window.clearInterval(processAutoplay);
}

function startProcessAutoplay() {
  if (!processSlider || prefersReducedMotion) {
    return;
  }

  stopProcessAutoplay();
  processAutoplay = window.setInterval(() => {
    updateProcessSlider(activeProcessStep + 1, true);
  }, 2800);
}

function restartProcessAutoplay() {
  stopProcessAutoplay();
  startProcessAutoplay();
}

function getProofSlide(index) {
  return proofSlides[(index + proofSlides.length) % proofSlides.length];
}

function updateProofSlider(index = 0, shouldAnimate = false) {
  if (!proofSection) {
    return;
  }

  activeProofSlide = (index + proofSlides.length) % proofSlides.length;
  const slide = getProofSlide(activeProofSlide);
  const rating = proofSection.querySelector("[data-proof-rating]");
  const quote = proofSection.querySelector("[data-proof-quote]");
  const title = proofSection.querySelector("[data-proof-title]");
  const meta = proofSection.querySelector("[data-proof-meta]");
  const leftImage = proofSection.querySelector("[data-proof-left-image]");
  const rightImage = proofSection.querySelector("[data-proof-right-image]");

  rating.textContent = slide.rating;
  quote.textContent = slide.quote;
  title.textContent = slide.title;
  meta.textContent = slide.meta;
  leftImage.src = slide.leftImage;
  rightImage.src = slide.rightImage;

  proofControls.forEach((control, controlIndex) => {
    control.classList.toggle("is-active", controlIndex === activeProofSlide);
  });

  if (shouldAnimate) {
    animateSection(proofSection);
  }
}

function stopProofAutoplay() {
  window.clearInterval(proofAutoplay);
}

function startProofAutoplay() {
  if (!proofSection || prefersReducedMotion) {
    return;
  }

  stopProofAutoplay();
  proofAutoplay = window.setInterval(() => {
    updateProofSlider(activeProofSlide + 1, true);
  }, 2800);
}

function restartProofAutoplay() {
  stopProofAutoplay();
  startProofAutoplay();
}

function setMobileMenu(isOpen) {
  if (!mobileMenu || !mobileMenuToggle) {
    return;
  }

  mobileMenu.classList.toggle("is-open", isOpen);
  mobileMenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
  mobileMenu.inert = !isOpen;
  mobileMenuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  mobileMenuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
}

mobileMenuToggle?.addEventListener("click", () => {
  const isOpen = mobileMenuToggle.getAttribute("aria-expanded") === "true";
  setMobileMenu(!isOpen);
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMobileMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMobileMenu(false);
    document.querySelector(".assistant-widget")?.classList.remove("is-open");
    document.querySelector(".assistant-toggle")?.setAttribute("aria-expanded", "false");
    document.querySelector(".assistant-panel")?.setAttribute("aria-hidden", "true");
  }
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 940px)").matches) {
    setMobileMenu(false);
  }
});

document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", () => {
    const serviceName = card.dataset.service;
    document.querySelectorAll(".service-card").forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
    updateServicePanel(serviceName, true);
  });
});

processPrevButton?.addEventListener("click", () => {
  updateProcessSlider(activeProcessStep - 1, true);
  restartProcessAutoplay();
});

processNextButton?.addEventListener("click", () => {
  updateProcessSlider(activeProcessStep + 1, true);
  restartProcessAutoplay();
});

processTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    updateProcessSlider(Number(tab.dataset.processStep || 0), true);
    restartProcessAutoplay();
  });
});

processSlider?.addEventListener("mouseenter", stopProcessAutoplay);
processSlider?.addEventListener("mouseleave", startProcessAutoplay);
processSlider?.addEventListener("focusin", stopProcessAutoplay);
processSlider?.addEventListener("focusout", startProcessAutoplay);

proofControls.forEach((control) => {
  control.addEventListener("click", () => {
    updateProofSlider(Number(control.dataset.proofStep || 0), true);
    restartProofAutoplay();
  });
});

proofSection?.addEventListener("mouseenter", stopProofAutoplay);
proofSection?.addEventListener("mouseleave", startProofAutoplay);
proofSection?.addEventListener("focusin", stopProofAutoplay);
proofSection?.addEventListener("focusout", startProofAutoplay);

serviceSelect?.addEventListener("change", () => {
  updateServicePanel(serviceSelect.value || "Plomberie");
  const matchingCard = [...document.querySelectorAll(".service-card")].find(
    (card) => card.dataset.service === serviceSelect.value
  );
  if (matchingCard) {
    document.querySelectorAll(".service-card").forEach((item) => item.classList.remove("is-selected"));
    matchingCard.classList.add("is-selected");
  }
});

form?.addEventListener("submit", () => {
  const data = getFormData();
  formStatus.textContent =
    "Demande envoyée vers HomeFix 224. WhatsApp s’ouvre avec les mêmes informations pour accélérer la réponse.";
  window.open(encodeWhatsAppMessage(data), "_blank", "noopener");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

createAssistantWidget();
updateDefaultLinks();
updateServicePanel("Plomberie");
updateProcessSlider(0);
updateProofSlider(0);
startProcessAutoplay();
startProofAutoplay();
