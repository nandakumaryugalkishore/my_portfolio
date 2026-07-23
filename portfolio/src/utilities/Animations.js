export default class Animations {
  static animations = new Animations();

  fadeInScreen = (screen_name) => {
    const screen = document.getElementById(screen_name);
    if (!screen) return;

    screen.classList.add("fade-in-visible");
  };
}