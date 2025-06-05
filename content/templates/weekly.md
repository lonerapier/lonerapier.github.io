---
week: <% tp.date.now("YYYY-[W]W", 0, tp.file.title, "YYYY-[W]W") %>
year: <% tp.date.now("YYYY", 0, tp.file.title, "YYYY-[W]W") %>
---

## Notes
- 🚂

## Previous Week
<%* 
	const currentWeek = tp.date.now("YYYY-[W]W", 0, tp.file.title, "YYYY-[W]W"); 
	const [year, week] = currentWeek.split("-W"); 
	const prevWeek = parseInt(week) - 1; 
	const prevWeekFormatted = prevWeek.toString().padStart(2, '0'); 
	const prevWeekFile = `${year}-W${prevWeekFormatted}`; tR += `![[${prevWeekFile}#Notes]]`; 
%>

## History

<%*
Array.from(Array(7).keys()).map((i) => {
  date = tp.date.weekday("YYYY-MM-DD", i, tp.file.title, "YYYY-[W]W");
  tR += `### ${date}\n`;
  tR += `- \n\n`;
});
%>

## Outcomes
1. 🪂