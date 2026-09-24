import { PERSONAL_INFO, PROJECTS, EXPERIENCES, HACKATHONS } from '../data/resumeData';

/**
 * Generates and triggers download of a cleanly formatted Resume PDF matching Digvijay's exact resume
 */
export function downloadResumePDF() {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${PERSONAL_INFO.name} - Resume</title>
  <style>
    @page {
      size: A4;
      margin: 15mm 18mm;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #000000;
      background: #ffffff;
      margin: 0;
      padding: 0;
      line-height: 1.35;
      font-size: 10pt;
    }
    .header {
      text-align: center;
      margin-bottom: 12px;
    }
    .name {
      font-size: 24pt;
      font-weight: 500;
      color: #000000;
      margin-bottom: 2px;
    }
    .contact-line {
      font-size: 9pt;
      color: #111827;
      margin-top: 2px;
    }
    .contact-line a {
      color: #000000;
      text-decoration: none;
    }
    .section-title {
      font-size: 11pt;
      font-weight: bold;
      color: #000000;
      border-bottom: 1px solid #1f2937;
      padding-bottom: 2px;
      margin-top: 10px;
      margin-bottom: 6px;
    }
    .entry-header {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      color: #000000;
      font-size: 10pt;
    }
    .entry-sub {
      display: flex;
      justify-content: space-between;
      font-style: italic;
      color: #1f2937;
      font-size: 9.5pt;
      margin-bottom: 3px;
    }
    ul {
      margin: 2px 0 5px 16px;
      padding: 0;
    }
    li {
      margin-bottom: 2px;
      color: #111827;
      font-size: 9.5pt;
      text-align: justify;
    }
    .skills-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9.5pt;
    }
    .skills-table td {
      padding: 2px 0;
      vertical-align: top;
    }
    .skills-label {
      font-weight: bold;
      width: 32%;
      color: #000000;
    }
    .skills-value {
      color: #111827;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${PERSONAL_INFO.name}</div>
    <div class="contact-line">
      ${PERSONAL_INFO.location} &nbsp;|&nbsp; 
      ${PERSONAL_INFO.phone} &nbsp;|&nbsp; 
      <a href="mailto:${PERSONAL_INFO.email}">${PERSONAL_INFO.email}</a>
    </div>
    <div class="contact-line">
      <a href="${PERSONAL_INFO.linkedin}" target="_blank">linkedin.com/in/digvijay-ware-57a007330</a> &nbsp;|&nbsp;
      <a href="${PERSONAL_INFO.github}" target="_blank">github.com/Digvijay-exe</a>
    </div>
  </div>

  <div class="section-title">Professional Summary</div>
  <p style="margin: 3px 0 8px 0; font-size: 9.5pt; text-align: justify;">
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
  <div style="font-size: 9.5pt; margin-bottom: 6px;">
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
 * Downloads resume in Markdown format matching Digvijay's exact resume
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
Current Status: ${PERSONAL_INFO.education.status} | Focus Areas: ${PERSONAL_INFO.education.focusAreas.join(', ')}

## Technical Skills
- Programming: C++, Python, SQL
- Data Structures & Algorithms: Trees, Graphs, Dynamic Programming, Sorting, Searching, KMP, Boyer–Moore
- Database Management: MySQL, Relational Database Design, SQL Joins, Indexing, Procedures, Triggers
- AI & Computer Vision: Artificial Intelligence Fundamentals, Computer Vision, AI Productivity Tools
- Development Tools: Git, GitHub, VS Code, Linux/Unix
- Core Concepts: Object-Oriented Programming, File I/O, Socket Programming, Software Development

## Projects
${PROJECTS.map(p => `### ${p.title} – ${p.subtitle} (${p.year})
${p.tags.join(' | ')}
${p.bulletPoints.map(b => `- ${b}`).join('\n')}
`).join('\n')}

## Experience & Leadership
${EXPERIENCES.map(e => `### ${e.role} – ${e.company} (${e.period})
${e.location}
${e.points.map(pt => `- ${pt}`).join('\n')}
`).join('\n')}

## Hackathons & Competitions
${HACKATHONS.map(h => `- ${h.name}: ${h.organizer}, ${h.location} – ${h.round}`).join('\n')}
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
