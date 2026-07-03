const emails = [
  "kimwilliamson56@hotmail.com","wjstelzer@gmail.com","carolrouse46@aol.com","maureene@hotmail.com","carterhazel72@gmail.com","lauriebushnell@gmail.com","mstylistabq@gmail.com","jglass727@gmail.com","sandi_jefrey@yahoo.com","suekay47@gmail.com","christalwilliams53@yahoo.com","a.lambeek@gmail.com","kellycurry722@yahoo.com","saabdirahman94@gmail.com","nkechi.osuagwu@gmail.com","lkivimae@gmail.com","m_shoemaker@sbcglobal.net","travelingterry62@gmail.com","rosalba.2001@libero.it","wendyhendrick52@gmail.com","sgolds2049@gmail.com","anamariasic@yahoo.com","bhashini.suresh@gmail.com","carolflanigan1@gmail.com","nancymvdz@hotmail.com","jillianmcdougall78@gmail.com","wendy@keithblanchard.ca","mjohnsonmkj@gmail.com","tracyajones59@gmail.com","marcusphilip65@yahoo.com","kfogel27@gmail.com","walterjknutsen@gmail.com","jennifermoore.travel@gmail.com","miriamreiss@gmx.de","dpalmer4568@aol.com","reneerohr@gmail.com","cheryl.kasprzak@gmail.com","beblachman@gmail.com","raquelpm7@hotmail.com","sherylcurtis2@gmail.com"
  ];
  
  const WORKER_URL = "https://fcs-archetype-worker.charles-heflin.workers.dev";
  const TAG = "techissue_07032026";
  const DELAY_MS = 2000;
  
  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function run() {
    console.log(`Tagging ${emails.length} emails with '${TAG}'...`);
    let success = 0;
    let failed = 0;
  
    for (let i = 0; i < emails.length; i++) {
      const email = emails[i];
      try {
        const res = await fetch(WORKER_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, checkout_tag: TAG }),
        });
        const data = await res.json();
        if (res.ok) {
          console.log(`[${i + 1}/${emails.length}] ✅ ${email}`);
          success++;
        } else {
          console.log(`[${i + 1}/${emails.length}] ❌ ${email} — ${JSON.stringify(data)}`);
          failed++;
        }
      } catch (err) {
        console.log(`[${i + 1}/${emails.length}] ❌ ${email} — ${err.message}`);
        failed++;
      }
      await sleep(DELAY_MS);
    }
  
    console.log(`\nDone. ${success} succeeded, ${failed} failed.`);
  }
  
  run();