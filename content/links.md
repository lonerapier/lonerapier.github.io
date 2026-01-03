---
title: "Things on Internet that I don't want to forget"
tags:
- exploring
- seed
---

Other links:
- [[technical-links]]

## Jan '26


## Dec '25
- [LoganThrasherCollins.com](https://logancollinsblog.com/): What an awesome person to follow. I'll surely be checking out his guide to biology.
	- [Want to learn biology? Recommended texts from beginner to advanced \| LoganThrasherCollins.com](https://logancollinsblog.com/2020/11/27/want-to-learn-biology-recommended-texts-from-beginner-to-advanced/)
- [Before They Hatch - by Robert Yaman - Asimov Press](https://substack.com/home/post/p-147624656)
	- The numbers written here are absolutely wild.
		- "Poultry accounts for [96 percent](https://ourworldindata.org/grapher/animals-slaughtered-for-meat?country=~USA) of land animals eaten by Americans".
		- "Some poultry facilities in the U.S. house over five million chickens".
		- "we slaughter more than 80 billion land animals annually and catch and kill [one trillion fish](https://ourworldindata.org/explorers/animal-welfare?facet=none&country=~OWID_WRL&Metric=Animals+slaughtered&Animal=Wild-caught+fish&Per+person=false)."
		- "Every two years, more [chickens are slaughtered](https://ourworldindata.org/grapher/animals-slaughtered-for-meat?facet=none&) than the [number of humans that have ever lived](https://www.prb.org/articles/how-many-people-have-ever-lived-on-earth/)."
		- "[20 million chickens](https://www.theguardian.com/environment/2022/jun/15/more-than-20-million-farm-animals-die-on-way-to-abattoir-in-us-every-year) die during transport each year in the United States."
	- In-Ovo sexing: Most beneficial technology in terms of animal welfare and poultry automation for the future. Determining the sex of the egg in embryonic stages, and combining it with in-ovo vaccination means no more maceration, and much better hatchery process efficiency.
		- How much does each solution cost per million eggs? How fast is it?
		- MRI
		- PCR
		- Mass spectrometry
		- Gene-edited eggs: Halt development for male eggs by layers by using, say, blue light.
	- On-farm hatching: Use of autonomous robotics here would increase the efficiency and reduce the cost by multiple factors.
	- In-Ovo vaccination: Already considered at advanced stages of development.
	- One stupid question that I have: Can sexing not be done pre-egg laying period? Can we not perform some kind of gene editing on the mother to prevent even laying male eggs for layers?
- [From systems operators to systems architects](https://seemay.substack.com/cp/170799845): PDB contained enough structural information about proteins to make a model recognise the pattern behind static structure. But proteins have their functions embedded inside the motion (travelling, binding, catalyzing, breathing?). To get more informative data, the next problem is to go from static structure prediction to protein dynamics.
	- What are protein conformations? Most probably these are the signals emitted by proteins during their identification.
	- How is X-Ray crystallography used for protein conformation? What are it's other uses?
	- What is the data that is discarded during X-Ray crystallography? And how can it be used to create richer molecular data? Why haven't this been done already?
	- What data does diffuse scattering emit? And how can that be analysed and used for PDB 2.0?

## Nov '25

- [On AI Infrastructure in Biology - by Elliot Hershberg](https://centuryofbio.com/p/infra)
	- What technology led to large-scale changes in biology:
		- NGS: unlocked functional genomics, 
- [The Dropout Curriculum](https://engineeringx.substack.com/p/the-dropout-curriculum)
	- Maths, Physics, Computing and Chemistry seems to be the bare-minimum. Still before tackling a problem, understanding the fundamentals will make you stronger.

## Oct '25
- ["Too much Tacit Knowledge", Keoni Gandall](https://keonigandall.com/posts/too_much_tacit.html)
	- [Synbio25 - A man thinks about building biology: Chapter 3](https://synbio25.com/#chapter3): Extended version of above post.
	- Need for protocol standardisation is eerily needed in biological experiments.
	- Reproducible experiments opens the pathway for abstractions, and open scientific access.
	- This is completely opposite of what happens in computer science or cryptography, where every result can be independently verified by anybody.
	- What are the experiments that are already standardised? and what are the ones that need to be?
	- Being a beginner in biology, does that mean the scientific papers are required to provide sufficient experimental evidence and steps to reproduce the result?
	- What were the defining moments that made software reproducible and verifiable? Git, compilers, cryptography, virtualization.
- ["Hilbert's Power"](https://fi-le.net/hilbert), [The Fiefdom of Files](https://fi-le.net/): It's wild to understand how each of hilbert's list of [unsolved problems](https://www.simonsfoundation.org/2020/05/06/hilberts-problems-23-and-math/) led to a different branch of mathematics. It's equivalent of *nerdsnipes* of today. 
	- [*Entscheidungsproblem*](https://en.wikipedia.org/wiki/Entscheidungsproblem) led to turing discovering lambda calculus, and computation which underpins the computer science of today.
	- Hilbert's second problems led Gödel to his [[undecidability|Incompleteness]] theorems.
- ["Why Today’s Humanoids Won’t Learn Dexterity", Rodney Brooks](https://rodneybrooks.com/why-todays-humanoids-wont-learn-dexterity/)
	- TODO write takeaways.
- [OpenZL: An open source format-aware compression framework \| Hacker News](https://news.ycombinator.com/item?id=45492803)
	- [How lossless compression works](https://alvinwan.com/how-lossless-compression-works/)
	- Archivers vs compressors
		- Archive: tar, rar, 7z, iso, dmg. Bundle packages together along with metadata into single file, often used alongside compressors to compress redundancy.
		- Compressors: bzip2, gzip, zstd. Remove redundant data from a file to reduce storage size.
	- Compression:
		- Lossy: JPEG, WebP, AVIF, MPEG, H264, AAC, log compression, downsampling, model quantization
		- Lossless: encoder/decoders, statistical, dictionary, run-length, predictive, BWT (Burrows-Wheeler Transform), delta, Huffman. Used in zstd, zip, FLAC, 
	- Lossless compression encoders
		- RLE: Run-length encoding. Compresses "HELLO HELLO HELLO" to "HELLO 3".
		- Length-distance pair: store reference to previous values. "HELLOMISTERGOBACK HELLOMISTER GOBACK MISTER" becomes "HELLOMISTERGOBACK B18R11 B19R6 B32R6", reduces 46 bytes to 26 bytes.
			- LZ77
		- Sliding window: in order to reduce memory explosion, encodings are usually performed over a fixed sliding window to find encoding patterns.
- [rsrch space](https://rsrch.space/): Cool list of computer science related links.
- [Import AI 431: Technological Optimism and Appropriate Fear](https://importai.substack.com/p/import-ai-431-technological-optimism)
- [Mid-scale Science — Renaissance Philanthropy – A brighter future for all through science, technology, and innovation](https://www.renaissancephilanthropy.org/playbooks/mid-scale-science)
- ["What Biology Can Learn from Physics", Asimov Press](https://www.asimov.press/p/biology-physics): Physics experiments have always been mega-scale surpassing billions of dollars in expenditure, comprising of 100, maybe 1000s, of practitioners coming together to complete. Biology has not seen experiments at this scale, with the exception of Whole Genomic Sequencing project.
	- Lack of large scale experiments in biology can be blamed on lack of predictable models. Not having the knowledge of end state conclusion from the experiment leads to many failed attempts.
	- AlphaFold2, 3 changed that with the sequence prediction capability, and was only made possible due to contribution of lifelong researches from tens of thousands of crystallographers that made the outcome of their research available in public datasets.
	- 
- [Edward Boyden, Adam Marblestone. "Architecting Discovery: A Model for How Engineers Can Help Invent Tools for Neuroscience - ScienceDirect"](https://www.sciencedirect.com/science/article/pii/S0896627319302867)

## Sep '25
- TIL, greek yogurt's translation is hung curd. Note to self, question everything.
	- [Probiotic potential of lactic acid bacteria present in home made curd in southern India - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4248380/)
	- [Probiotic curd as antibacterial agent against pathogens causing oral deformities – in vitro microbiological study - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC9926605/)
- ["Using spaced repetition systems to see through a piece of mathematics", Michael Nielsen](https://cognitivemedium.com/srs-mathematics): I'm still a complete beginner in [[mathematics|mathematics]] but this is one piece of advice that I want to apply with my mathematical learning: Obsessing over a problem to the point that the representation escapes the physical or abstract boundaries of the mind, and you begin to understand the question in an even deeper manner.
	- My thought process after I see any problem right now is almost similar to the one described in this [3b1b video](https://youtu.be/4NlrfOl0l8U?si=ZXXODp08d23jqmyP). Through theory you've learnt some facts, through past problems you begin to form algebraic reasoning, and auxiliary connections that help you form the arbitrary mathematical structures needed to solve that problem.
		- Although I struggle with the third step a lot. Often times leaving the proof midway due to lack of second-order thinking.
	- But there's so many ways of enhancing your experience with problems that I haven't even started exploring.
	- Questions that I'm not asking, multiple ways of expressing the problem and its solution, generalising the theorem even more.
	- Pre-written problems and textbooks and courses equip you with tools, but open-ended exploration is still needed to create those abstractions and new connections.
	- Learning mathematics imho teaches you to ask the right questions, questions that scratches your creativity with abstract concepts, questions that beget insights, insights that promise to take you the end, but instead abandons you at another unknown. Many of these lead to nowhere, or are just incomplete, or are plain incorrect. But that's part of what makes learning maths beautiful. 
- ["The Multidisciplinary Approach to Thinking", Peter Kaufman](https://fs.blog/great-talks/multidisciplinary-approach-thinking-peter-kaufman/)
	- Trying to combine a new field with something that you're expert at, is the easiest way to understand any new hard thing.
	- You're going to ask question no one is asking, and seeing through a lens only a little few has access to.
	- 
- [From cleaning bathrooms to raising $3.1M for a cancer prevention startup](https://www.communitymorgue.com/p/from-cleaning-bathrooms-to-raising)
- [500'000€ Prize for Compressing Human Knowledge](http://prize.hutter1.net/): prize for compressing 1GB file. current record 120MB,
- [I should have loved Biology, James Somers](https://jsomers.net/i-should-have-loved-biology/)
	- How do you freeze a cell? what's the temperature at which the function of the cell stops? How does it stop? Does it pause, and can it be resumed? If it can be resumed, does it restart or continue where it froze?
	- RNA sequencing?
- [Francis Crick Was Misunderstood - Asimov Press](https://www.asimov.press/p/crick)
	- What's the example of DNA -> protein?
	- What's the example of reverse transcriptase, i.e. RNA -> DNA?
	- Prion diseases? what are they, and how does information flow out of protein?
	- how does methylation work?
	- somatic cells?
- [What does AI progress mean for medical progress?](https://blog.jacobtrefethen.com/ai-progress-medical-progress/)
	- we'll soon understand human biology 
- [OneZoom Tree of Life Explorer](https://www.onezoom.org/): What an awesome resource to sneak peek into the wonderful circus that the life on earth is.
- [All Roads Lead to Rome: The Machine Learning Job Market in 2022 \| Eric Jang](https://evjang.com/2022/04/25/rome.html)
	- Some timeless advice in there.
	- Current technological shift is beyond what we've seen in our lifetime, and will generate gains for humanity far more than what we could've imagined a decade back.
	- As an individual, you really have to ask the question, what do I want to spend the most productive years on? But with one thought at the back of your mind, that probing a problem deeper and deeper more or less leads to the same destination.
	- Is it tackling a current customer problem, or researching a completely new way of designing recursively self-improving probabilistic stochastic models?
	- Is it going to be working in mathematics, biology, robotics, high-precision manufacturing, material science, physics, space, cryptography?
	- Do a thought experiment, and pick any of the above field, and with a little pondering, you'll find yourself combining all of the above tools to solve humanity's biggest problems.
	- Our future is going to be increasingly multidisciplinary. We already have found ways to program most of our environment.
	- Question on my mind right now, Is doing a PhD the right move? If i do want to complete a PhD, what problems am I most excited about?
	- Prerequisites: Undergrad level maths, AI/ML, high-performance computing.
		- These three have become the bare-minimum you expect from anyone who's showing willingness of contribution to your project.
	- What I'm good at: Backend, Cryptography/Security.

## Aug '25
- [MIT's](http://www.mit.edu/) [Center for Bits and Atoms](https://cba.mit.edu/classes/index.html): What a treasure trove of knowledge. Wow.
- [Historical Tech Tree](https://www.historicaltechtree.com/): Who even think of creating such an amazing thing. I can't stop reading it. Endless rabbit hole to understand how humanity has progressed since the dawn of time.
	- [Learning to learn from inventions: electrophoresis, PCR, Sanger sequencing — lada nuzhna](https://www.ladanuzhna.xyz/writing/inventing-biology): On similar note as above page, but goes deep into Biology inventions.
- [Feynman's Talk](https://www.zyvex.com/nanotech/feynman.html): Arguably his most controversial, but practically useful talk. I can't imagine how visionary these guys must be to predict the details of a technology a century before it's existence.
- [Robotics Levels of Autonomy – SemiAnalysis](https://semianalysis.com/2025/07/30/robotics-levels-of-autonomy/): Good, maybe incomplete, survey of levels of robotic autonomy that's useful across different tasks in the actual world.
	- L0: Industrial revolution, gears, actuators, sensors, machines operated by Humans.
	- L1: Scripted programmable highly accurate machines without human oversight.
	- L2: Intelligent, less agentic, weakly generalizable, manipulative machines.
	- L3: Intelligent, agentic, scene understanding and planning, agile machines. Basically machines that can do human level work cheap.
	- L4: Fast, agile, cheap, intelligent, machines that can do beyond human level work at a fraction (say 1/10 or even 1/100th) of cost.
	- L5: self-evolving, healing, machines.
	- Interesting points:
		- Most L2 currently uses AprilTags, QR codes, visual cues across the environment to guide the robot.
		- What's SOTA in scene analysis and understanding currently?
		- Foundational models (multimodal capabilities) unlocked L2 and L3's path to production. What's current challenges?
			- AllenAi's MolmoAct, Deepmind's [], Nvidia [], 
		- Simulators like Nvidia Issac Sim is an interesting way to train foundational models and generate synthetic training data.
	- What's the bottleneck to gain 10x speed? Some tasks (like cooking) are limited by time, but we're still seeing more than 20x difference in expert human and robot timings for task completion. Is it hardware, software, training data, physics?
	- What are the hardware boosts needed to make efficiency 10x better? Can we design more efficient Cameras, Sensors, LiDAR, Batteries, Actuators?

## Jul '25
- [There Are No New Ideas in AI… Only New Datasets](https://blog.jxmo.io/p/there-are-no-new-ideas-in-ai-only)
	- **"DNN -> Transformer -> RLHF -> Reasoning"**
	- Is [The Bitter Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) really true for all kind of AI based architecture? Is scaling and massive computation all we need to unlock new general solutions from these models?
	- Can you create a BERT-like model by using something other than a transformer?
	- Is it mostly data problem, where new solutions can only be found when we have ample data points about a problem, like simulating a virtual cell?
	- Is video learning through youtube the next big thing in robotics?  
- [Superintelligence from first principles - Jack Morris](https://blog.jxmo.io/p/superintelligence-from-first-principles)
	- AI playing Games
	- AGI is performing any human tasks accurately.
	- pre-ASI is predicting a human's thought and action perfectly.
- [How to Fix Your Context \| Drew Breunig](https://www.dbreunig.com/2025/06/26/how-to-fix-your-context.html): Excellent post on "Context Engineering" that is more useful than anything these days.
- [Methane Pollution Has Cheap, Effective Solutions That Aren’t Being Used \| WIRED](https://www.wired.com/story/cheap-and-effective-ways-to-cut-methane-pollution-arent-being-used/)
- [N-Back Test - Free Online Working Memory Training \| N-Back.net](https://n-back.net/): Who doesn't love short fun games
	- 1-back: 100%
	- 2-back: 95%
	- 3-back: 80% 
	- dual-N-back: 50%
- ["our universe is pretty rare in configuration space", rpoo](https://x.com/rpoo/status/1941359358258053411)
	- [An anthropic universe? - BRETT HALL](https://www.bretthall.org/an-anthropic-universe.html)
	- TODO: get answer on why certain constants have that particular value? Till what point are they configurable? I think this is the answer to identifying where to look for life?
	- Is earth really the only place in whole universe to sustain life? Are we this early? or there were civilizations before us, and were just wiped out? or will there be a chance of civilization after us? Are we the creators of that civilization?
	- Even more interesting question is the existence of many universes with different configuration?
- ["Welcome to the Era of Experience", David Silver, Richard S. Sutton](https://storage.googleapis.com/deepmind-media/Era-of-Experience%20/The%20Era%20of%20Experience%20Paper.pdf)
	- Video edition: [The Era of Experience & The Age of Design: Richard S. Sutton, Upper Bound 2025 - YouTube](https://www.youtube.com/watch?v=FLOL2f4iHKA)
	- [The Era of Exploration \| Yiding's blog](https://yidingjiang.github.io/blog/post/exploration/)
	- LLMs as next token predictors are no different than man's ultimate magical creation. They're nowhere close to humans. Human memory consists of patches of "experiences" that associates with multitudes of emotions.
	- Will an artificial superintelligent model need to mimic human intelligence? Is massive compute + human brain architecture the answer to unlocking intelligence too cheap to meter?
	- If all meaningful data is "exhausted" for these gluttonous models, does real world physics become the next milestone?
	- Human experience in a nutshell depends upon generalisation. Both quality and quantity of experiences leads to better generalisation capability of the mind.
		- Where does the generalisation capability of mind originate from?
		- Is generalisation just another form of encoding and compressing memories into a long series of to-be connected dots?
	- RL is a good approximation of exploration + reinforce analogy.
		- MoE models (almost all reasoning models: Gemini 2.5, OpenAI o3, Claude Sonnet 4) all are RL post-trained to sound more human-like.
		- Pre-training consists of making the model fat by giving it all high-quality data present in our world and training it on next-word prediction on the series of the tokes it's being trained on.
	- Agent's intelligence index depends directly on generating "high-quality" trajectories, i.e. small trajectories, one of which contains the correct answer to the problem. This is the "Exploration" phase of agent's reasoning.
		- Exploration depends directly on knowledge. That's why the pretraining phase is important, and eventually leads to small model distillation.
		- But then pretraining also becomes the limitation on what model can think. Lower bound on the number of episodes possible at any given state is directly proportional to current state (which can be every possible text prefix) to next action (which can also be every possible text suffix).
	- How RL is done right now? It's actually a constrained version of Supervised Learning.
		- In Supervised learning, agent is given the answer in a boolean in one-shot. But in RL, agent has to find its way towards the current answer navigating the environment it's in, with very limited external stimulus.
		- Agent is trained on various environments that have verifiable reward to nudge the model towards the correct answer. But availability of having such an environment in real world tasks becomes a constraint on model's extrapolation capability.
	- Where RL is constrained on current strategies?
		- Benchmark that's most important is testing whether model's generalisation works on entirely novel environments.
		- "The way we do exploration with LLMs today is fairly simple, typically limited to sampling from the model’s autoregressive distribution with tweaks to temperature or entropy bonus".
			- TODO: didn't understand this.
	- How to scale exploration?
		- World sampling: Agent decides where to go and start learning.
			- This becomes the "data problem". Designing appropriate environments (math puzzle, games, coding problem) to train the model on, and then giving a new problem in the same environment to test agent's learning.
			- Path to exploration lies directly in choosing what environment can give maximal learning transfer to the agent without sacrificing precious compute.
		- Path sampling: Agent deciding what and how to learn once its at correct world. This means what trajectories to use for collecting maximally efficient data depending on the problem and the environment. This can include: curiosity driven policies, random walks, fudgy search, tree search, tool-use.
			- So, Path sampling essentially is an algorithmic problem. Giving the agent capabilities to understand and distill a problem and it's environment.
			- It's relatively straightforward on tasks that we already know how to solve, but for environments that are completely novel to humans are the true test for coming set of models. I agree that end goal of path sampling is to output a computationally efficient approximation of the problem, what tools will the agent need to get the end, is not entirely clear.
		- Supervised to Reinforcement learning travels on this trade-off line between world sampling to path sampling.
		- But RL is much more time consuming because information bits per flop is much less. A random trajectory will contain almost invaluable useful information, and results in wasting precious flops. So, the tradeoff becomes choosing between sampling more worlds to explore, or spending flops in *thinking* about how to sample next trajectory.
	- Conclusion: Current set of LLMs are very good, like superhumanly good at navigating a search based task. A necessary objective of a superintelligence is to derive novel science, and that includes designing maximum transfer learning worlds and maximally efficient (useful information per flop) paths.
- ["How do people get new ideas",  Isaac Asimov](https://www.technologyreview.com/2014/10/20/169899/isaac-asimov-asks-how-do-people-get-new-ideas/): Unconventional thinking, meeting similar minds, accepting foolishness, creating more, reading more.
- [Asymmetry of verification and verifier’s law — Jason Wei](https://www.jasonwei.net/blog/asymmetry-of-verification-and-verifiers-law)
	- [Verifiability is the Limit](https://alperenkeles.com/posts/verifiability-is-the-limit/)
	- Agents will be bottlenecked by their environments verifiability.
	- GUI, Coding, Physical tasks are top of the chart on verifiable tasks, while Art, Literature isn't.
	- It's really hard to determine 
- ["The “Energularity”, José Luis Cordeiro](https://cesd.az/new/wp-content/uploads/2013/05/CordeiroEnergularity2013_Paper.pdf)
- [LLM Engineer's Almanac - Advisor \| Modal](https://modal.com/llm-almanac/advisor)
	- How to benchmark different open source LLM engines to run open source LLMs on "light-speed".
- ["Reward is enough", David Silver, Satinder Singh, Doina Precup, Richard S. Sutton](https://www.sciencedirect.com/science/article/pii/S0004370221000862?via%3Dihub#:~:text=https%3A//doi.org/10.1016/j.artint.2021.103535)
	- 
- [How to scale RL to 10^26 FLOPs - by Jack Morris](https://blog.jxmo.io/p/how-to-scale-rl-to-1026-flops): Jack's essays lays out the recent ideas in AI perfectly. Highly recommended read to anyone trying to understand what's going on.
	- 
- [Superintelligence from first principles - by Jack Morris](https://blog.jxmo.io/p/superintelligence-from-first-principles)
	- Will the underlying architecture use transformers?
	- Is the reward function going to be optimised using RL? is it going to be self-supervised learning?
	- Is it going to be trained on text or multimodal?
	- 

## Jun '25
- ["The Grugbrained CEO", Sam Rodriques](https://www.sam-rodriques.com/post/the-grugbrained-ceo)
- [Prakash Lab](https://prakashlab.stanford.edu/): This is a completely different and probably more humane proposition to academia that I actually like and prefer. Enabling and inspiring people all over the world with affordable tools with puzzles to solve. Real world example of curiosity driven science.
	- [How Paradoxical Questions and Simple Wonder Lead to Great Science \| Quanta Magazine](https://www.quantamagazine.org/how-paradoxical-questions-and-simple-wonder-lead-to-great-science-20250528/)
	- [Recreational Biology: Topological Puzzles at Cellular Scales - Manu Prakash - YouTube](https://www.youtube.com/watch?v=9k1AUuKoy3w)
- [Spatial technologies of the future - by Zack Chiang](https://cellularalchemy.substack.com/p/spatial-technologies-of-the-future)
	- understand how microscope evolved over the course of history.
	- Map and Sequence.
	- Mapping (Microscopy) allows to visualise the intricacies of a complex environment. Accurate position of subcomponents of the structure. Maps enable eyes to see what's happening inside.
	- Sequencing allows to understand the relationship between different components of the structure. How everything relates to each other, what complex processes defines the environment, what functions are encoded inside the sequence that enables the organism's function as a whole.
	- DNA genome sequencing went from $2.5B in its first attempt to under $500 in 2024, and will continue to go even under $100. That means, anyone can listen to life's harmony in real time.
	- Deep Learning is the technique that has led the astronomical explosion of discoveries, and novel ideas in microscopy (to analyze more and more images), and sequencing (to validate our hypothesis about cells, and its multitude of modalities).
	- *"Cellular Cartography"* is a new work coined to combine both microscopy and sequencing to better understand the information provided by both the tools.
	- Cell sequencing:
		- Extract and amplify the DNA
		- load the amplified DNA onto a flowcell (surface containing billions of evenly-spaced nanowells)
		- Flowcell goes into a sequencer, that performs successive rounds of four color imaging.
		- Each color corresponds to DNA molecule (ACGT)
		- Inversion problem: Sequencing is actually *simplified microscopy*.
	- TODO
- [Why I have slightly longer timelines than some of my guests](https://www.dwarkesh.com/p/timelines-june-2025), [AGI Is Not Multimodal](https://thegradient.pub/agi-is-not-multimodal/): I agree with a lot of what's said here:
	- "the fundamental problem is that LLMs don’t get better over time the way a human would.": Have been feeling this firsthand while trying to work with browser-use. Currently the only way to make an agent learn on-the-fly is to engineer prompts really carefully. Humans don't need that.
	- Scaling laws are kinda dead.
		- Current Llama maverick runs on 400B parameters that probably need 1000s of GPUs to work. All smaller models (~5-20B) models serves as MoE, but never at the scale of large models.
	- Seeing a baby learn is so much refreshing than huge training data used to train these models. We need a different architecture to be anywhere close to AGI. Agents will be useful, but never will be truly agentic with current approach.
	    - This is a good read: [https://arxiv.org/abs/2505.22954](https://arxiv.org/abs/2505.22954)
	- Taking a step back: task becomes to segment and distill the environment for the agent to efficiently encode the environment for agent's understanding. Mapping and sequencing agent's environment before waiting for it to take action.
	- Memory: Ability to forge new memories from the ever-changing environment, unlearn useless ones. ChatGPT memory feels like a step in that direction, but it's way way far away from actual human episodic + long-term memory.
- [A Quest for a Cure: AI Drug Design with Isomorphic Labs - YouTube](https://www.youtube.com/watch?v=XpIMuCeEtSk)
	- Medicinal clinical trials need complete overhaul due to complete explosion that's happening in drug design phase.
	- This opens up the possibility of whether it's possible to simulate a human or maybe a bit more tractable problem, to simulate a smaller animal's complete system to test what effects will a drug have.
	- Things needed to understand: how a disease works, how designed molecules work, and affect toxicity inside us.
	- [Virtual cells](https://udara.io/science/virtual-cells)
		- [Virtual Cell Atlas \| Arc Institute](https://arcinstitute.org/tools/virtualcellatlas)
		- [Arc Institute’s first virtual cell model: <span style="font-variant: small-caps">S<span style="font-weight: bolder">tate</span></span> \| Arc Institute](https://arcinstitute.org/news/virtual-cell-model-state)
		- [Virtual Cell Challenge](https://virtualcellchallenge.org/)
		- [What Are Virtual Cells? - by Elliot Hershberg](https://centuryofbio.com/p/virtual-cell)
	- What is a disease? Diseases are basically "rogue" proteins inside a cell, and each protein has a function that it performs inside that cell. If there's a bug in that function, it will start affecting other parts of the cell, and when that cell multiplies, starts growing to the scale of the human body. This is basically what cancer is.
	- How drug works? Let's go to the molecular level. Drugs are these little wrenches that gets injected into the body at the diseased site, and just flip those switches inside the protein that made it rogue. Eventually, the cells stop reproducing, and antibodies kill the bad cells.
	- Why AI is such a good fit for biochemistry to design these drugs? **The Protein Database** consists of all the protein discovered till date, so it's a perfect fit for *supervised learning* ML models. But it's only thousands big, while these LLMs require millions of samples before overfitting. New models requiring much less training data to generalise the problem, then need to be developed for this problem.
	- Alphafold3 works both ways. It can test a scientist's hypothesis about a protein, i.e. take that protein, fold it so that it can be perfectly fit into the little crevice into the cell LEGO, and test if it binds to that site, and then iterate on top of it. What's even more mindblowing is, It can also take your question, your hypothesis about a drug, and go generate 5 proteins for you that can be the target binding proteins for that site.
	- I can't help but ask this question: **"Can we design diseases?"**. There might be million more diseases that we haven't even found, not just for humans but for the entire nature itself.
	- Is the drug design explosion happening for other species? If yes, who is doing it and how? If not, why?
	- What's happening at biochemistry, drug design, is trying to sample whole of protein space, which is a huge undertaking. What's also needed is our ability to design, test, develop, manufacture drugs in days and not months to fight Cov19 like diseases in future.
- [How we built our multi-agent research system \\ Anthropic](https://www.anthropic.com/engineering/built-multi-agent-research-system)
	- Classic architecture of master + worker agents doing work parallelly across different tasks identified and planned by the main agent.
		- worker agents is assigned a singular task, and returns back with the results, that is accumulated, cleaned and embellished by the master.
	- How did they enforce idempotency for single-purpose agents? Is main research agent responsible for tracking that new agents don't duplicate work?
		- Answer lies in concise and accurate prompts. Lead agent has to come up with an initial plan that indicates what subagents will it create, and what each subagent will do. This reduces the duplication of work to some extent.
	- Can an agent modify its own environment? Can it create new tools or combine existing ones for getting the information?
	- Summary
		- Prompts very important.
		- Multi-agent architecture outperforms single agent architecture on every benchmark and metric.
		- Orchestrator agent must assess a task's validity, complexity, and importance before delegating the tasks to subagents.
		- Agent's tool has to be defined precisely, and detailed. It should also be able to scrutinise its own usage of tools, and improve from past memory.
		- Teach agent to use its tools, rather than setting rigid rules for the agent to follow.
		- Evaluate early. Test prompts extensively, and look at strategies creating large impacts.
		- Unstructured tasks is better evaluated by the same agent that's executing the tasks. LLM-as-a-judge is suited for this task.
		- Work with checkpoint state rather than evaluating and validating each step.
		- Subagent output to a filesystem, or some other persistent storage for inter-agent communication with the main agent.
- [Resources for starting an FRO - by Alex Shintaro Araki](https://thenewfrontier.substack.com/p/resources-for-starting-an-fro)
- [Bengaluru is fated to run out of water. When will the crisis hit? \| Good Food Movement](https://gfm.akshayakalpa.org/read/feature-article/bengaluru-is-fated-to-run-out-of-water-when-will-the-crisis-hit)
	- Waste management, Urban green spaces, Water management is what's needed at the earliest, but sadly, no one cares enough to even try.
	- [Living in the most polluted city in the world](https://india.mongabay.com/2025/05/living-in-the-most-polluted-city-in-the-world/): Accounts of waste water being dumped into a living breathing river, crops getting blackened, livestock suffering due to industrial factories, beer manufacturing plants in a border town of Assam and Meghalaya.
- [Is there a Half-Life for the Success Rates of AI Agents? — Toby Ord](https://www.tobyord.com/writing/half-life)
	- Currently agent's success is measured by its ability to complete a task. A 60% success rate means out of 100 agents spawned to perform the task, 60 were able to reach the end of it.
	- Instead, can we track agent's success as a survival rate where there's a constant hazard rate associated to it, i.e. the probability of an agent failing at next step, considering it reached current step is constant.
		- This indicates that the survival rate of an agent falls exponentially as it progresses through the task.
	- A 50% success rate is measured as half-life of the agent.
	- Why should there be a constant hazard rate? Any task has certain success and failure indicators that signify when the task is determined to fail. These indicators increase with the length of the task at hand for the agent.
	- IMO it's not helpful in any way to characterise an agent's success probability in this way. It does help to predict time horizons for an 80% task, and differentiate between 50%-80% tasks.
	- Half-life of a radio isotope remains constant because its decay is independent of what has happened till now, and that's primarily because drastic change in the environment is rare. Agent's success rate depends upon many other factors (complexity, environment, context, task clarity).
- [The Industrial Explosion \| Forethought](https://www.forethought.org/research/the-industrial-explosion)
	- The problem that I have with all of these estimates is that they never account for a complete ecosystem bottlenecks.
	- For example, the research here says that 
		> [!quote] We’re uncertain about how large these uplifts might be, but it looks like – combining the gains from more productive individual workers, more productive firms, and more total human workers – the overall increase in physical output here might be about 10X.
		- This paragraph has more *maybe*, *might*, *uncertainty* than my own future.
		- How does the raw material gets sourced for this "Industrial explosion"?
		- How does our energy demand change with robots self-replicating *every few hours* and working throughout the day?
		- Humanoid robots represent supply side of the chain, where will the demand come from? We will automate all factory and production work with automated robots, but that doesn't mean we'll start consuming more, or living in more houses, or travelling more, or buying more gadgets. If humanity is tasked itself as the ultimate consumer, there has to be some limit where more consumption leads to deterioration of QoL.
		- This line of thinking should also include what's needed from the society, which is where the demand comes from. Climate action, electrification, circular economy, extra-terrestrial life support, Biological equipment.
	- Things I agree with:
		- Cost of Cognitive task labour will start to go down exponentially as AI continue to automate workflows across enterprises and consumer.
		- Physical labour will see a short-lived increase in demand due to it being a bottleneck until we reach humanoid robots capable of self-replication, and performing real-world tasks at human level.
		- At some point, current physical infrastructure will start becoming bottlenecks for the humanoid robots, and we'll design optimised equipment that relax human capabilities.

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
	- [ARK’s Expected Value For SpaceX In 2030: \~$2.5 Trillion Enterprise Value](https://www.ark-invest.com/articles/valuation-models/ark-expected-value-spacex-2030)
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
	- [\[2506.08872\] Your Brain on ChatGPT: Accumulation of Cognitive Debt when Using an AI Assistant for Essay Writing Task](https://arxiv.org/abs/2506.08872)
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



