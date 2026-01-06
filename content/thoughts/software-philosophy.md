---
title: Software Philosophy
date: 2024-12-07
tags:
- philosophy
- engineering
---

- Understand the difference between complex and complicated [^1]. Complex system can be elegant and beautiful, it might need more time to understand completely, but you can reason your way through a complex system with minimal external help.
- But a complicated system is a monster in disguise. I consider a system complicated when I can’t intuitively understand it’s components and communication between them. Even if you don’t know the answer to those questions at first try, it should be immediately clear when you do get the answer.
- Extending a complex system is natural, my meaning by that sentence is adding new capabilities to a complex system doesn’t decrease it’s elegance, and are obvious.

Reasons that make a system complicated:

- Defensive Code: validating inputs, authenticating users, handling every failure scenario. All of these combined when put together in a code, can turn the code from simple to non-comprehensible really quickly. Happy path should immediately be visible to a first-time code reader, and error handling should be abstracted away in a manner that doesn’t harm the happy/hot path.
- Scale: With scale, your problem changes completely. A web server serving media to 100 users is completely different from server serving same media to 1M users. You have different scenarios to care for now. Creating a system for 1M users from the start is a waste of time, and trying to engineer your way through a 100-user system to 1M users is what turns code from beautiful to ugly.
- [Leaky Abstractions](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/): Abstractions make our life easier by hiding most of the complexity to do a task and provide nice, easy-to-use interfaces. But sometimes, assumptions on these abstractions create problems that are hard to debug, and simply frustrating. Creating more abstractions on top of a leaky abstraction then just bubble up the problem even more, and a points comes, when no one, not even the author remember the abstractions completely.
    - Substituting _familiarity_ with _understanding_ is harmful in long term.
- Problem/Solution model gaps: Sometimes the solution intended to solve a problem doesn’t encompass complete problem domain. Only way is to either hack-solve for time being, and rewrite the solution later but really soon.
- hyperspace: Complexity can increase exponentially when a solution is designed to work for multi-dimensional platform.
    - Best example is a backend code designed to work for native/wasm/ios/android application on linux/macos running on x86/arm64 architecture.

**Risk Homeostasis**: People writing a system tend to evolve over time. More people get added, people who originally wrote the code leave, underlying architecture assumptions gets better, or doesn’t even hold true for better or worse.

- Complexity of a system can vary depending on the circumstances under which it was designed, and changes to these also changes the behavior of the system.
- Dividing a problem into mutually exclusive subproblems help a lot in a team.
- And the more you spend time with a complex system, the more you understand it, and the more you’re comfortable to take risks.
- I think solution to this is always think from the perspective of a first-timer. Someone who is looking at the system’s design for the first time. It should feel elegant and obvious in hindsight.
- Read about [Rebound Effect](https://en.wikipedia.org/wiki/Rebound_effect_(conservation))

Solutions:
- Every system should start with a clear goal and benchmarks that it adheres to.
	- At any moment, if the scale grows, or major goal changes. System should be rewritten.
- Complexity is inevitable, and software systems can't ever be simple for perpetuity. You have to push the homeostasis point of the team overtime.
- 
# Footnotes

[^1]: [Non-Zero sum games: CONWAY'S GAME OF LIFE](https://nonzerosum.games/conwaysgame.html)