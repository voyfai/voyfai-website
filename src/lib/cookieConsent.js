import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "./cookieConsent.css";

let initialized = false;

export function initCookieConsent() {
  if (initialized) return;
  initialized = true;

  const privacyHref = import.meta.env.BASE_URL + "privacy-policy";

  CookieConsent.run({
    guiOptions: {
      consentModal: {
        layout: "box",
        position: "bottom right",
        equalWeightButtons: false,
        flipButtons: false,
      },
      preferencesModal: {
        layout: "box",
        position: "right",
        equalWeightButtons: false,
        flipButtons: false,
      },
    },
    categories: {
      necessary: {
        readOnly: true,
        enabled: true,
      },
      analytics: {
        enabled: false,
      },
      marketing: {
        enabled: false,
      },
    },
    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            title: "Cookies on voyfai.com",
            description:
              "We use only what's needed to make this site work. Analytics and marketing tools stay off until you accept. You can change this any time from the footer.",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            showPreferencesBtn: "Manage preferences",
          },
          preferencesModal: {
            title: "Cookie preferences",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            savePreferencesBtn: "Save preferences",
            closeIconLabel: "Close",
            sections: [
              {
                title: "Why we ask",
                description:
                  "Voyfai is a marketing site for a freight-forwarding group. We don't run analytics or advertising tools today, but this consent layer is in place so any future addition follows the same opt-in rules.",
              },
              {
                title: "Strictly necessary",
                description:
                  "Required for the site to function. Stores your cookie-category choice and standard React Router state. Cannot be turned off.",
                linkedCategory: "necessary",
                cookieTable: {
                  headers: {
                    name: "Name",
                    description: "Purpose",
                    duration: "Validity",
                  },
                  body: [
                    {
                      name: "cc_cookie",
                      description: "Stores your cookie-category preferences.",
                      duration: "6 months",
                    },
                  ],
                },
              },
              {
                title: "Analytics",
                description:
                  "No analytics tools are currently active. If we add one (for example, privacy-respecting page-view metrics), it will only run after you accept this category.",
                linkedCategory: "analytics",
              },
              {
                title: "Marketing",
                description:
                  "No marketing or advertising pixels are currently active. If we add any (for example, LinkedIn Insight Tag), they will only run after you accept this category.",
                linkedCategory: "marketing",
              },
              {
                title: "More information",
                description: `For details about how we process personal data, see our <a href="${privacyHref}">Privacy Policy</a>.`,
              },
            ],
          },
        },
      },
    },
  });
}

export function showCookiePreferences() {
  CookieConsent.showPreferences();
}
