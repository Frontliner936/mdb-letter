window.generateCV = function () {

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const education = document.getElementById("education").value;
  const experience = document.getElementById("experience").value;
  const skills = document.getElementById("skills").value;

  document.getElementById("cvResult").innerHTML = `
  
  <h2>${name}</h2>

  <p><strong>Phone:</strong> ${phone}</p>

  <p><strong>Email:</strong> ${email}</p>

  <hr>

  <h3>Education</h3>
  <p>${education}</p>

  <h3>Experience</h3>
  <p>${experience}</p>

  <h3>Skills</h3>
  <p>${skills}</p>

  `;
}
