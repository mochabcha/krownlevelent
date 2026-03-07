export function downloadVCF() {
  const vcfContent = `BEGIN:VCARD
VERSION:3.0
FN:Charli Smith
N:Smith;Charli;;;
ORG:Krown Level Enterprises
TITLE:Founder & Instructor
TEL;TYPE=CELL:+19044423737
EMAIL;TYPE=INTERNET:krownlevelent31@gmail.com
URL:https://krownlevelenterprises.com
ADR;TYPE=WORK:;;;;;;Jacksonville, FL
NOTE:Holistic Wellness Consulting | Community Agriculture | Self-Defense Training
END:VCARD`;

  const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Charli_Smith_KLE.vcf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
