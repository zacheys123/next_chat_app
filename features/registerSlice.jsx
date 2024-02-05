const api = "http://localhost:5000";
export async function registerSlice(form, setError, setLoading) {
  if (
    !form?.fullname ||
    !form?.email ||
    !form?.address ||
    !form?.city ||
    !form?.password ||
    !form?.cpassword
  ) {
    setError("Please fill all the fields");
    return;
  }
  console.log(form);
  try {
    setError("");
    setLoading(true);
    const res = await fetch(`api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data.status === true) {
      setLoading(false);
      setError(data?.message);
    } else {
      setLoading(false);
      console.log("user registration failed");
    }
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
}
