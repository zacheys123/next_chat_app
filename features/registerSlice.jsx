export async function registerSlice(
  form,
  setError,
  setLoading,
  router,
  setSuccess,
  setAuthState
) {
  console.log(form);
  try {
    setError("");
    setLoading(true);
    const res = await fetch(`api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setLoading(false);

      setAuthState({ type: global.CLEAR_ERROR });

      setAuthState({ type: global.SUCCESS, payload: data?.message });

      setTimeout(() => {
        router.push("/");
        localStorage.setItem("token", JSON.stringify(data?.token));
        localStorage.setItem("profile", JSON.stringify(data?.result));
      }, 3000);
    } else {
      setLoading(false);

      setLoading(false);
      setAuthState({ type: global.CLEAR_SUCCESS });
      setTimeout(() => {
        setAuthState({ type: global.CLEAR_ERROR });
      }, 4000);
      setAuthState({ type: global.ERROR, payload: data?.message });
    }
  } catch (error) {
    setLoading(false);
    if (error.message === "Network Error") {
      setAuthState({
        type: global.CLEAR_SUCESS,
      });
      setAuthState({
        type: global.ERROR,
        payload: error.message,
      });
      setLoading(false);
      setTimeout(() => {
        router.push("/");
      }, 4000);
    }
  }
}
