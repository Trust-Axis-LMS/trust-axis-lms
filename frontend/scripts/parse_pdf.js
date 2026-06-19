const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const PDF_PATH = path.resolve(__dirname, '../../Course Content.pdf');
const OUTPUT_PATH = path.resolve(__dirname, '../prisma/courses_seed.json');

const KNOWN_COURSES = [
  { id: 'CEH', name: 'Certified Ethical Hacker (CEH)' },
  { id: 'CND', name: 'Certified Network Defender (CND)' },
  { id: 'CIH', name: 'Certified Incident Handler (CIH)' },
  { id: 'CPENT', name: 'Certified Penetration Testing Professional (CPENT)' },
  { id: 'CISSP', name: 'CISSP' },
  { id: 'CCSP', name: 'CCSP' },
  { id: 'SSCP', name: 'SSCP' },
  { id: 'CISA', name: 'CISA' },
  { id: 'CISM', name: 'CISM' },
  { id: 'CRISC', name: 'CRISC' },
  { id: 'CGEIT', name: 'CGEIT' },
  { id: 'IAPP-CIPP/E', name: 'IAPP CIPP/E' },
  { id: 'IAPP-CIPM', name: 'IAPP CIPM' },
  { id: 'Network +', name: 'CompTIA Network+' },
  { id: 'Network+', name: 'CompTIA Network+' },
  { id: 'Pentest+', name: 'CompTIA PenTest+' },
  { id: 'CSA CCSK', name: 'CSA CCSK' },
  { id: 'CDPSE', name: 'CDPSE' },
  { id: 'ISO 27001 Foundations', name: 'ISO 27001 Foundations' },
  { id: 'ISO 27001 Lead Implementer', name: 'ISO 27001 Lead Implementer' },
  { id: 'ISACA COBIT 2019 Foundation', name: 'COBIT 2019 Foundation' },
  { id: 'COBIT 2019 Design and Implementation', name: 'COBIT 2019 Design and Implementation' },
  { id: 'CGRC', name: 'CGRC' },
  { id: 'ISO/IEC 20000 Implementer', name: 'ISO/IEC 20000 Implementer' },
  { id: 'ISO/IEC 27001:2022 Lead Auditor', name: 'ISO/IEC 27001:2022 Lead Auditor' },
  { id: 'CCNA', name: 'CCNA' },
  { id: 'CCNP ENCOR', name: 'CCNP ENCOR' },
  { id: 'CCNP ENARSI', name: 'CCNP ENARSI' },
  { id: 'SailPoint IIQ', name: 'SailPoint IIQ' },
];

async function parsePdf() {
  console.log('Reading PDF from:', PDF_PATH);
  let dataBuffer = fs.readFileSync(PDF_PATH);
  
  let parseFn = typeof pdf === 'function' ? pdf : (pdf.default || pdf.PDFParse);
  const data = await parseFn(dataBuffer);
  const lines = data.text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const courses = [];
  let currentCourse = null;
  let currentModule = null;
  let moduleCounter = 1;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Check for a new course
    let matchedCourse = null;
    for (const kc of KNOWN_COURSES) {
      if (line.toUpperCase().includes(kc.id.toUpperCase()) && 
         (line.includes('-') || line.includes(':') || line.length < 50)) {
         if (line.startsWith(kc.id) || line.startsWith('• ' + kc.id) || line.startsWith(' ' + kc.id) || line === kc.id) {
           matchedCourse = kc;
           break;
         }
      }
    }

    if (matchedCourse && (!currentCourse || currentCourse.title !== matchedCourse.name)) {
      currentCourse = {
        title: matchedCourse.name,
        slug: matchedCourse.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        curriculum: []
      };
      courses.push(currentCourse);
      currentModule = null;
      moduleCounter = 1;
      
      let remainder = line.substring(line.indexOf(matchedCourse.id) + matchedCourse.id.length).trim();
      if (remainder.startsWith('-') || remainder.startsWith(':')) {
        remainder = remainder.substring(1).trim();
      }
      if (remainder.match(/^(Module|Domain|Chapter|Section|Phase)/i)) {
        line = remainder; // Let the module matching logic handle it
      } else {
        continue;
      }
    }

    if (!currentCourse) continue;

    // Check for a new module
    const moduleMatch = line.match(/^(?:Module|Domain|Chapter|Section|Phase|Part)\s*([\w\d\.]+)?\s*[:\-]?\s*(.+)$/i);
    if (moduleMatch) {
      currentModule = {
        number: moduleCounter++,
        title: moduleMatch[2] ? moduleMatch[2].trim() : line,
        subtopics: []
      };
      currentCourse.curriculum.push(currentModule);
      continue;
    }
    
    // Check for subtopic
    const bulletMatch = line.match(/^[o\-\•\*]\s*(.+)$/);
    const numberMatch = line.match(/^(\d+\.\d+[\.\d]*)\s*(.+)$/);
    
    let subtopicText = null;
    if (bulletMatch) subtopicText = bulletMatch[1].trim();
    else if (numberMatch) subtopicText = numberMatch[2].trim();

    if (subtopicText) {
      if (!currentModule) {
        currentModule = {
          number: moduleCounter++,
          title: "Introduction & Overview",
          subtopics: []
        };
        currentCourse.curriculum.push(currentModule);
      }
      currentModule.subtopics.push(subtopicText);
    }
  }

  const cleanedCourses = courses.map(c => ({
    ...c,
    curriculum: c.curriculum.filter(m => m.subtopics.length > 0 || m.title !== "Introduction & Overview")
  })).filter(c => c.curriculum.length > 0);

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(cleanedCourses, null, 2));
  console.log(`Parsed ${cleanedCourses.length} courses and saved to ${OUTPUT_PATH}`);
}

parsePdf().catch(console.error);
