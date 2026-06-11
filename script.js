async function generate() {
  console.log("Button clicked");

  const name = document.getElementById("name").value;
  const job = document.getElementById("job").value;

  document.getElementById("result").innerHTML = "Loading... 🔥";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, job })
    });

    console.log("Response status:", res.status);

    const data = await res.json();

    console.log("DATA:", data);

    document.getElementById("result").innerHTML =
      data.result || data.error || "No response";

  } catch (error) {
    console.log("ERROR:", error);
    document.getElementById("result").innerHTML =
      "Error: " + error.message;
  }
}
