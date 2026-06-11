window.generate = async function () {
  const name = document.getElementById("name").value;
  const job = document.getElementById("job").value;

  const resultBox = document.getElementById("result");
  resultBox.innerHTML = "Generating... 🔥";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        job
      })
    });

    const data = await res.json();

    if (!res.ok) {
      resultBox.innerHTML = "Error: " + (data.error || "Request failed");
      return;
    }

    resultBox.innerHTML = data.result;

  } catch (error) {
    resultBox.innerHTML = "Network Error: " + error.message;
  }
};
