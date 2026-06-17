/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  name: string;
  location: string;
  year: string;
  sector: string;
  area_m2: number | null;
  system: string;
  scope_raw: string;
  client_ref: string;
}

export function parseProjectsCSV(text: string): Project[] {
  const lines = text.split(/\r?\n/);
  if (lines.length === 0) return [];
  
  const results: Project[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV line handling quoted fields
    const row: string[] = [];
    let insideQuote = false;
    let currentField = "";
    
    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        row.push(currentField.trim());
        currentField = "";
      } else {
        currentField += char;
      }
    }
    row.push(currentField.trim());
    
    // name,location,year,sector,area_m2,system,scope_raw,client_ref
    if (row.length >= 3 && row[0]) {
      const areaVal = row[4] ? parseInt(row[4].replace(/[^\d]/g, ""), 10) : null;
      results.push({
        id: `project-${i}`,
        name: row[0].replace(/^"|"$/g, "").trim(),
        location: row[1].replace(/^"|"$/g, "").trim(),
        year: row[2].replace(/^"|"$/g, "").trim() || "N/A",
        sector: row[3].replace(/^"|"$/g, "").trim() || "Commercial",
        area_m2: isNaN(areaVal as number) ? null : areaVal,
        system: row[5].replace(/^"|"$/g, "").trim()
          .replace(/sika liquid-applied/gi, "Sika Tiles applied")
          .replace(/sika liquid/gi, "Sika Tiles")
          .replace(/liquid sika/gi, "Sika Tiles") || "Waterproofing",
        scope_raw: row[6].replace(/^"|"$/g, "").trim()
          .replace(/sika liquid-applied/gi, "Sika Tiles applied")
          .replace(/sika liquid/gi, "Sika Tiles")
          .replace(/liquid sika/gi, "Sika Tiles") || "",
        client_ref: row[7].replace(/^"|"$/g, "").trim() || ""
      });
    }
  }
  
  return results;
}

export function computeProjectStats(projects: Project[]) {
  const totalCount = projects.length;
  const totalArea = projects.reduce((acc, p) => acc + (p.area_m2 || 0), 0);
  
  const years = projects
    .map(p => parseInt(p.year, 10))
    .filter(y => !isNaN(y) && y > 1900);
    
  const startYear = years.length ? Math.min(...years) : 1971;
  const endYear = years.length ? Math.max(...years) : new Date().getFullYear();
  
  return {
    totalCount,
    totalArea,
    startYear,
    endYear
  };
}
