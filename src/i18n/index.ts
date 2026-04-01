import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      search: "Search",
      notFound: "No user found",
      followers: "Followers",
      following: "Following",
      contact: "Contact",
      sortUpdated: "Recently updated",
      sortCreated: "Recently created",
      sortPushed: "Recently pushed",
      sortName: "Name",
      loadingRepos: "Loading more repos...",
      updated_now: "Updated just now",
      updated_minutes: "Updated {{count}} minute ago",
      updated_minutes_plural: "Updated {{count}} minutes ago",
      updated_hours: "Updated {{count}} hour ago",
      updated_hours_plural: "Updated {{count}} hours ago",
      updated_days: "Updated {{count}} day ago",
      updated_days_plural: "Updated {{count}} days ago",
      updated_weeks: "Updated {{count}} week ago",
      updated_weeks_plural: "Updated {{count}} weeks ago",
    },
  },
  pt: {
    translation: {
      search: "Buscar",
      notFound: "Nenhum usuário encontrado",
      followers: "Seguidores",
      following: "Seguindo",
      contact: "Contato",
      sortUpdated: "Atualizado recentemente",
      sortCreated: "Criado recentemente",
      sortPushed: "Enviado recentemente",
      sortName: "Nome",
      loadingRepos: "Carregando mais repositórios...",
      updated_now: "Atualizado agora",
      updated_minutes: "Atualizado há {{count}} minuto",
      updated_minutes_plural: "Atualizado há {{count}} minutos",
      updated_hours: "Atualizado há {{count}} hora",
      updated_hours_plural: "Atualizado há {{count}} horas",
      updated_days: "Atualizado há {{count}} dia",
      updated_days_plural: "Atualizado há {{count}} dias",
      updated_weeks: "Atualizado há {{count}} semana",
      updated_weeks_plural: "Atualizado há {{count}} semanas",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
