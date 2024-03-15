import axios from "axios";

export const LoginSlice = async (form, setLoading, setAuthState, router) => {
  try {
    setLoading(true);
    setAuthState({ type: global.CLEAR_ERROR });
    const res = await fetch(`api/auth/login`, {
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

      router.push(`/gigme/${data?.results?.username}`);
      localStorage.setItem("token", JSON.stringify(data?.token));
      localStorage.setItem("profile", JSON.stringify(data?.results));
    } else {
      setLoading(false);
      setAuthState({ type: global.CLEAR_SUCCESS });
      setTimeout(() => {
        setAuthState({ type: global.CLEAR_ERROR });
      }, 4000);
      setAuthState({ type: global.ERROR, payload: data?.message });
    }
  } catch (error) {
    setLoading(false);
  }
};
