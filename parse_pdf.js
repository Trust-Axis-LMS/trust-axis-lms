const fs = require('fs');

const text = fs.readFileSync('course_content.txt', 'utf8');
const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const aliases = {
    "CEH": "ceh", "CND": "cnd", "CIH": "cih", "CPENT": "cpent",
    "CISSP": "cissp", "CCSP": "ccsp", "SSCP": "sscp", "CC": "cc",
    "CISA": "cisa", "CISM": "cism", "CRISC": "crisc", "CGEIT": "cgeit",
    "IAPP": "iapp", "CSA CCSK": "csa-ccsk", "ISO/IEC 27035": "iso-iec-27035",
    "ISO/IEC 20000": "iso-iec-20000", "ISO 20000": "iso-iec-20000",
    "ITIL 4": "itil-4-foundation", "CGRC": "cgrc", "CCNA": "ccna",
    "CCNP": "ccnp-encor", "EAP": "enterprise-architecture-practitioner",
    "APIC": "apic", "REST": "rest", "SD": "software-development-security"
};

const courses = {};
let currentCourse = null;
let currentModule = null;
let modNum = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].replace(/^[\u2022\u00b7\u25e6\u2023\u2043\u2219o\uF0B7\uF0A7]\s*/, '').trim();
    
    // Check if line indicates a new course
    let newCourse = null;
    for (const [key, slug] of Object.entries(aliases)) {
        if (line.startsWith(key + " -") || line.startsWith(key + "-") || line.startsWith(key + " ")) {
            // make sure it's not just a passing mention. Usually "COURSE -" or "COURSE Domain"
            if (line.match(new RegExp(`^${key}\\s*(?:-|Domain|Module|Chapter)`, "i"))) {
                newCourse = slug;
                break;
            }
        }
    }
    
    if (newCourse && newCourse !== currentCourse) {
        currentCourse = newCourse;
        if (!courses[currentCourse]) courses[currentCourse] = [];
        modNum = 0;
        currentModule = null;
    }
    
    if (currentCourse) {
        const modMatch = line.match(/(?:Module|Domain|Chapter)\s*(\d+)[\s:-]*(.*)/i);
        if (modMatch && modMatch[2] !== undefined) {
            modNum++;
            currentModule = {
                number: modNum,
                title: modMatch[0].trim(),
                subtopics: []
            };
            courses[currentCourse].push(currentModule);
            continue;
        }
        
        if (currentModule) {
            // It's a subtopic
            if (line.match(/^[a-zA-Z]/) || line.match(/^\d+\.\d+/)) {
                // Ignore page numbers or totally short lines
                if (line.length > 5 && !line.toLowerCase().includes("domain") && !line.toLowerCase().includes("module")) {
                    currentModule.subtopics.push(line);
                }
            }
        }
    }
}

// Special case for IAPP which lacks course prefix for its domains
let iappDomains = [];
let captureIapp = false;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("CIPP/E")) captureIapp = true;
    if (captureIapp) {
        const modMatch = line.match(/Domain\s*(\d+):\s*(.*)/i);
        if (modMatch) {
            if (!courses["iapp"]) courses["iapp"] = [];
            courses["iapp"].push({ number: parseInt(modMatch[1], 10), title: modMatch[0].trim(), subtopics: [] });
        }
    }
}

fs.writeFileSync('fixed_curriculum.json', JSON.stringify(courses, null, 2));
