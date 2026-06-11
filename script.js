window.generate = async function () {
  document.getElementById("result").innerHTML = "Loading... 🔥";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: document.getElementById("name").value,
        job: document.getElementById("job").value
      })
    });

    const text = await res.text(); // IMPORTANT FIX

    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new Error("Server returned invalid response: " + text);
    }

    document.getElementById("result").innerHTML =
      data.result || data.error;

  } catch (error) {
    document.getElementById("result").innerHTML =
      "Error: " + error.message;
  }
};
