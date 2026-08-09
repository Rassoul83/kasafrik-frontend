export const translations = {
  fr: {
    home: "Accueil",
    immobilier: "Immobilier",
    hotels: "Hôtels",
    evenements: "Événements",
    billetterie: "Billetterie",
    connexion: "Connexion",
    publier: "Publier",
    rechercher: "Rechercher",
    ville: "Ville",
    budget: "Budget max",
    annonces_recentes: "Annonces récentes",
    evenements_venir: "Événements à venir",
    voir_tout: "Voir tout",
    reference: "La référence immobilière & événementielle en Afrique",
    explorer: "Explorer les annonces",
    publier_annonce: "Publier une annonce",
  },
  en: {
    home: "Home",
    immobilier: "Real Estate",
    hotels: "Hotels",
    evenements: "Events",
    billetterie: "Tickets",
    connexion: "Login",
    publier: "Post",
    rechercher: "Search",
    ville: "City",
    budget: "Max budget",
    annonces_recentes: "Recent listings",
    evenements_venir: "Upcoming events",
    voir_tout: "See all",
    reference: "The real estate & events reference in Africa",
    explorer: "Explore listings",
    publier_annonce: "Post an ad",
  },
  ar: {
    home: "الرئيسية",
    immobilier: "العقارات",
    hotels: "الفنادق",
    evenements: "الفعاليات",
    billetterie: "التذاكر",
    connexion: "تسجيل الدخول",
    publier: "نشر",
    rechercher: "بحث",
    ville: "المدينة",
    budget: "الميزانية القصوى",
    annonces_recentes: "الإعلانات الأخيرة",
    evenements_venir: "الفعاليات القادمة",
    voir_tout: "عرض الكل",
    reference: "المرجع العقاري والترفيهي في أفريقيا",
    explorer: "استكشف الإعلانات",
    publier_annonce: "نشر إعلان",
  }
};

export type Lang = 'fr' | 'en' | 'ar';

export function t(lang: Lang, key: keyof typeof translations.fr): string {
  return translations[lang]?.[key] ?? translations.fr[key];
}
