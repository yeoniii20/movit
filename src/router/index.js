import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import DetailView from "@/views/DetailView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/detail",
    name: "detail",
    component: DetailView,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
