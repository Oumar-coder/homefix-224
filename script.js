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
    "Photo disponible : Oui / Non",
  ];

  return `https://wa.me/${homefixPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
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
    link.href = encodeWhatsAppMessage();
  });

  urgentLink.href = encodeWhatsAppMessage({
    ...baseMessage,
    urgency: "Oui",
    description: "J’ai une urgence et je souhaite être contacté rapidement.",
  });

  planLink.href = encodeWhatsAppMessage({
    ...baseMessage,
    service: "Forfait maintenance",
    description: "Je souhaite recevoir des informations sur un forfait maintenance.",
  });
}

function updateServicePanel(serviceName, shouldScroll = false) {
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

serviceSelect.addEventListener("change", () => {
  updateServicePanel(serviceSelect.value || "Plomberie");
  const matchingCard = [...document.querySelectorAll(".service-card")].find(
    (card) => card.dataset.service === serviceSelect.value
  );
  if (matchingCard) {
    document.querySelectorAll(".service-card").forEach((item) => item.classList.remove("is-selected"));
    matchingCard.classList.add("is-selected");
  }
});

form.addEventListener("submit", () => {
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

updateDefaultLinks();
updateServicePanel("Plomberie");
updateProcessSlider(0);
updateProofSlider(0);
startProcessAutoplay();
startProofAutoplay();
