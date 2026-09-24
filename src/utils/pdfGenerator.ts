import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, EXPERIENCES, HACKATHONS, CERTIFICATIONS } from '../data/resumeData';

/**
 * Generates and triggers download of a cleanly formatted Resume PDF using SVG/Canvas/Blob
 * or triggers the browser's native clean print engine.
 */
export function downloadResumePDF() {
  // Create an offscreen formatted resume printable document
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    // Fallback to direct print if popup blocked
    window.print();
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${PERSONAL_INFO.name} - Official Resume</title>
  <style>
    @page {
      size: A4;
      margin: 14mm 16mm;
    }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #111827;
      background: #ffffff;
      margin: 0;
      padding: 0;
      line-height: 1.4;
      font-size: 10.5pt;
    }
    .header {
      text-align: center;
      margin-bottom: 14px;
      border-bottom: 1.5px solid #0284c7;
      padding-bottom: 10px;
    }
    .name {
      font-size: 22pt;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .contact-info {
      font-size: 9.5pt;
      color: #475569;
      margin-top: 4px;
    }
    .contact-info a {
      color: #0284c7;
      text-decoration: none;
    }
    .section-title {
      font-size: 11.5pt;
      font-weight: 700;
      color: #0369a1;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 3px;
      margin-top: 14px;
      margin-bottom: 6px;
    }
    .entry-header {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      color: #1e293b;
      margin-top: 6px;
      font-size: 10.5pt;
    }
    .entry-sub {
      display: flex;
      justify-content: space-between;
      color: #64748b;
      font-style: italic;
      font-size: 9.5pt;
      margin-bottom: 4px;
    }
    ul {
      margin: 3px 0 6px 18px;
      padding: 0;
    }
    li {
      margin-bottom: 3px;
      color: #334155;
      font-size: 9.5pt;
    }
    .skills-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9.5pt;
    }
    .skills-table td {
      padding: 3px 0;
      vertical-align: top;
    }
    .skills-label {
      font-weight: 700;
      width: 28%;
      color: #1e293b;
    }
    .skills-value {
      color: #334155;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${PERSONAL_INFO.name}</div>
    <div class="contact-info">
      ${PERSONAL_INFO.location} &nbsp;|&nbsp; 
      ${PERSONAL_INFO.phone} &nbsp;|&nbsp; 
      <a href="mailto:${PERSONAL_INFO.email}">${PERSONAL_INFO.email}</a>
    </div>
    <div class="contact-info">
      <a href="${PERSONAL_INFO.linkedin}" target="_blank">linkedin.com/in/digvijay-ware-57a007330</a> &nbsp;|&nbsp;
      <a href="${PERSONAL_INFO.github}" target="_blank">github.com/Digvijay-exe</a>
    </div>
  </div>

  <div class="section-title">Professional Summary</div>
  <p style="margin: 4px 0 10px 0; font-size: 9.5pt; color: #334155; text-align: justify;">
    ${PERSONAL_INFO.professionalSummary}
  </p>

  <div class="section-title">Education</div>
  <div class="entry-header">
    <span>${PERSONAL_INFO.education.institution}</span>
    <span>${PERSONAL_INFO.education.location}</span>
  </div>
  <div class="entry-sub">
    <span>${PERSONAL_INFO.education.degree}</span>
    <span>${PERSONAL_INFO.education.period}</span>
  </div>
  <div style="font-size: 9.5pt; color: #475569; margin-bottom: 6px;">
    – Current Status: ${PERSONAL_INFO.education.status} | Focus Areas: ${PERSONAL_INFO.education.focusAreas.join(', ')}
  </div>

  <div class="section-title">Technical Skills</div>
  <table class="skills-table">
    <tr>
      <td class="skills-label">Programming:</td>
      <td class="skills-value">C++, Python, SQL</td>
    </tr>
    <tr>
      <td class="skills-label">Data Structures &amp; Algorithms:</td>
      <td class="skills-value">Trees, Graphs, Dynamic Programming, Sorting, Searching, KMP, Boyer–Moore</td>
    </tr>
    <tr>
      <td class="skills-label">Database Management:</td>
      <td class="skills-value">MySQL, Relational Database Design, SQL Joins, Indexing, Procedures, Triggers</td>
    </tr>
    <tr>
      <td class="skills-label">AI &amp; Computer Vision:</td>
      <td class="skills-value">Artificial Intelligence Fundamentals, Computer Vision, AI Productivity Tools</td>
    </tr>
    <tr>
      <td class="skills-label">Development Tools:</td>
      <td class="skills-value">Git, GitHub, VS Code, Linux/Unix</td>
    </tr>
    <tr>
      <td class="skills-label">Core Concepts:</td>
      <td class="skills-value">Object-Oriented Programming, File I/O, Socket Programming, Software Development</td>
    </tr>
  </table>

  <div class="section-title">Projects</div>
  ${PROJECTS.map(p => `
    <div class="entry-header">
      <span>${p.title} – ${p.subtitle}</span>
      <span>${p.year}</span>
    </div>
    <div class="entry-sub">
      <span>${p.tags.join(' | ')}</span>
    </div>
    <ul>
      ${p.bulletPoints.map(b => `<li>${b}</li>`).join('')}
    </ul>
  `).join('')}

  <div class="section-title">Experience &amp; Leadership</div>
  ${EXPERIENCES.map(e => `
    <div class="entry-header">
      <span>${e.role.split('–')[0].trim()} – ${e.company}</span>
      <span>${e.location}</span>
    </div>
    <div class="entry-sub">
      <span>${e.role.split('–')[1] ? e.role.split('–')[1].trim() : 'Ambassador'}</span>
      <span>${e.period}</span>
    </div>
    <ul>
      ${e.points.map(pt => `<li>${pt}</li>`).join('')}
    </ul>
  `).join('')}

  <div class="section-title">Hackathons &amp; Competitions</div>
  <ul>
    ${HACKATHONS.map(h => `
      <li><strong>${h.name}:</strong> ${h.organizer}, ${h.location} – ${h.round}</li>
    `).join('')}
  </ul>

  <div class="section-title">Course Certifications</div>
  <ul>
    ${CERTIFICATIONS.map(c => `
      <li><strong>${c.title}:</strong> ${c.issuer} – ${c.details} (${c.date})</li>
    `).join('')}
  </ul>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 300);
    };
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

