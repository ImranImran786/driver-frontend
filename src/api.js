export const apiEndPoint = "https://dd96-2407-aa80-116-6313-50cd-ac3b-36f7-eea5.ngrok-free.app";

export async function recognizeFace(dataURL) {
  try {
    const res = await fetch(`${apiEndPoint}/recognize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: dataURL }),
    });


    if (!res.ok) {
      throw new Error("Failed to recognize face.");
    }

    return await res.json();
  } catch (err) {
    console.error("Error in recognizeFace:", err);
    return { name: "Error" };
  }
}
