---
title: "Robotics"
date: 2025-08-11
tags:
- robotics
- ai
---

# IK

> [!important] For rotational joint

> [!note] Notation
> - Joint configurations: $\theta_{1},\dots,\theta_{n}$, where each $\theta_{i}$ is called *joint angle*.
> - $\vec{s}=(s_{1},\dots,s_{k})^{\top} \in \mathbb{R}^{3k}$ where $k$ end effectors represented as $s_{1},\dots,s_{k}$, and each $s_{i}\in \mathbb{R}^{3}$.
> - Target positions for end effectors $\vec{t}=(t_{1},\dots,t_{k})^{\top}$
> - $\vec{e}=\vec{t}-\vec{s}$, where each $e_{i}=t_{i}-s_{i}$
> - Joint angles represented as column vector $\boldsymbol{\theta}=(\theta_{1},\dots,\theta_{n})^{\top}$
> - End effector positions can be represented as a function: $\vec{s}=\vec{s}(\boldsymbol{\theta})$
> - IK problem: find $\theta_{i}$'s such that $t_{i}=s_{i}(\boldsymbol{\theta}),\ \forall\, i$

Jacobian represents the instantaneous linear approximation of position as a function of $\boldsymbol{\theta}$ as $J(\boldsymbol{\theta})=\left( \frac{ \partial s_{i} }{ \partial \theta_{j} } \right)_{i,j}\in \mathbb{R}^{3k\times n}$

$$
J = 
\begin{bmatrix}
\dfrac{ \partial s_{1,x} }{ \partial \theta_{1} }  & \dfrac{ \partial s_{1,x} }{ \partial \theta_{2} }  & \cdots & \dfrac{ \partial s_{1,x} }{ \partial \theta_{n} }  \\
\dfrac{ \partial s_{1,y} }{ \partial \theta_{1} }  & \dfrac{ \partial s_{1,y} }{ \partial \theta_{2} }  & \cdots & \dfrac{ \partial s_{1,y} }{ \partial \theta_{n} }  \\
\vdots & \ddots & \dots & \vdots \\
\dfrac{ \partial s_{k,y} }{ \partial \theta_{1} }  & \dfrac{ \partial s_{k,y} }{ \partial \theta_{2} }  & \cdots & \dfrac{ \partial s_{k,y} }{ \partial \theta_{n} }  \\
\dfrac{ \partial s_{k,z} }{ \partial \theta_{1} }  & \dfrac{ \partial s_{k,z} }{ \partial \theta_{2} }  & \cdots  & \dfrac{ \partial s_{k,z} }{ \partial \theta_{n} } 
\end{bmatrix}

\begin{aligned} \text{Columns} &\rightarrow \text{Joint 1, Joint 2, }\ldots,\text{ Joint }n,\\ \text{Rows} &\rightarrow \text{End-effector }x,y,z\text{ coordinates.} \end{aligned}
$$

For an initial position $\vec{s},\boldsymbol{\theta}$ and target position $\vec{t}$, we seek to find the value of $\Delta\boldsymbol{\theta}$ for updating the value of joint angles as $\boldsymbol{\theta}:=\boldsymbol{\theta}+\Delta\boldsymbol{\theta}$. We define the instantaneous velocities of end effectors as $\dot{\vec{s}}=J(\boldsymbol{\theta})\dot{\boldsymbol{\theta}}$. Applying Taylor's expansion to initial position $s(\theta+\Delta\theta)-s(\theta)$, we obtain $\Delta \vec{s}\approx J(\boldsymbol{\theta})\Delta\boldsymbol{\theta}$.

Jacobian (instantaneous rate of change in end effectors), thus gives an iterative method to approximate the movement in the end effectors as a function of change of angle joints. Next question: How do we compute the Jacobian?
1. Write end effector coordinates $\vec{s}=f(\boldsymbol{\theta})$ as a function of $\boldsymbol{\theta}$ by multiplying transformation matrices successively for each joint, and then take the partial derivative with respect to each joint angle $\{ \theta_{i} \}_{i=1}^{n}$, and evaluating at current value of angle joints.
2. Use the dot product to obtain the tangent vector to the direction of rotation. Let $v_{j}$ be a unit vector pointing to along current axis of rotation, and $p_{j}$ be the position of the joint, then the instantaneous rate of change of position of end-effector $s_{i}$ with respect to joint $j$ is obtained by the cross product $\frac{ \partial s_{i} }{ \partial \theta_{j} }=v_{j}\times(s_{i}-p_{j})$.

