// functions/_data/dr-schutza.js
// Single source of truth for the Dr. Jonathan Schutza identity page head.
// Imported by functions/dr-jonathan-schutza.js (the edge head rewriter).
// NOTE: the blog's article schema must reference PERSON_SCHEMA "@id" verbatim.
export const HEAD = {
  title: "Dr. Jonathan Schutza, PT, DPT | Foot & Ankle Physical Therapist",
  description:
    "Dr. Jonathan Schutza, PT, DPT — Doctor of Physical Therapy in Shreveport, Louisiana, specializing in foot and ankle rehabilitation and creator of the Foot Capacity System.",
  canonical: "https://fixyourmovement.com/dr-jonathan-schutza",
};

export const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://fixyourmovement.com/dr-jonathan-schutza#person",
  "url": "https://fixyourmovement.com/dr-jonathan-schutza",
  "name": "Dr. Jonathan Schutza, PT, DPT",
  "honorificPrefix": "Dr.",
  "honorificSuffix": "PT, DPT",
  "jobTitle": "Doctor of Physical Therapy",
  "image": "https://fixyourmovement.com/dr-jonathan-schutza.jpg",
  "description":
    "Doctor of Physical Therapy and licensed physical therapist in Shreveport, Louisiana, focused on foot and ankle rehabilitation and creator of the Foot Capacity System.",
  "knowsAbout": [
    "plantar fasciitis", "plantar fasciopathy", "heel pain",
    "foot and ankle rehabilitation", "foot and ankle mechanics",
    "movement rehabilitation", "therapeutic exercise progression",
    "injury recovery", "progressive loading and capacity development",
    "flare-up management",
  ],
  "sameAs": [
    "https://www.linkedin.com/in/jonathan-schutza-b05838a1/",
    "https://www.instagram.com/dr.schutza.pt/",
    "https://www.facebook.com/profile.php?id=61551075877536",
  ],
  "hasCredential": [
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "degree", "name": "Doctor of Physical Therapy (DPT)" },
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "license", "name": "Louisiana Physical Therapy License #10272", "recognizedBy": { "@type": "Organization", "name": "Louisiana Physical Therapy Board", "url": "https://www.laptboard.org/" } },
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "certificate", "name": "Dry Needling Certification" },
  ],
  "identifier": { "@type": "PropertyValue", "propertyID": "NPI", "value": "1487332854" },
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "LSU Health Sciences Center Shreveport" },
  "worksFor": { "@type": "Organization", "name": "Back At It Physical Therapy, LLC", "url": "https://backatitpt.com/" },
  "memberOf": [
    { "@type": "Organization", "name": "American Physical Therapy Association", "url": "https://www.apta.org/" },
    { "@type": "Organization", "name": "Louisiana Physical Therapy Association", "url": "https://aptala.org/" },
  ],
};
