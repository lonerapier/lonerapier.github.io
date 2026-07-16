---
date: <% tp.date.now("YYYY-MM-DD", 0, tp.file.title, "YYYY-MM-DD") %>
day: <% moment(tp.file.title).format("DDD") %>
week: <% tp.date.now("YYYY-[W]W", 0, tp.file.title, "YYYY-MM-DD") %>
year: <% tp.date.now("YYYY", 0, tp.file.title, "YYYY-MM-DD") %>
tags:
- daily
- 
---
<%*
let prevDay = tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD");
let nextDay = tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD");
%>
**Prev Date**: [[<% prevDay %>]]
**Next Date**: [[<% nextDay  %>]]

---
**[[private/todo]]**

# Work
- [ ] 

# Timeline

- 