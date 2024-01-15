---
title: "MMU"
date: 2023-04-26T10:00:00-07:00
tags:
- tech
- seed
---

## Memory

## Management

## Unit

## MMU

Paging is dividing process into equal blocks, but complete process is not treated equal by the cpu. Each process is divided into segments like code, data, functions, symbols, global variables, local variables, etc.
These segments can be divided and stored in main memory differently rather than single sequence of bytes.

![segmentation](thoughts/images/segmentation.png)

Segmentation is a memory management scheme that divides process into these different segments and allocate the memory accordingly. For example: global variables function symbols are read only whereas local/global variables of the program can be shared with other processes, thus needs to be treated differently.

![segmentation-addressing](segmentation-addressing.png)

### Questions

- What are the segments in which the process is divided?
- How is the logical address divided? :: into `<segment number, offset>`. Segment table is created which stores `<segment length, base frame address>`.
- How does CPU knows the length of these segments? :: through segment table which stores segment limit. Also depends on architecture, for 48 bit architecture, logical address can be divided into 16 bit for segment length and 32 bit for offset. This means 4GB each segment and total 16KB of segments.
- How does CPU knows which entry belongs to which segment? :: using logical address which contains segment number.
- Does segmentation allow sharing between processes? :: It does allow sharing as each segment addresses can be divided into two parts. For example, 16KB segments can be divided into 8KB global and 8KB local segments which is then stored in GDT (global descriptor table), LDT (local descriptor table).
- what if a program is too big such that segments can't be allocated contiguously? :: then paging can be used to divide segments into pages and then stored accordingly. Logical address derives linear address which contains page number and offset, which is then used to derive the physical address.

![segment-into-pages](segment-into-pages.png)

![selector-part](selector-part-logical-address.png)

- How does logical address get divided to derive linear address? :: 16bit segment number is divided into 13 bit, i.e. 8KB local and 8KB global address, 1 bit for local/global and 2 bits for permissions.
![two-level-paging-segmentation](two-level-paging-segmentation.png)

- If paging is used to divide the segments, what if page table gets too big as well? 4GB for each segment in a 48 bit architecture is large enough to get divided too, right? :: Yes, multi-level paging is implemented for this case as 4GB, i.e. $2^{22}$ is too large to be accommodated in main memory. So, two-level paging can be used which divides 32 bit into 20 bits for page number, i.e. 10 bit for P1, 10 bit for P2, and 12 bits for offset.

![intel-80386-address-translation](intel-80386-address-translation.png)

- Show an example of segmentation with paging for 48 bit logical addresses.
	- 48 bit address is divided into 4GB segments, i.e. 32 bits for segments and 16 bits for selector.
	- 16 bit selector is divided into 13 bits for segment number, 1 bits for descriptor table, 2 bits for permission. Thus 8KB of local and 8KB of global segments.
	- segment number is used as index into descriptor table which is added with offset to give `linear address`.
	- 32 bit linear address is broken into 20 bits page number, i.e. 10 bits page directory, 10 bits page, 12 bits offset.
	- page directory gives base address to page table, 10 bits page number is used as index into page table to give base physical address.
	- Offset in linear address used as an index into frame give physical address.
- What are the steps involved in serving a page fault?
	1. trap created by os
	2. program goes into kernel Mode
	3. saves process registers and state.
	4. check if trap was page fault.
	5. os searches in internal table to check if reference is valid or not.
	6. If invalid, terminates program using seg fault.
	7. if not, goes to disk and fetch page.
	8. check if a free frame is present in main memory
	9. if not present, frees a frame by deleting from previously executed processes or putting an unused frame back to disk.
	10. assign cpu to some other while I/O is being done to fetch from disk.
	11. interrupt from disk (I/O completed)
	12. puts the page at free frame.
	13. updates page table.
	14. updates registers and process state as some other process was being executed now.
	15. program goes back to user mode, execution restarts.
- Give an example of average time required to access a particular page.
	- $20ms$ to service page fault, $1\micro s$ to access main memory.
	- 80% TLB hit, out of remaining 20%, 2% are page faults.
	- Total time = $0.8*1+0.18*2+0.02*20002 = 401.2\micro s$

