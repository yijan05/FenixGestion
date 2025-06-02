document.addEventListener("DOMContentLoaded", function () {
  const botonesMenu = document.querySelectorAll(".menu-button");

  botonesMenu.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(`Navegando a: ${btn.getAttribute("href")}`);
    });
  });

  console.log("Menú principal cargado correctamente.");
});
