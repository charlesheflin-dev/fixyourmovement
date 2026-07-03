const emails = [
"nhonlineservices@gmail.com","iuliamcosma@gmail.com","carol1960mcinnes@gmail.com","danijelaplanincic05@gmail.com","i.arxodakis@gmail.com","jamietommo70@gmail.com","smithudi@gmail.com","fishiviews@gmail.com","jamie.wolfe082@gmail.com","omnia.elkhoully@yahoo.com","isabelle_martineau@yahoo.com","alicechow2612@gmail.com","priyjoshi@gmail.com","shawn.balow@gmail.com","jbutcher28@gmail.com","holliallen70@gmail.com","nt813130@gmail.com","plumtree@telkomsa.net","rcdazzles@aol.com","nirshahar1@yahoo.com","elizabethzauhar@gmail.com","ajz.career@gmail.com","donatella.lazzari75@gmail.com","mcgee.gillian@gmail.com","danielabraga.br@hotmail.com","hannahbutterfield22@gmail.com","jess_v123@yahoo.com","mlvp14@gmail.com","ruthiemcbroom@gmail.com","lynncooke222@gmail.com","cbprpauline@yahoo.ca","susanne.beyer@gmx.at","janetcleare@icloud.com","nicholasnoa2007@gmail.com","kristin.roufs@gmail.com","carlosrivero@hotmail.it","lorrainesykes@live.co.uk","juliemcevoy25@gmail.com","helenlucas24@gmail.com","robynbuchanan54@gmail.com","kimwilliamson56@hotmail.com","wjstelzer@gmail.com","carolrouse46@aol.com","maureene@hotmail.com","carterhazel72@gmail.com","lauriebushnell@gmail.com","mstylistabq@gmail.com","jglass727@gmail.com","sandi_jefrey@yahoo.com","suekay47@gmail.com","christalwilliams53@yahoo.com","a.lambeek@gmail.com","kellycurry722@yahoo.com","saabdirahman94@gmail.com","nkechi.osuagwu@gmail.com","lkivimae@gmail.com","m_shoemaker@sbcglobal.net","travelingterry62@gmail.com","rosalba.2001@libero.it","wendyhendrick52@gmail.com","sgolds2049@gmail.com","anamariasic@yahoo.com","bhashini.suresh@gmail.com","carolflanigan1@gmail.com","nancymvdz@hotmail.com","jillianmcdougall78@gmail.com","wendy@keithblanchard.ca","mjohnsonmkj@gmail.com","tracyajones59@gmail.com","marcusphilip65@yahoo.com","kfogel27@gmail.com","walterjknutsen@gmail.com","jennifermoore.travel@gmail.com","miriamreiss@gmx.de","dpalmer4568@aol.com","reneerohr@gmail.com","cheryl.kasprzak@gmail.com","beblachman@gmail.com","raquelpm7@hotmail.com","sherylcurtis2@gmail.com","chrisw.mail@gmail.com","deirdre.coll@yahoo.ie","suz@compu-nics.com","leslieisaacson@gmail.com","sondrak22@gmail.com","jlhayes2610@gmail.com","kbkinnear@gmail.com","pamelagibbs65@hotmail.com","jill_rago@yahoo.com","lorrainehamill@yahoo.co.uk","bjd6169@gmail.com","corinne.legras@orange.fr","karenvivien@gmail.com","kneelandconstruction@gmail.com","dorispolsen@gmail.com","luzrodriguez@yahoo.com","brendaomalley0611@gmail.com","lisa.mclaughlin@o365.saultcollege.ca","christoph.m.klein@icloud.com","aleciamoody@icloud.com"
];

const URL = "https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/create-trial-profile";
const DELAY_MS = 500;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log(`Processing ${emails.length} emails...`);
  let success = 0;
  let failed = 0;

  for (let i = 0; i < emails.length; i++) {
    const email = emails[i];
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`[${i + 1}/${emails.length}] ✅ ${email} — ${data.action}`);
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