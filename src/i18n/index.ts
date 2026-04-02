import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      search: "Search",
      not_found: "No user found",
      followers: "Followers",
      following: "Following",
      contact: "Contact",
      sort_updated: "Recently updated",
      sort_created: "Recently created",
      sort_pushed: "Recently pushed",
      sort_name: "Name",
      direction_asc: "Asc",
      direction_desc: "Desc",
      loading_repos: "Loading more repos...",
      no_description: "No description",
      updated_now: "Just updated",
      updated_minutes: "Updated {{count}} minute ago",
      updated_minutes_plural: "Updated {{count}} minutes ago",
      updated_hours: "Updated {{count}} hour ago",
      updated_hours_plural: "Updated {{count}} hours ago",
      updated_days: "Updated {{count}} day ago",
      updated_days_plural: "Updated {{count}} days ago",
      updated_weeks: "Updated {{count}} week ago",
      updated_weeks_plural: "Updated {{count}} weeks ago",
      usernot_found: "No users found",
      usernot_foundDetail: "We couldn't find any user with this name",
      return_to_home: "Return to home",
       error_fetching_repos: "Error fetching repos",
    },
  },
  pt: {
    translation: {
      search: "Buscar",
      not_found: "Nenhum usuário encontrado",
      followers: "Seguidores",
      following: "Seguindo",
      contact: "Contato",
      sort_updated: "Atualizado recentemente",
      sort_created: "Criado recentemente",
      sort_pushed: "Enviado recentemente",
      sort_name: "Nome",
      direction_asc: "Acresc",
      direction_desc: "Decresc",
      loading_repos: "Carregando mais repositórios...",
      no_description: "Sem descrição",
      updated_now: "Atualizado agora",
      updated_minutes: "Atualizado há {{count}} minuto",
      updated_minutes_plural: "Atualizado há {{count}} minutos",
      updated_hours: "Atualizado há {{count}} hora",
      updated_hours_plural: "Atualizado há {{count}} horas",
      updated_days: "Atualizado há {{count}} dia",
      updated_days_plural: "Atualizado há {{count}} dias",
      updated_weeks: "Atualizado há {{count}} semana",
      updated_weeks_plural: "Atualizado há {{count}} semanas",
      usernot_found: "Nenhum usuário encontrado",
      usernot_foundDetail:
        "Não conseguimos encontrar nenhum usuário com esse nome",
      return_to_home: "Voltar para home",
      error_fetching_repos: "Erro ao carregar repositórios",
    },
  },
};

const savedLang = localStorage.getItem("lang");

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang || "pt",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
