export default async function handler(req, res) {
  const response = await fetch("https://zwhuiiextumxbglllmlk.supabase.co/rest/v1/jonas_foofest", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3aHVpaWV4dHVteGJnbGxsbWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NDQzMjEsImV4cCI6MjAwMjMyMDMyMX0.6bVHqcHAjW1yayID2eKPB5jiFxbx4Pk5bQ2Dvb-PXLo",
      Prefer: "return=representation",
    },
    body: JSON.stringify(req.body),
  }).then((res) => res.json());
  // console.log(response);
  // res.redirect(307, "/");
  return res.status(200).json({ response });
}
