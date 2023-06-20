export default async function handler(req, res) {
  const response = await fetch("https://zwhuiiextumxbglllmlk.supabase.co/rest/v1/jonas_foofest", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: process.env.SUPABASE_KEY,
      Prefer: "return=representation",
    },
    body: JSON.stringify(req.body),
  }).then((res) => res.json());
  // console.log(response);
  // res.redirect(307, "/");
  return res.status(200).json({ response });
}
