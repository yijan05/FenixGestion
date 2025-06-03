document.addEventListener("DOMContentLoaded", function () {
  const botonesMenu = document.querySelectorAll(".menu-button");
  const meowSound = new Audio("miau.mpeg");

  botonesMenu.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Reproduce el sonido
      meowSound.currentTime = 0;
      meowSound.play();

      // Log de navegación
      console.log(`Navegando a: ${btn.getAttribute("href")}`);
    });
  });

  console.log("Menú principal cargado correctamente.");
});
