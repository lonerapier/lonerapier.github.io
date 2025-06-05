---
title: "Things on Internet that I don't want to forget"
tags:
- exploring
- seed
---

Other links:
- [[technical-links]]

## Jun '25
- ["The Grugbrained CEO", Sam Rodriques](https://www.sam-rodriques.com/post/the-grugbrained-ceo)
- [Prakash Lab](https://prakashlab.stanford.edu/): This is a completely different and probably more humane proposition to academia that I actually like and prefer. Enabling and inspiring people all over the world with affordable tools with puzzles to solve. Real world example of curiosity driven science.
	- [How Paradoxical Questions and Simple Wonder Lead to Great Science \| Quanta Magazine](https://www.quantamagazine.org/how-paradoxical-questions-and-simple-wonder-lead-to-great-science-20250528/)
	- [Recreational Biology: Topological Puzzles at Cellular Scales - Manu Prakash - YouTube](https://www.youtube.com/watch?v=9k1AUuKoy3w)
- [Spatial technologies of the future - by Zack Chiang](https://cellularalchemy.substack.com/p/spatial-technologies-of-the-future)
- [Why I have slightly longer timelines than some of my guests](https://www.dwarkesh.com/p/timelines-june-2025), [AGI Is Not Multimodal](https://thegradient.pub/agi-is-not-multimodal/): I agree with a lot of what's said here:  
	- "the fundamental problem is that LLMs don’t get better over time the way a human would.": Have been feeling this firsthand while trying to work with browser-use. Currently the only way to make an agent learn on-the-fly is to engineer prompts really carefully. Humans don't need that.
	- Scaling laws are kinda dead.
		- Current Llama maverick runs on 400B parameters that probably need 1000s of GPUs to work. All smaller models (~5-20B) models serves as MoE, but never at the scale of large models.
	- Seeing a baby learn is so much refreshing than huge training data used to train these models. We need a different architecture to be anywhere close to AGI. Agents will be useful, but never will be truly agentic with current approach.
	    - This is a good read: [https://arxiv.org/abs/2505.22954](https://arxiv.org/abs/2505.22954)
	- Taking a step back: task become to segment and distill the environment for the agent to efficiently encode the environment for agent's understanding. Mapping and sequencing agent's environment before waiting for it to take action.
	- Memory: Ability to forge new memories from the ever-changing environment, unlearn useless ones. ChatGPT memory feels like a step in that direction, but it's way way far away from actual human episodic + long-term memory.

## May '25
- [Uses This / Interviews](https://usesthis.com/): Nice interviews of people from different professions about what their current tools are.
- [Jony Ive and Patrick Collison](https://x.com/patrickc/status/1920590121537052881): What a beautiful conversation!!
	- "Having a clear sense of goal which is to enable and inspire people"
	- "Solving a functional imperative, and we're done. Of course, that's not enough. That's not the characteristic of an evolved society."
	- "To people, Simplicity is about removing clutter. But Simplicity to me, is about succinctly expressing the essence of something, and its purpose, and its role in our lives."
	- "I think how you feel while working on something gets ultimately embodied into the final product. So if I'm anxious, that's how end product will end up. I think to be hopeful, and optimistic, and joyful in our practice, and be that way, in how we relate to each other."
- [Why did DeepMind solve protein folding? - by Jake Feala](https://jakefeala.substack.com/p/why-did-deepmind-solve-protein-folding): Interesting insights on AI for biology, and why protein folding isn't the singularity point. It's still an inflection point for biology, and research labs.
- [A Baby Receives the First Customized CRISPR Treatment \| TIME](https://time.com/7285695/first-crispr-treatment-baby)
	- *"That treatment involves removing cells responsible for generating blood cells from a patient, then genetically editing them using CRISPR to turn on a gene that makes fetal hemoglobin, which is normally turned off in adults. Once the blood stem cells are edited, they are then re-infused back into the patient. The idea is that these cells would start to make more copies of themselves and eventually generate enough healthy red blood cells to minimize or even eliminate the painful symptoms that patients experience."*
	- This is ***Medicine 2.0***
- ["India’s remittance tax woes in Trump’s ‘big, beautiful’ bill", FT](https://www.ft.com/content/1803e03d-9996-46cd-beef-a6694edaf68e): Immigrant Indians sending 20% of their income to the home country with total amount exceeding $30B in FY23-24.
- ["Has Starlink already won the new space race?", FT](https://www.ft.com/content/b635423f-e721-454c-b75c-98d0ad8fedf1)
	- The congestion of LEO: Estimates says 100,000 satellites fighting for space and path in Earth's most priced space resource.
	- SpaceX alone has launched 39% of total satellites launched since Sputnik, and has approximately 8000 starlink satellites in orbit. It's already approved for 12,500 satellites.
	- Generates $12B in revenue, and $2B in free cash flow in 2024-25 alone.
	- "Ultimately, it aims to fly more than 40,000 satellites."
	- "Amazon will need to spend between $16B and $20B to build Kuiper, Quilty estimates.". That's really expensive for any developing nation to bootstrap. A nation like India that spends ~1B in its entire space program will never even think of such an effort.
- [How Does Claude 4 Think? – Sholto Douglas & Trenton Bricken - YouTube](https://youtu.be/64lXQP6cs5M?si=--Uw4WWe60M_zD2T)
	- Models solved intelligence problem in last 2 years. Next step is long-term agentic capabilities.
	- Where they struggle in agentic performance? Models can work on small, tightly-scoped task or long widely recognised boilerplate tasks seamlessly. Where they struggle right now is the exploration phase of a loosely-scoped, iteration-heavy task that requires multiple changes across the environment of the agent.
	- What happened with RL from last year? New kid on the block: RL with VR (Verifiable Rewards). RLHF has been the primary technique used to train these LLMs on human tasks. Verifiable Rewards work on scenarios where reward function is deterministic, and objective. While RLHF is analogous to a subjective response. Example: coding use case of unit tests passing, or completing a task on the web.
	- 
- [Overcoming India's technological cowardice](https://www.infinitesunrise.com/p/overcoming-indias-technological-cowardice)
	- Promise -> Despair -> Hope with a special emphasis on absolutely bizarre state of overregulation, administrative incompetence, and government underfunding.
	- How traditional family run businesses work in India: "Apply trade barriers for world-class companies outside India, create a low cost half-good copycat product for Indian consumers, sell to poverty stricken overburdened consumer, invest the profits in media entertainment to sell to the same exceedingly free and overstimulated viewer."
	- ISRO's death story hits much harder.
	- What are the deep tech sectors that need a world class Indian representative on the world stage?
		- Space: Agnikul, Pixxel, Skyroot
		- Autonomous Agents
		- Drones: [IG Drones](https://inc42.com/startups/ig-drones-meet-the-indian-startup-that-was-key-to-operation-sindoor/), DroneAcharya
		- Biotech: PopVax
		- Gaming/Entertainment: Nazzara
		- Semiconductor
		- Critical Minerals
		- Batteries
		- Energy
		- 
- [Fundamental Development Gap Map v1.0](https://www.gap-map.org/): List of unsolved gaps in R&D.

## Apr '25
- ["Welcome to the semantic apocalypse", Erik Hoel](https://www.theintrinsicperspective.com/p/welcome-to-the-semantic-apocalypse): *Semantic Satiety, Neural Fatigue*
	- "An oversupply that satiates us at a cultural level, until we become divorced from the semantic meaning and see only the cheap bones of its structure."
	- This is what's going to happen with art short-term, but I strongly believe this will also drive the value of original human-generated art a lot more, and it goes both ways.
	- Current GenAI models can't imitate an artist perfectly, and they don't need to. A normal human doesn't care about every little detail inside, and that will drive the value of original art towards an upward trajectory.
	- When these models do become better than Human at almost every task imaginable, art will be like Wabi-Sabi. We'll start to appreciate it's errors more, longing for that human touch.
	- Until then, enjoy the *"information superhighway"*.
- ["The halting problem"](https://busy-beavers.tigyog.app/the-halting-problem): Interactive tutorial on Turing's Halting problem based on [[undecidability|self-referential paradoxes]]. Revisit
- ["Understanding Solar Energy", Construction Physics](https://www.construction-physics.com/p/understanding-solar-energy), ["How Did Solar Power Get Cheap? Part I", Construction Physics](https://www.construction-physics.com/p/how-did-solar-power-get-cheap-part), ["Net Zero Roadmap: A Global Pathway to Keep the 1.5 °C Goal in Reach", iea](https://www.iea.org/reports/net-zero-roadmap-a-global-pathway-to-keep-the-15-0c-goal-in-reach): Revisit
	- Solar price is on a continuous downward trend
	- Efficiency is improving, maintenance cost is decreasing.
	- With each added storage capacity unit for residential usage, ROI decreases.
	- Biggest hurdle in harvesting solar power is irregular availability of raw power which depends on time, location, weather.
	- What's the maximum output power a Solar panel currently produce, with maximum irradiance?
	- What's the theoretical minimum Solar PV price per kWh can get?
- ["Agents", Chip Huyen](https://huyenchip.com/2025/01/07/agents.html): Revisit
	- *Agent* is anything that can perceive an environment and perform a set of meaningful actions to complete a goal.
- [Strongest hints yet of biological activity outside the solar system - YouTube](https://www.youtube.com/live/yc0757j2R8s): Very interesting finding of DiMethyl-Sulphide(DMS) on K12-8b exoplanet that's 128 light years away, with presence of other hydrocarbon like $CO_{2},CH_{4}$.
	- Is there no other planet with these characteristics? What are the characteristics of this exact planet? Can DMS be found due to other reasons? What's the half-life of DMS?
- ["How off-grid solar microgrids can power the AI race"](https://www.offgridai.us/) By [Kyle Baranko](https://x.com/kyle__cb) (Paces), [Duncan Campbell](https://x.com/duncan__c) (Scale Microgrids), [Zeke Hausfather](https://x.com/hausfath) (Stripe),  [James McWalter](https://x.com/james_mcwalter) (Paces), [Nan Ransohoff](https://x.com/nanransohoff) (Stripe)
	- What are microgrids? What are off-grid? What are their current costs? How much energy is needed today, by 2030, by 2050? Why is it not being deployed at large scale already? How are data-centers powered today? 
- ["VPN - a Very Precarious Narrative", Dennis Schubert](https://overengineer.dev/blog/2019/04/08/very-precarious-narrative/): VPNs for normal users are mostly a marketing gimmick to keep users scared about their personal identity, and does very little to actually protect the users.
	- Should mostly be used for accessing geolocked content, or internal private networks.
	- I want to read more about internals of Wireguard or OpenVPN
- ["How do you make a 250x better vaccine at 1/10 the cost? Develop it in India. (Soham Sankaran, Ep #2)", Owl Posting](https://www.youtube.com/watch?v=CHokQ5dMxHQ)
	- You can't ignore a locked-in cracked Indian founder in **biotech** space. It's a gem of a podcast.
	- TODO: write more notes.
- 

## Mar '25
- ["You and Your Research", Richard Hamming](https://gwern.net/doc/science/1986-hamming): Revisit
- ["A habit to make learning MUCH more fun and effective"](https://learnhowtolearn.org/a-habit-to-make-learning-much-more-fun-and-effective/), [dnbt777](https://learnhowtolearn.org/author/learnhowtolearn/): view of world as Rabbit hole makes learning so much easier. i also really like the way he's organising information through flowcharts, and diagrams.
- ["Digital Hygiene", Andrej Karpathy](https://karpathy.bearblog.dev/digital-hygiene/)
	- Things I use right now:
		- Brave for browsing and search with every adware (wallet, token, AI) disabled
		- Mullvad VPN
		- ProtonMail
		- Cloudfare DNS
		- Network Sniffer: [sniffnet](https://github.com/GyulyVGC/sniffnet)
	- Things I've yet to use
		- 1Password
		- YubiKey
		- Virtual Mails
- ["The 3 cognitive scripts that rule over your life | Full Interview", Anne-Laure Le Cunff](https://youtu.be/ubMghRYqk8o?si=haiSjcK53Zi4d6BF)
	- What does it mean to have cognitive overload?
	- What's my information diet?
	- What are the tiny experiments that i'm doing currently?
	- What are my current rabbit holes?
- ["The Impact of Generative AI on Critical Thinking", Microsoft Research](https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/lee_2025_ai_critical_thinking_survey.pdf): TL;DR question everything. having high confidence on GenAI responses signals low critical thinking. It works doesn't mean it's a good solution.
	- I've also noticed how I've personally started delegating most of the critical thinking tasks to an LLM, and copy-pasting the example, only to notice it's not working when given an error by the IDE.
## Feb'25
- ["Everyone knows your location: tracking myself down through in-app ads"](https://timsh.org/tracking-myself-down-through-in-app-ads/), [tim](https://timsh.org/author/tim/): this is beyond scary. Imagine the data owned by by big organisations, regarding your interests, financial capacity, relationships, geographic location. It's not just targeted ads, this ad-based economy has been influencing people already. Mega organisations have been accused of altering election outcomes, race hate, propagandist thinking several times now. It's supposed to end at some point, and I think the arrival of agents will solve that to an extent. Internet will become more AI friendly and less user friendly. Information will be hidden behind paid APIs
- [Will DeepSeek deep-six the US economy?](https://asiatimes.com/2025/02/will-deepseek-deep-six-the-us-economy/), by [Steve Hsu](https://asiatimes.com/author/steve-hsu/) and [David P Goldman](https://asiatimes.com/author/david-p-goldman-2/)
- ["The Generalist’s Productivity Stack", The Generalist](https://substack.com/home/post/p-156091567): Raycast's focus extension has done wonders for my focus. It fights that initial friction and agitation, and helps to avoid any and all distractions. 
	- ["Every productivity thought I've ever had, as concisely as possible"](https://guzey.com/productivity/), [Alexey Guzey](https://guzey.com/)
- ["MODERN-DAY ORACLES or BULLSHIT MACHINES?", Carl T. Bergstrom and Jevin D. West](https://thebullshitmachines.com/)
- ["Terence Tao on how we measure the cosmos | Part 1"](https://youtu.be/YdOXS_9_P4U?si=rjSBLzt1_Sqcx3gS): 3b1b goated content never ends. It really blew my mind that initial mathematical intuition began from asking simple questions and using logic + analysis to reach the answer. It didn't include any sophisticated mathematical equations, but very lengthy process of data collection, observation, and pattern matching through the series of unrelated dots that when connected gave the answer in plain sight.
- ["sparkly people and how to find them"](https://substack.com/home/post/p-106710027), [Anson Yu](https://substack.com/@anson): I haven't found many of these people, and most probably, that's due to my introvert nature. Personally, i have like 3 or 4 of these values. I've had to fight for many things to get to where I am, how I learn, and how i perceive things. I won't deny that it's not fun, but, not always. Understanding a field deeply, in order to have significant impact, takes time and effort, which you can't be expressed as having serendipitous fun.
- ["An Interactive Introduction to Fourier Transforms", Jez Swanson](https://www.jezzamon.com/fourier/)
- ["NEW SPACE" Frontier Film](https://youtu.be/eOlpKN7ZOTo?si=vaXcrEe5O-EAZCSp): "We're explorers, it's just how we're programmed, it's imbued in our genes."
	- ["Why Starship Matters", Casey Handmer](https://www.palladiummag.com/2025/02/14/why-starship-matters/)
	- I can't help but feel so much childlike wonder after watching this. We are going to accomplish these goals, because that's what humans do. We will form a nuclear-powered permanent base on Moon, and then Mars, along with a thriving civilization by the end of the century, or even before.
	- One another thing that is clear is it just doesn't matter if you have the perfect solution for a problem, Starship is the most brute-force approach for a space conveyor belt, but it's the best we have right now. We are obviously going to discover much better solution than this in the future, but you gotta start, and you gotta start **"now"**.
	- Pairing starship with Starlink satellites was the best outcome, anyone could've come up to bootstrap the space cargo economy.
- ["Speed matters", Jamie Brandon](https://www.scattered-thoughts.net/writing/speed-matters/): Moving faster in anything you do has many more indirect consequences. Spending a week trying to learn something, then spending another 2 weeks trying to make a demo out of it, sound cool. But thinking, how can I do it 10x faster, i.e. both of these in 2 days rather than 21 days saves much more time.
	- This is also along the idea of how to read a new research paper. I still read research papers every paragraph front and back. But that's just a massive waste of time. You just need to read the abstract to know you understand every word that the author is going to say in the paper, this means you skip any introduction and preliminaries, jump straight to actual result, and any evaluation or performance benchmarks. That's all it needs to read any kind of paper.
		- This arguably takes just 1 day for reading a 100-page paper, than 2 or 3 days to read every line and paragraph of it. It also gives your brain to think about the blanks after you've read it, it's like a hardass problem that you've now etched into your subconscious mind to ponder on.
		- I'm trying to learn this method more and more, and applying this with other orthogonal areas can really speed up the process of learning a new thing.
	- Similarly with coding, I think i spend 100x more time trying to find a good solution rather than just code the brute force approach, test it out, and improve later. Testing really gives your brain time to think of each step you wrote, why it's there, can it be improved, or removed entirely.
- ["50 Years of Travel Tips", Kevin Kelly](https://kk.org/thetechnium/50-years-of-travel-tips/): all of these are really good tips.
## Jan'25
- ["Putting Ideas into Words", Paul Graham](https://paulgraham.com/words.html): Writing thoughts and ideas down formally (heck, even informally) is one of the most therapeutical thing one can do. It's not easy, you start to uncover many flaws in your understanding. What seemed like a 1500 line essay turns into a 200 line, scattered, unfinished, mostly factually or logically incorrect think train. But, that doesn't mean you stop writing. It's the only way I know to slow down my thoughts, and to move them from working memory to long term memory. And it's not just words, you can do the same thing with code, drawing, cooking. To put more precisely, actually building something physically.
- ["Privacy guides"](https://www.privacyguides.org/): Extensive list of privacy guides for browsers, DNS, VPN, cloud providers, etc. Highly recommended.
- ["Machines of Loving Grace", Dario Amodei](https://darioamodei.com/machines-of-loving-grace): 5/5. well-explained 10K ft view of what AGI will and won't do. Most of the article can be summarised as being a lengthy discussion on human processes, which might be all true. AGI's, according to me, will be considered useful, if it can design processes far more efficient, creative and organised than the human counterparts that are mostly riddled with bureaucratic administrative problems. Easy way of estimating what AGI can achieve is to imagine *100* parallel researchers, working on different problems in different domain, but with same accuracy. With speed and efficiency, will also come reduced cost of deployment, and thus, ultimately benefitting humanity with low-cost, accurate, and efficient **end products**. These products can be substituted with anything: medicines, drugs, therapy. Revisit
	- ["All Watched over by Machines of Loving Grace", Richard Braughtton](https://jgc.org/awobmolg-1967.pdf)
	- Is it possible for AI to reduce economic disparity within a society, and internationally? If yes, what's the path forward? How do we reduce the constraints set by humans? 
	- How to use that extra intelligence in reducing the per capita income gap of developing vs developed countries?
	- Reduce poverty -> reduce corruption.  Goal of every government across nation boundaries should be to lift the economically backward section of your society to a point where it has access to cheap education, healthcare, household.
	- What's the threshold for BPL in India? How much families have been thrived out of BPL in last 5 years? What were the major regions where these families are located?
	- 
- ["Beyond nature and nurture"](https://davidbessis.substack.com/p/beyond-nature-and-nurture), [David Bessis](https://substack.com/@davidbessis): I think it's disrespectful to label someone as untouchable *geniuses*. There are obviously, people whose mathematical intuition, and imagination is much more capable and develop at an early age, and there are also people who invest every second of their life to reach that step. I personally, like and do mathematics for the problem solving. There are no shortcuts in enjoying it, you have to get your hands and mind dirty.
- ["Things unlearned", Jamie Brandon](https://www.scattered-thoughts.net/writing/things-unlearned/): Good list of things that worked for a person doing programming for 10 years. Most of the advice is reoccurring in retrospective pieces that we see flying around a niche part of the internet. Problem solving, intelligence over expertise, mathematical foundations, High leverage options, better time management. I think everyone knows that these are the steps one need to take, it's the execution that's difficult. Discipline is what's most needed here.
- ["my phone is making me dumb"](https://read.mindmine.xyz/p/dumb), [Isabel](https://substack.com/@mindmine): Yes, and a whole lot yes. You know this is true, yet you can't escape the tentacles of the giant squid that the algorithm has become.
- ["Reading as a creative act", Bits of Wonder](https://www.bitsofwonder.co/p/reading-as-a-creative-act): This is solid advice that is applicable to almost all form of entertainment consumption. Textbooks, fiction or non-fiction books, videos, music, even short form content like essays, or reels. All of these need to be consumed with much greater friction, i.e. each should have some questions that it answered, or created new ones, or helped clear doubts, or helped formed new beliefs. Otherwise, we're all hamsters on a wheel. I'm also guilty of doing passive reading, even when learning through textbooks. I'm too focused on completing a lecture, or finishing a book, instead of completely understanding what the material wants to convey. 
	- I think the solution is to have a list of questions that you want answered from the text, form new questions as you go through it, set of questions that the text was able to answer.
- ["Future of Energy Reading list", Casey Handmer](https://caseyhandmer.wordpress.com/2023/10/19/future-of-energy-reading-list/): TODO
- ["Life Lessons from the First Half-Century of My Career", David A. Patterson](https://cacm.acm.org/opinion/life-lessons-from-the-first-half-century-of-my-career/): some that i'm practicing still:
	- "Most of us spend too much time on what is urgent and not enough time on what is important." - I'm really horrible at time management, and works on anything that I find interesting. While this sounds good, but is really sketchy in practice. For example, while reading a research paper, when stuck on a problem, i'll distract myself with household chores, that leads to me wasting 2-3 hours, making me run in circles with the initial hard problem that I left.
	- "Look for the positive opportunities." - I'm a really negative person, confidence comes hard to me. I've recently just seen that just labelling a task as *easy* or *doable in x days* can decrease the complexity by significant amount. Having amazing people around you to ask for help always helps, but in the end, any task has to be completed by you. So, look for those positive opportunities in a project, and double down without ever looking back. Obviously, retrospect later.
- ["I Ditched the Algorithm for RSS—and You Should Too", Joey Hand](https://joeyehand.com/blog/2025/01/15/i-ditched-the-algorithm-for-rssand-you-should-too/): trying to set up nice RSS, and move over completely from algorithm based timelines.

## Dec'24

- ["Always Measure One Level Deeper", John Ousterhout](https://cacm.acm.org/research/always-measure-one-level-deeper/)
- [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/)
- ["How to Learn the Socratic Method And where to begin using philosophy for self-improvement", Donald J. Robertson](https://medium.com/stoicism-philosophy-as-a-way-of-life/how-to-learn-the-socratic-method-e7ef7da4290c)
- ["Modern Hardware for Future Databases", ](https://transactional.blog/blog/2024-modern-database-hardware)
- ["We've been wrong about math for 2300 years", David Bessis](https://davidbessis.substack.com/p/weve-been-wrong-about-math-for-2300)
	- ["Mathematical Thinking Isn’t What You Think It Is", Kelsey Houston-Edwards](https://www.quantamagazine.org/mathematical-thinking-isnt-what-you-think-it-is-20241118/)
- ["Pseudomonarchia jemallocum"](https://phrack.org/issues/68/10.html)
- ["MALLOC DES-MALEFICARUM", blackngel](https://phrack.org/issues/66/10.html)
- ["China has become a scientific superpower", The Economist](https://archive.is/PKkwN)
- ["Why Can't We Make Simple Software?" - Peter van Hardenberg](https://www.youtube.com/watch?v=czzAVuVz7u4)
- ["Notes on the Tao Te Ching", Michael Nielsen](https://michaelnotebook.com/tao/index.html)
- ["Law of Leaky Abstraction", Joel Spolsky](https://www.laws-of-software.com/laws/leaky-astractions/)
- ["The Architecture of Open Source Applications (Volume 1) BerkleyDB", Margo Seltzer and Keith Bostic](https://aosabook.org/en/v1/bdb.html)
- ["Global renewables: Pioneering the energy transition", DW Documentary](https://youtu.be/UVf2Yw7uFoE?si=7PdbdPgs8Q1duPEd)
- ["The age of average", Alex Murrell](https://www.alexmurrell.co.uk/articles/the-age-of-average): Agree with this in some sense. Observed that all of the images he presented in the article are beautiful. So, it's natural to get attracted towards a beautiful thing. What really comes out is, there's lack of creativity in people. 
- ["The Intellectual Obesity Crisis", Gurwinder](https://open.substack.com/pub/gurwinder/p/the-intellectual-obesity-crisis): Kinda mehh, not really that meaningful. I think it's just an evolutionary process, which the society will go through before AI agents take over the internet. Everyone obviously knows how much they're putting themselves at risk with ingesting content at a rate not meant for the brain to handle. You have to start living a more subtractionary life, start over-optimising on things that are worth your time, and just throwing away the things that are not. Start setting more strict rules regarding social media usage, health goals, etc. I can go on and on, not worth it again.
- ["Explorables"](https://explorabl.es/)
	- [Simon Willison tags](https://simonwillison.net/tags/explorables/)
	- [r/Explorables subreddit](https://www.reddit.com/r/explorables/)
	- ["Moon", Bartosz Ciechanowski](https://ciechanow.ski/moon/)
- ["the divine discontent", Celine Nguyen](https://www.personalcanon.com/p/the-divine-discontent)
- ["Cognitive load is what matters", zakirullin](https://minds.md/zakirullin/cognitive#long)
- 

## Nov '24

- ["Tips on mathematical writing", Tom Leinster](https://www.maths.ed.ac.uk/~tl/tips.pdf)
- [Facebook's Red book](https://drive.google.com/file/d/1TZYqdFOXkZZPpMJx_16YBFkw-jaPbxiS/view)

## Oct '24

- [Art of attention](https://billwear.github.io/art-of-attention.html)
- [Register Spill, "How I use git"](https://registerspill.thorstenball.com/p/how-i-use-git)
- [Andy Matuschak, “Why books don’t work”](https://andymatuschak.org/books/)
- [Thorsten Bell, "Rust prism"](https://registerspill.thorstenball.com/p/rust-prism)

## September 2024
- [Paul Graham, "Founder Mode"](https://www.paulgraham.com/foundermode.html)
- [What Does It Really Mean to Learn?](https://www.newyorker.com/culture/open-questions/what-does-it-really-mean-to-learn)

## August 2024
- [Why We Can't Have Nice Software](https://andrewkelley.me/post/why-we-cant-have-nice-software.html)
- [Perceived Age](https://suryad.com/blog/percieved-age/)
- [some principles for building an r&d organisation](https://alexobadia.com/(ツ)/blog/some+principles+for+building+an+r%26d+organisation)
- [Exit the supersensorium](https://www.theintrinsicperspective.com/p/exit-the-supersensorium)
- [What Is Analog Computing?](https://www.quantamagazine.org/what-is-analog-computing-20240802/) 
- [Attention is your scarcest resource](https://www.benkuhn.net/attention/)
- [Phrack Inc., Breaking The Spell](https://phrack.org/issues/71/1.html)
- [What life means to Einstein](https://www.saturdayeveningpost.com/wp-content/uploads/satevepost/what_life_means_to_einstein.pdf)
- [Reflections on Trusting Trust by Ken Thompson](https://dl.acm.org/doi/pdf/10.1145/358198.358210)
- [How to be a Truth Detective - Tim Harford](https://youtu.be/vgy6fleG-RI?si=h9G1lajz9JSdFZJ5)
- [On learning deeply](https://adamdhalla.medium.com/on-learning-deeply-7efd9a4284a8)


## July 2024
- [Lukas Murdock's website](https://lukasmurdock.com/): Treasure trove of good links
- [Tropical Forests in Big Trouble](https://nautil.us/tropical-forests-in-big-trouble-499544/?)
- [PG: Right kind of Stubborn](https://paulgraham.com/persistence.html)
- [How to Learn Hardware – Casey Handmer's blog](https://caseyhandmer.wordpress.com/2024/06/08/how-to-learn-hardware/)

## June 2024
- [Developing the training mindset in fighting games | by Patrick Miller | Medium](https://pattheflip.medium.com/developing-the-training-mindset-in-fighting-games-2c0d167adcb5)
- [What’s the greatest line you’ve ever read in any book?](https://x.com/DylanoA4/status/1794037247286579264)



