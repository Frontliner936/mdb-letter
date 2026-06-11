async function generate() {
  const name = document.getElementById("name").value;
  const job = document.getElementById("job").value;

  document.getElementById("result").innerHTML = "Generating... 🔥";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        job: job,
        company: "",
        education: "",
        experience: "",
        skills: ""
      })
    });

    const data = await res.json();

    document.getElementById("result").innerHTML =
      data.result || data.error;

  } catch (error) {
    document.getElementById("result").innerHTML =
      "Error: " + error.message;
  }
}
