import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage.vue";
import HomePage from "@/views/HomePage.vue";
import MyPage from "@/views/MyPage.vue";
import AboutPage from "@/views/AboutPage.vue";
import CanvasView from "@/views/CanvasView.vue";
import DetailView from "@/views/DetailView.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainPage,
  },
  {
    path: "/home",
    name: "home",
    component: HomePage,
  },
  {
    path: "/myPage",
    name: "myPage",
    component: MyPage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/canvas",
    name: "canvas",
    component: CanvasView,
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: DetailView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;

