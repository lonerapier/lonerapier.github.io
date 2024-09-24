---
title: "Complexity Theory"
date: 2024-07-24:12:00:00
tags:
- theoretical
- math
- incomplete
---

[[ct-glossary|Glossary]]

definition of np hard problem: a problem H is NP hard, if every problem P in NP is poly time reducible to H. $P ≤_p H$

Let’s understand what reduction in complexity class means:

Amartya starts with an example of NP-hard problem: **hamiltonian cycle problem**: in a graph, if you start at a vertex, you can traverse the whole graph, i.e. visit every vertex and come back to the starting vertex, then your graph has hamiltonian cycle. What we want to prove here is that this problem is an NP-hard problem. We’ll take help of a reduction.

Let’s take another problem: Hamiltonian path: in a graph, you start at any vertex and traverse the whole graph. there is no condition of coming back to the starting point. This problem is an NP problem as the solution is verifiable in linear time < poly time.

Now, we can reduce our problem A to problem B in poly time and, we know problem B is NP-hard problem. thus, this validates our proof that A is also an NP-hard problem.

Reduction: split any vertex in graph G, into two with vertex V’ having all incoming edges and V’’ having all outgoing edges.

$$A(G) = B(R(G)) = B(G’)$$



## References

- read sipser’s [theory of computation](https://math.mit.edu/~sipser/18404/)
- read arora’s complexity theory
- [https://www.quantamagazine.org/complexity-theorys-50-year-journey-to-the-limits-of-knowledge-20230817/](https://www.quantamagazine.org/complexity-theorys-50-year-journey-to-the-limits-of-knowledge-20230817/)
- [https://cs.stackexchange.com/questions/9556/what-is-the-definition-of-p-np-np-complete-and-np-hard](https://cs.stackexchange.com/questions/9556/what-is-the-definition-of-p-np-np-complete-and-np-hard)
- [https://ocw.mit.edu/courses/18-405j-advanced-complexity-theory-spring-2016/pages/lecture-notes/](https://ocw.mit.edu/courses/18-405j-advanced-complexity-theory-spring-2016/pages/lecture-notes/)
- [https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/pages/lecture-notes/](https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/pages/lecture-notes/)
- [https://perso.ens-lyon.fr/alain.passelegue/teaching/m2_2022.html](https://perso.ens-lyon.fr/alain.passelegue/teaching/m2_2022.html)
- [https://www.math.toronto.edu/swastik/courses/rutgers/topics-S13/](https://www.math.toronto.edu/swastik/courses/rutgers/topics-S13/)
- [https://www.cse.iitb.ac.in/~rgurjar/CS761_2022/](https://www.cse.iitb.ac.in/~rgurjar/CS761_2022/)
- [https://www.khoury.northeastern.edu/home/viola/classes/spepf17.html](https://www.khoury.northeastern.edu/home/viola/classes/spepf17.html)
- [https://courses.cs.cornell.edu/cs6815/2022fa/](https://courses.cs.cornell.edu/cs6815/2022fa/)
- [https://sites.math.rutgers.edu/~sk1233/courses/topics-S17/](https://sites.math.rutgers.edu/~sk1233/courses/topics-S17/)
- [https://www.cs.princeton.edu/~zdvir/LDCnotes/ldc-notes.html](https://www.cs.princeton.edu/~zdvir/LDCnotes/ldc-notes.html)
- [https://people.seas.harvard.edu/~salil/cs221/fall02/scribenotes/](https://people.seas.harvard.edu/~salil/cs221/fall02/scribenotes/)
- [https://www.cs.ubc.ca/~nickhar/W12/](https://www.cs.ubc.ca/~nickhar/W12/)
- [http://users.cms.caltech.edu/~vidick/teaching/286_qPCP/index.html](http://users.cms.caltech.edu/~vidick/teaching/286_qPCP/index.html)
- [https://www.cs.utexas.edu/~danama/courses/pcp-mit/](https://www.cs.utexas.edu/~danama/courses/pcp-mit/)
- [https://ocw.mit.edu/courses/18-408-topics-in-theoretical-computer-science-probabilistically-checkable-proofs-fall-2022/pages/lecture-notes/](https://ocw.mit.edu/courses/18-408-topics-in-theoretical-computer-science-probabilistically-checkable-proofs-fall-2022/pages/lecture-notes/)
- [https://www2.cs.sfu.ca/~kabanets/cmpt710/](https://www2.cs.sfu.ca/~kabanets/cmpt710/)
- [](https://www.cs.princeton.edu/courses/archive/spr04/cos423/handouts/complexity%20of%20combin.pdf)[https://www.cs.princeton.edu/courses/archive/spr04/cos423/handouts/complexity](https://www.cs.princeton.edu/courses/archive/spr04/cos423/handouts/complexity) of combin.pdf
- [https://scottaaronson.blog/?p=755](https://scottaaronson.blog/?p=755)
- [https://lucatrevisan.github.io/cs254-14/](https://lucatrevisan.github.io/cs254-14/)
- [Beyond computation: P vs NP](https://www.youtube.com/watch?v=msp2y_Y5MLE)
- [Prof. Avi Widgerson talks about P vs NP](https://www.youtube.com/watch?v=pTeZP-XfuKI)