/**
 * Downloads resume in Markdown / ATS plain-text format
 */
export function downloadResumeMarkdown() {
  const md = `# ${PERSONAL_INFO.name}
${PERSONAL_INFO.location} | ${PERSONAL_INFO.phone} | ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub: ${PERSONAL_INFO.github}

## Professional Summary
${PERSONAL_INFO.professionalSummary}

## Education
${PERSONAL_INFO.education.institution}, ${PERSONAL_INFO.education.location}
${PERSONAL_INFO.education.degree} (${PERSONAL_INFO.education.period})
Current Status: ${PERSONAL_INFO.education.status} | Focus: ${PERSONAL_INFO.education.focusAreas.join(', ')}

## Technical Skills
- Programming: C++, Python, SQL
- DSA: Trees, Graphs, Dynamic Programming, Sorting, Searching, KMP, Boyer-Moore
- DBMS: MySQL, Relational Database Design, SQL Joins, Indexing, Procedures, Triggers
- AI & CV: AI Fundamentals, Computer Vision, AI Productivity Tools
- Dev Tools: Git, GitHub, VS Code, Linux/Unix
- Core Concepts: OOP, File I/O, Socket Programming, Software Development

## Featured Projects
${PROJECTS.map(p => `### ${p.title} (${p.year})
Tech: ${p.tags.join(', ')}
${p.summary}
${p.bulletPoints.map(b => `- ${b}`).join('\n')}
`).join('\n')}

## Experience & Leadership
${EXPERIENCES.map(e => `### ${e.company} – ${e.role}
${e.location} | ${e.period}
${e.points.map(pt => `- ${pt}`).join('\n')}
`).join('\n')}

## Hackathons & Competitions
${HACKATHONS.map(h => `- ${h.name} (${h.organizer}): ${h.round}`).join('\n')}

## Course Certifications
${CERTIFICATIONS.map(c => `- ${c.title} (${c.issuer}): ${c.details}`).join('\n')}
`;

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Digvijay_Madhav_Ware_Resume.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