$$
J=\begin{bmatrix}
\{ v_{1}\times(s_{i}-p_{1}) \}^{\top} & \{ v_{2}\times(s_{i}-p_{2}) \}^{\top} & \cdots & \{ v_{n}\times(s_{i}-p_{n}) \}^{\top}
\end{bmatrix},\ \forall \ i \in[1,k]
$$

Final step is to compute the inverse of the Jacobian to get $\Delta \boldsymbol{\theta}=J^{-1}\Delta \vec{s}$, but generally Jacobian is neither a square matrix or non-singular, and even if inverse is available, may have numerical errors if J is nearly singular. Alternate formulation for jacobian is obtained by setting $J(\theta)=\left( \frac{ \partial t_{i} }{ \partial \theta_{j} } \right)_{i,j}$ . This can be interpreted as trying to move the target positions towards the end effectors, rather than moving the end effectors towards the target position.

> [!question] When does the alternate Jacobian formulation give an advantage?
>
> "To reduce oscillations or overshoot when target positions are too far away to be reached by end effectors." - [Introduction to Inverse Kinematics with Jacobian Transpose, Pseudoinverse and Damped Least Squares methods](https://www.cs.cmu.edu/~15464-s13/lectures/lecture6/iksurvey.pdf)

> [!question] Why does Jacobian reach near singularity when arms stretch out to try to reach target position too far away?
> Solution is to move the target positions closer to end effector position by clamping the value to a maximum, $e_{i}=\text{ClampMax}(t_{i}-s_{i},D_{\text{max}})$, where $\text{ClampMax}(w,d)=d\cdot \frac{w}{\lVert w \rVert}$ if $\lVert w \rVert>d$, otherwise $w$.
> Choosing value of `d` is another heuristic, that changes with the inverse methods.

## Inverse Methods

- Jacobian Transpose
- Pseudoinverse method
- Damped Least Squares
- Selectively Damped Least Squares



Resources
- [Introduction to Inverse Kinematics with Jacobian Transpose, Pseudoinverse and Damped Least Squares methods](https://www.cs.cmu.edu/~15464-s13/lectures/lecture6/iksurvey.pdf)
- [Selectively Damped Least Squares for Inverse Kinematics](https://www.researchgate.net/profile/Samuel-Buss/publication/220494116_Selectively_Damped_Least_Squares_for_Inverse_Kinematics/links/09e4150cc04794d9d0000000/Selectively-Damped-Least-Squares-for-Inverse-Kinematics.pdf)
- [Inverse kinematics using the Jacobian inverse, part 2 • Najam R. Syed](https://nrsyed.com/2017/12/10/inverse-kinematics-using-the-jacobian-inverse-part-2/)
- [Inverse Kinematics and Foot Locking](https://theorangeduck.com/page/inverse-kinematics-foot-locking)

# Motors & Sensors

- image sensor, ultrasound sensor
	- [Sonair](https://www.sonair.com/)
	- How does ultrasound sensor work?
	- how does lidar work?
	- why is lidar so expensive?
	- can you make ultrasound work at the same accuracy as lidar?
	- what pixxel is doing is creating imaging sensors to map earth for satellites? doesn't on-ground robots require same setup?
- Actuators, motors
	- What kind of motors are needed by current robots?
	- what kind will be required by future robots?
	- Will all sensors and motors be manufactured inhouse by these robot startups or exported to a manufacturer?
	- what's the role of opensource drivers here?

# Resources
- Packages and papers in robotics
	- [\[2306.03310\] LIBERO: Benchmarking Knowledge Transfer for Lifelong Robot Learning](https://arxiv.org/abs/2306.03310)
	- [Installation — robosuite 1.5 documentation](https://robosuite.ai/docs/installation.html)
	- [GitHub - Genesis-Embodied-AI/genesis-world: Simulation platform for general-purpose robotics & embodied AI learning. · GitHub](https://github.com/Genesis-Embodied-AI/genesis-world)
	- [\[2605.02881\] MolmoAct2: Action Reasoning Models for Real-world Deployment](https://arxiv.org/abs/2605.02881)
	- [\[2506.07530\] BitVLA: 1-bit Vision-Language-Action Models for Robotics Manipulation](https://arxiv.org/abs/2506.07530)
	- [GitHub - RLinf/RLinf: RLinf: Reinforcement Learning Infrastructure for Embodied and Agentic AI · GitHub](https://github.com/RLinf/RLinf)
	- [GitHub - mani-skill/ManiSkill: Manipulation Skill Framework, an open source GPU parallelized robotics simulator and benchmark · GitHub](https://github.com/mani-skill/ManiSkill)
	- [GitHub - Physical-Intelligence/openpi · GitHub](https://github.com/Physical-Intelligence/openpi)
	- [phospho starter pack documentation](https://docs.phospho.ai/learn/policies)
	- [GitHub - kscalelabs/ksim: RL training library for humanoid locomotion and manipulation. Built on top of MuJoCo and JAX. · GitHub](https://github.com/kscalelabs/ksim)
- [Ask HN: How do I learn robotics in 2025? \| Hacker News](https://news.ycombinator.com/item?id=44158353)
- [Hand: open-source Robot Hand \| Hacker News](https://news.ycombinator.com/item?id=44592413)
- [GitHub - pollen-robotics/AmazingHand: Code and model to control the AH!](https://github.com/pollen-robotics/AmazingHand)
- [pen\_plotter\_robot/story.md at main · Robertleoj/pen\_plotter\_robot · GitHub](https://github.com/Robertleoj/pen_plotter_robot/blob/main/story.md)
- [GitHub - hello-robot/stretch\_ai](https://github.com/hello-robot/stretch_ai)
- [GitHub - dartsim/dart: DART: Dynamic Animation and Robotics Toolkit](https://github.com/dartsim/dart)
- [GitHub - kiloreux/awesome-robotics: A list of awesome Robotics resources](https://github.com/kiloreux/awesome-robotics)
- [GitHub - knmcguire/best-of-robot-simulators: A Best-of-list of Robot Simulators, re-generated weekly on Wednesdays](https://github.com/knmcguire/best-of-robot-simulators?tab=readme-ov-file)
- [GitHub - Vector-Wangel/XLeRobot: XLeRobot: Autonomous Household Dual-Arm Mobile Robot for $660](https://github.com/Vector-Wangel/XLeRobot)
- [GitHub - yash-goel/reading-list: For Robotics and Robot Learning Resources](https://github.com/yash-goel/reading-list)
- [GitHub - linchangyi1/Awesome-Touch: Tactile Sensing • Simulation • Representation • Manipulation • RL/IL/VLA • Open Source](https://github.com/linchangyi1/Awesome-Touch)
- [GitHub - GT-RIPL/Awesome-LLM-Robotics: A comprehensive list of papers using large language/multi-modal models for Robotics/RL, including papers, codes, and related websites](https://github.com/GT-RIPL/Awesome-LLM-Robotics)
- [GitHub - showlab/Awesome-Robotics-Diffusion: A curated list of recent robot learning papers incorporating diffusion models for robotics tasks.](https://github.com/showlab/Awesome-Robotics-Diffusion)
Teleop
- [GitHub - NVIDIA/IsaacTeleop: The unified framework for sim & real robot teleoperation · GitHub](https://github.com/NVIDIA/IsaacTeleop)
- [\[2307.04577\] AnyTeleop: A General Vision-Based Dexterous Robot Arm-Hand Teleoperation System](https://arxiv.org/abs/2307.04577)
- [\[2509.02437\] U-ARM : Ultra low-cost general teleoperation interface for robot manipulation](https://arxiv.org/abs/2509.02437)
- [\[2602.01632\] A Closed-Form Geometric Retargeting Solver for Upper Body Humanoid Robot Teleoperation](https://arxiv.org/abs/2602.01632)
- [\[2606.29940\] WARP: Whole-Body Retargeting for Learning from Offline Human Demonstrations](https://arxiv.org/abs/2606.29940)

MuJoCo
- [GitHub - sjchoi86/yet-another-mujoco-tutorial-v3 · GitHub](https://github.com/sjchoi86/yet-another-mujoco-tutorial-v3)
- [GitHub - google-deepmind/mujoco: Multi-Joint dynamics with Contact. A general purpose physics simulator. · GitHub](https://github.com/google-deepmind/mujoco)
- [MuJoCo Bootcamp](https://pab47.github.io/mujoco.html)
- [GitHub - tayalmanan28/MuJoCo-Tutorial: Tutorial on how to get started with MuJoCo Simulation Platform](https://github.com/tayalmanan28/MuJoCo-Tutorial)

Physical Engineering
- [Tech Tree · Back to Engineering](https://www.backtoengineering.com)
- [tldr robotics — core map prototype](https://www.tldrrobotics.com)
- [16-848 Hands: Design and Control for Dexterous Manipulation, Spring 2024](https://graphics.cs.cmu.edu/nsp/course/16848-s24/)

Graphics
- [15-464 / 15-664 Technical Animation, Spring 2023](https://graphics.cs.cmu.edu/nsp/course/15464-s23/www/)
- [Computer Graphics : Spring 2026](https://15362.courses.cs.cmu.edu/spring2026/)

Robot planning and Perception and Machine Learning
- [ECE 531/COS 531: Robot Planning Meets Machine Learning, Princeton University, Fall 2025](https://rpmml.github.io/)
- [Kevin M. Lynch and Frank C. Park, "MODERN ROBOTICS: MECHANICS, PLANNING, AND CONTROL"](https://hades.mech.northwestern.edu/images/7/7f/MR.pdf)
	- [Kevin Lynch, Instructor \| Coursera](https://www.coursera.org/instructor/kevinlynch)
	- [Modern Robotics, All Videos - YouTube](https://www.youtube.com/playlist?list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx)
- [Robotic Systems, by Kris Hauser](https://motion.cs.illinois.edu/RoboticSystems/InverseKinematics.html)
- [Welcome — Modeling and Control of Robots](https://wanxinjin.github.io/asu-robotics/intro.html)
- [Inverse Kinematics – Modeling, Motion Planning, and Control of Manipulators and Mobile Robots](https://opentextbooks.clemson.edu/wangrobotics/chapter/inverse-kinematics/)
- [Robotic Manipulation](https://manipulation.mit.edu/), [MIT 6.4210/6.4212 - Robotic Manipulation](https://manipulation.csail.mit.edu/Fall2025/), [Robotic Manipulation, Fall 2023 - YouTube](https://www.youtube.com/playlist?list=PLkx8KyIQkMfWr191lqbN8WfV08j-ui8WX)
- [Underactuated Robotics](https://underactuated.csail.mit.edu/), [Underactuated Robotics, Spring 2024 - YouTube](https://www.youtube.com/playlist?list=PLkx8KyIQkMfU5szP43GlE_S1QGSPQfL9s), [MIT 6.8210 - Underactuated Robotics | Assignments](https://underactuated.csail.mit.edu/Spring2024/assignments.html)
- [16-350 Planning Techniques for Robotics](https://www.cs.cmu.edu/~maxim/classes/robotplanning/), [16-782 Planning and Decision-making in Robotics](https://www.cs.cmu.edu/~maxim/classes/robotplanning_grad/), [16-832 Integrated Planning and Learning](https://www.cs.cmu.edu/~maxim/classes/integratedplanningandlearning/)
- [Introduction to Motion Planning for Continuum Robots - Part 1 -](https://www.opencontinuumrobotics.com/101/2023/06/23/intro-mp-part1.html)
- [CS 3630: Introduction to Robotics and Perception](https://faculty.cc.gatech.edu/~seth/Teaching/cs3630/index2018.php?u=home), [CS 8803RMP: Robot Motion Planning](https://faculty.cc.gatech.edu/~seth/Teaching/cs8803RMP/index-2019.php?u=schedule)
- [intro-to-robotics \| IRoM-Lab](https://irom-lab.princeton.edu/intro-to-robotics/)
- [Intro to Robotics - YouTube](https://www.youtube.com/playlist?list=PLMJv1WlrtFwBlDTfKtZS61VmttoL6KO-J)
- [CS 294-277, Robots That Learn (Spring 2026)](https://robots-that-learn.github.io/)
- [Welcome to Robotic Imaging Reading Group \| ImgRG](https://roboticimaging.github.io/ImgRG/)

RL in robotics
- [Computer Vision and Geometry Group \| Robot Learning](https://cvg.ethz.ch/lectures/Robot-Learning/)
- [Robot Learning: A Tutorial](https://arxiv.org/abs/2510.12403)

Simulator
- Mujoco
- [GitHub - mani-skill/ManiSkill: Manipulation Skill Framework, an open source GPU parallelized robotics simulator and benchmark · GitHub](https://github.com/mani-skill/ManiSkill)
- [GitHub - Genesis-Embodied-AI/genesis-world: Simulation platform for general-purpose robotics & embodied AI learning. · GitHub](https://github.com/Genesis-Embodied-AI/genesis-world)
- [GitHub - kscalelabs/ksim: RL training library for humanoid locomotion and manipulation. Built on top of MuJoCo and JAX. · GitHub](https://github.com/kscalelabs/ksim)
- [Installation — robosuite 1.5 documentation](https://robosuite.ai/docs/installation.html)

Datasets
- [datasets.bot: 41,885+ hours of open robot data](https://datasets.bot/)
- [GitHub - worldbench/awesome-embodied-data-pyramid: 🔥 Data Pyramid for Embodied Manipulation: A Survey · GitHub](https://github.com/worldbench/awesome-embodied-data-pyramid)
- [\[2306.03310\] LIBERO: Benchmarking Knowledge Transfer for Lifelong Robot Learning](https://arxiv.org/abs/2306.03310)
- [GitHub - sylvestf/LIBERO-plus: Official repository of LIBERO-plus, a generalized benchmark for in-depth robustness analysis of vision-language-action models. · GitHub](https://github.com/sylvestf/LIBERO-plus)
- [GitHub - Zxy-MLlab/LIBERO-PRO: LIBERO-PRO is the official repository of the LIBERO-PRO — an evaluation extension of the original LIBERO  benchmark · GitHub](https://github.com/Zxy-MLlab/LIBERO-PRO)
- [RoboArena](https://robo-arena.github.io/)
- [DROID: A Large-Scale In-the-Wild Robot Manipulation Dataset](https://droid-dataset.github.io/)
- [GitHub - RoboVerseOrg/RoboVerse: RoboVerse: Towards a Unified Platform, Dataset and Benchmark for Scalable and Generalizable Robot Learning · GitHub](https://github.com/RoboVerseOrg/RoboVerse)

Packages
- [GitHub - allenai/vla-evaluation-harness: One framework to evaluate any VLA model on any robot simulation benchmark. · GitHub](https://github.com/allenai/vla-evaluation-harness)
- [GitHub - starVLA/starVLA: StarVLA: A Lego-like Codebase for Vision-Language-Action Model Developing · GitHub](https://github.com/starVLA/starVLA)
- [GitHub - RLinf/RLinf: RLinf: Reinforcement Learning Infrastructure for Embodied and Agentic AI · GitHub](https://github.com/RLinf/RLinf)
- [NeMo Gym \| NeMo Gym](https://docs.nvidia.com/nemo/gym/main/about)
- [Overview — NeMo-RL](https://docs.nvidia.com/nemo/rl/0.5.0/about/overview.html)
- [phospho starter pack documentation](https://docs.phospho.ai/learn/policies)
- [GitHub - starVLA/starVLA: StarVLA: A Lego-like Codebase for Vision-Language-Action Model Developing · GitHub](https://github.com/starVLA/starVLA)
- [RL Post-Training for VLA Models](https://isaac-sim.github.io/IsaacLab/release/3.0.0-beta2/source/experimental-features/rlinf_vla_posttraining.html)
- [GitHub - allenai/vla-evaluation-harness: One framework to evaluate any VLA model on any robot simulation benchmark. · GitHub](https://github.com/allenai/vla-evaluation-harness)

VLA
- [\[2506.07530\] BitVLA: 1-bit Vision-Language-Action Models for Robotics Manipulation](https://arxiv.org/abs/2506.07530)

WAM
- [World Action Models (WAM): A Survey — Taxonomy & Paper List](https://world-action-models.github.io/)
- [GitHub - dreamzero0/dreamzero: Code to pretrain, fine-tune, and evaluate DreamZero and run sim & real-world evals · GitHub](https://github.com/dreamzero0/dreamzero)
- [Dyna-2: A 1-Million-Hour Scaling Law for World-Action Models — DYNA](https://www.dyna.co/dyna-2)

Foundation models
- [\[2604.15395\] Foundation Models in Robotics: A Comprehensive Review of Methods, Models, Datasets, Challenges and Future Research Directions](https://arxiv.org/abs/2604.15395)
- [GitHub - Physical-Intelligence/openpi · GitHub](https://github.com/Physical-Intelligence/openpi)
- [GitHub - NVIDIA/Isaac-GR00T: NVIDIA Isaac GR00T N1.7 -  A Foundation Model for Generalist Robots. · GitHub](https://github.com/NVIDIA/Isaac-GR00T)
- [\[2605.02881\] MolmoAct2: Action Reasoning Models for Real-world Deployment](https://arxiv.org/abs/2605.02881)

Papers
- [\[2607.18236\] Patch Policy: Efficient Embodied Control via Dense Visual Representations](https://arxiv.org/abs/2607.18236)
- [B-spline Policy](https://b-spline-policy.github.io/)
- [\[2605.24934\] HumanEgo: Zero-Shot Robot Learning from Minutes of Human Egocentric Videos](https://arxiv.org/abs/2605.24934)
- [\[2602.07322\] Action-to-Action Flow Matching](https://arxiv.org/abs/2602.07322)

Companies
- Unitree
- [Generalist](https://generalistai.com)
- [Sunday Robotics](https://sunday.ai)
- [Dyna robotics](https://dyna.co)
- Tesla robotics
- [Figure](https://figure.com)
- [NVIDIA Gear Lab](https://research.nvidia.com/labs/gear/)

Academic Labs