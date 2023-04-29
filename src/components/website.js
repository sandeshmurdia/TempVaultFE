
//   const nav = document.querySelector(".nav");
//   const hamburger = document.querySelector(".hamburger");

//   hamburger.addEventListener("click", () => {
//     nav.classList.toggle("nav--open");
//     hamburger.classList.toggle("hamburger--open");
//   });

//   function handleLinkClick() {

//     nav.classList.toggle("nav--open");
//     hamburger.classList.toggle("hamburger--open");
//   }

//   // get all the links in the nav
//   const links = document.querySelectorAll('nav a');

//   // add a click event listener to each link
//   links.forEach(link => {
//     link.addEventListener('click', (event) => {
//       // prevent the default link behavior
//       event.preventDefault();

//       // remove the active class from all links
//       links.forEach(link => link.classList.remove('active'));

//       // add the active class to the clicked link
//       link.classList.add('active');

//       // get the section ID from the link's href attribute
//       const sectionId = link.getAttribute('href');

//       // scroll to the section
//       document.querySelector(sectionId).scrollIntoView({
//         behavior: 'smooth'
//       });
//     });
//   });
