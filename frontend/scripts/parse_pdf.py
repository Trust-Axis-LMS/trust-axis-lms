import fitz
import json
import re
import os

PDF_PATH = '../Course-Content.pdf'
OUTPUT_PATH = 'prisma/courses_seed.json'

KNOWN_COURSES = [
  {"id": 'CEH', "name": 'Certified Ethical Hacker (CEH)'},
  {"id": 'CND', "name": 'Certified Network Defender (CND)'},
  {"id": 'CIH', "name": 'Certified Incident Handler (CIH)'},
  {"id": 'CPENT', "name": 'Certified Penetration Testing Professional (CPENT)'},
  {"id": 'CISSP', "name": 'CISSP'},
  {"id": 'CCSP', "name": 'CCSP'},
  {"id": 'SSCP', "name": 'SSCP'},
  {"id": 'CISA', "name": 'CISA'},
  {"id": 'CISM', "name": 'CISM'},
  {"id": 'CRISC', "name": 'CRISC'},
  {"id": 'CGEIT', "name": 'CGEIT'},
  {"id": 'IAPP-CIPP/E', "name": 'IAPP CIPP/E'},
  {"id": 'IAPP-CIPM', "name": 'IAPP CIPM'},
  {"id": 'Network +', "name": 'CompTIA Network+'},
  {"id": 'Pentest+', "name": 'CompTIA PenTest+'},
  {"id": 'CSA CCSK', "name": 'CSA CCSK'},
  {"id": 'CDPSE', "name": 'CDPSE'},
  {"id": 'ISO 27001 Foundations', "name": 'ISO 27001 Foundations'},
  {"id": 'ISO 27001 Lead Implementer', "name": 'ISO 27001 Lead Implementer'},
  {"id": 'ISACA COBIT 2019 Foundation', "name": 'COBIT 2019 Foundation'},
  {"id": 'COBIT 2019 Design and Implementation', "name": 'COBIT 2019 Design and Implementation'},
  {"id": 'CGRC', "name": 'CGRC'},
  {"id": 'ISO/IEC 20000 Implementer', "name": 'ISO/IEC 20000 Implementer'},
  {"id": 'ISO/IEC 27001:2022 Lead Auditor', "name": 'ISO/IEC 27001:2022 Lead Auditor'},
  {"id": 'CCNA', "name": 'CCNA'},
  {"id": 'CCNP ENCOR', "name": 'CCNP ENCOR'},
  {"id": 'CCNP ENARSI', "name": 'CCNP ENARSI'},
  {"id": 'SailPoint IIQ', "name": 'SailPoint IIQ'}
]

def parse_pdf():
    print(f"Reading PDF from: {PDF_PATH}")
    doc = fitz.open(PDF_PATH)
    lines = []
    for page in doc:
        text = page.get_text("text")
        for line in text.split('\n'):
            line = line.strip()
            if line:
                lines.append(line)
    
    courses = []
    current_course = None
    current_module = None
    module_counter = 1

    for line in lines:
        matched_course = None
        for kc in KNOWN_COURSES:
            if kc['id'].upper() in line.upper() and (('-' in line or ':' in line) or len(line) < 50):
                if line.startswith(kc['id']) or line.startswith('• ' + kc['id']) or line.startswith(' ' + kc['id']) or line == kc['id']:
                    matched_course = kc
                    break
        
        if matched_course and (not current_course or current_course['title'] != matched_course['name']):
            import re as regex
            slug = re.sub(r'[^a-z0-9]+', '-', matched_course['name'].lower()).strip('-')
            current_course = {
                "title": matched_course['name'],
                "slug": slug,
                "curriculum": []
            }
            courses.append(current_course)
            current_module = None
            module_counter = 1
            
            # Check if line contains a module right away
            idx = line.find(matched_course['id'])
            remainder = line[idx + len(matched_course['id']):].strip()
            if remainder.startswith('-') or remainder.startswith(':'):
                remainder = remainder[1:].strip()
            if re.match(r'^(Module|Domain|Chapter|Section|Phase|Part)', remainder, re.IGNORECASE):
                line = remainder
            else:
                continue

        if not current_course:
            continue
            
        module_match = re.match(r'^(?:Module|Domain|Chapter|Section|Phase|Part)\s*([\w\d\.]+)?\s*[:\-]?\s*(.+)$', line, re.IGNORECASE)
        if module_match:
            title = module_match.group(2).strip() if module_match.group(2) else line
            current_module = {
                "number": module_counter,
                "title": title,
                "subtopics": []
            }
            module_counter += 1
            current_course['curriculum'].append(current_module)
            continue
            
        # Match bullets
        bullet_match = re.match(r'^[o\-\•\*]\s*(.+)$', line)
        number_match = re.match(r'^(\d+\.\d+[\.\d]*)\s*(.+)$', line)
        
        subtopic_text = None
        if bullet_match:
            subtopic_text = bullet_match.group(1).strip()
        elif number_match:
            subtopic_text = number_match.group(2).strip()
            
        if subtopic_text:
            if not current_module:
                current_module = {
                    "number": module_counter,
                    "title": "Introduction & Overview",
                    "subtopics": []
                }
                module_counter += 1
                current_course['curriculum'].append(current_module)
            current_module['subtopics'].append(subtopic_text)

    # Clean up empty courses and modules
    cleaned_courses = []
    for c in courses:
        cleaned_modules = []
        for m in c['curriculum']:
            if len(m['subtopics']) > 0 or m['title'] != "Introduction & Overview":
                cleaned_modules.append(m)
        c['curriculum'] = cleaned_modules
        if len(cleaned_modules) > 0:
            cleaned_courses.append(c)

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, 'w') as f:
        json.dump(cleaned_courses, f, indent=2)
    print(f"Parsed {len(cleaned_courses)} courses and saved to {OUTPUT_PATH}")

if __name__ == "__main__":
    parse_pdf()