## Demand Paging

requires two things:

1. Page replacement algorithm
2. Frame allocation

### Page Replacement Algorithm

### Frame Allocation

## Questions?

- fully-associative mapping scheme?
- does page size the lowest unit of memory that is managed for a process? :: yes
- how are frames allocated to a process? :: depends on process size, using frame allocation algorithm used by os
- does each process has its own PTE? :: yes
- can different users of host OS has their own separate virtual tables? :: yes, users like guest OS, hypervisors can have separate, totally unrelated with their own settings, virtual tables. For example: ArmV8 has separate implementation for virtual addresses for these components.

![armv8-address-space](thoughts/images/address-spaces-in-ArmV8-A.png)

- how does MMU determine memory allocation for a process? :: same as frame allocation, each process determine its size and based on that memory is allocated to each process
- how does MMU knows the disk address for a frame not in main memory? :: Page replacement algorithm
- then how does os knows which pages are in memory and which are on disk? :: using data structures like page tables and page directories
- how is page table implemented? since each process has its own PT, how does OS manages the memory utilisation from PT?
	- register
	- main memory: using PTBR, PTLR(length). Understand that two memory access is required to fetch data/instruction in this case. One to access PTE, next to access physical address from main memory.
		- Improved using associative mapping such as TLB cache
			- Why its called associative?: comes from psychology that explains associative mapping is used to remember relationship between two unrelated items.

![tlb](thoughts/images/paging-with-tlb.png)

- derive access time :: $\epsilon$: time to access TLB, $\delta$: time to access physical memory, $\alpha$: cache hit probability -> $(\delta+\epsilon)\alpha + (2\delta+\epsilon)(1-\alpha)$
- what if logical address gets too big, doesn't this take too much main memory?
	- then is page table also divided into pages? :: yes, for example if logical address size is 32 bits and page size is 4KB, then total pages are $2^{20}$ bits. If each PTE takes 4 bytes, so page table size becomes 4MB. Total 1 KB PT entries need to be created, thus page table gets divided into different frames.
- what's the solution to too big page tables? :: frames are limited and created for main memory, it's better and more efficient to create page tables based on frames, i.e. only one page table instead of creating for every process.
	- hashed tables: page number is hashed and searched in PT, a linked list containing page number, frame number, pointer to next has all the frame numbers corresponding to that hash.
![hash-tables](thoughts/images/hashed-tables.png)
	- inverted tables: PTE contains PID along with page number which is searched in the PT, the index is used as actual physical address in the main memory.
![inverted-tables](thoughts/images/inverted-tables.png)
	- multi level paging: logical address is divided into different segments and multi-leveled tables are created in memory, only the required one needs to be fetched from physical memory, saves space.

![logical-address-split](thoughts/images/logical-address-split.png)
![two-level-paging](thoughts/images/two-level-paging.png)

- if main memory is limited, is sharing of frames possible? :: yes, sharing can occur as physical address is maintained same across different PTs.
	- how to do sharing for inverted page table format? :: need to look more into this, but since PTE are associated with PIDs and page number, same frame number can't be assigned to different page numbers and thus, frame sharing is not possible.
- imagine two threads demanding memory at same time, does MMU allocate at once or on demand? :: obviously fix size at once, then depends on the process if it needs more.
- how does memory get cleaned up after the process ends?

## References

- [Virtual Memory lectures](https://www.cs.utexas.edu/users/witchel/372/lectures/15.VirtualMemory.pdf)
- [How is Virtual Memory Translated to Physical Memory?](https://blogs.vmware.com/vsphere/2020/03/how-is-virtual-memory-translated-to-physical-memory.html)
- [Memory management in AArch64](https://developer.arm.com/documentation/101811/0102/Overview)
- [OS notes](https://epgp.inflibnet.ac.in/Home/ViewSubject?catid=fBYckQKJvP3a/8Vd3L08tQ==)
- [Address Transalation](https://www.d.umn.edu/~gshute/os/address-translation.xhtml)
- [Virtual Memory Implementation](https://homepage.divms.uiowa.edu/~ghosh/5-5-11.pdf)
