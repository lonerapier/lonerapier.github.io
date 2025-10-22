---
title: "Robotics"
date: 2025-08-11
tags:
- robotics
- ai
---

# Logs
- 1408: ordered the parts needed to create an RC car.
	- arduino, sdcard, wires, batteries, chassis, motors, sensors
- 2008: ready with a working RC car, using arduino and DC motors.
	- Next step: make the car more robust, and attach a [ultrasonic sensor](https://www.the-diy-life.com/arduino-based-obstacle-avoiding-robot-car/) to make it autonomous
2108: Next next step: create a [robotic arm](https://projecthub.arduino.cc/lee_curiosity/how-to-build-6-dof-robot-arm-from-dfrobot-kit-f14fca), and attach to the car.
2608: attached ultrasonic sensor, and added autonomous car code.
2808: discovered LiDAR + SLAM with ROS2 for efficient localisation and mapping of environment. Is it effective for only closed environments? Can it remember open world maps as well?

# Notes
- Arduino R4 WiFi
	- What's the ideal input power range?
	- PWM pins
	- EN pins
- How does DC and servo motors work internally? What's the difference?
- Do I need a voltage controller for motors or Arduino?
- Using DIY fiberglass board for chassis is quite effective.

# Questions
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
- [GitHub - huggingface/lerobot: 🤗 LeRobot: Making AI for Robotics more accessible with end-to-end learning](https://github.com/huggingface/lerobot)
- [Ask HN: How do I learn robotics in 2025? \| Hacker News](https://news.ycombinator.com/item?id=44158353)
- [Hand: open-source Robot Hand \| Hacker News](https://news.ycombinator.com/item?id=44592413)
- [GitHub - pollen-robotics/AmazingHand: Code and model to control the AH!](https://github.com/pollen-robotics/AmazingHand)
- [pen\_plotter\_robot/story.md at main · Robertleoj/pen\_plotter\_robot · GitHub](https://github.com/Robertleoj/pen_plotter_robot/blob/main/story.md)
- [GitHub - hello-robot/stretch\_ai](https://github.com/hello-robot/stretch_ai)
- [GitHub - ros2-rust/ros2\_rust: Rust bindings for ROS 2](https://github.com/ros2-rust/ros2_rust)
- [GitHub - dartsim/dart: DART: Dynamic Animation and Robotics Toolkit](https://github.com/dartsim/dart)
- [GitHub - kiloreux/awesome-robotics: A list of awesome Robotics resources](https://github.com/kiloreux/awesome-robotics)
- [GitHub - knmcguire/best-of-robot-simulators: A Best-of-list of Robot Simulators, re-generated weekly on Wednesdays](https://github.com/knmcguire/best-of-robot-simulators?tab=readme-ov-file)
- [GitHub - Vector-Wangel/XLeRobot: XLeRobot: Autonomous Household Dual-Arm Mobile Robot for $660](https://github.com/Vector-Wangel/XLeRobot)
- [Welcome to Robotic Imaging Reading Group \| ImgRG](https://roboticimaging.github.io/ImgRG/)
- [GitHub - yash-goel/reading-list: For Robotics and Robot Learning Resources](https://github.com/yash-goel/reading-list)
- [GitHub - linchangyi1/Awesome-Touch: Tactile Sensing • Simulation • Representation • Manipulation • RL/IL/VLA • Open Source](https://github.com/linchangyi1/Awesome-Touch)
- [GitHub - GT-RIPL/Awesome-LLM-Robotics: A comprehensive list of papers using large language/multi-modal models for Robotics/RL, including papers, codes, and related websites](https://github.com/GT-RIPL/Awesome-LLM-Robotics)
- [GitHub - showlab/Awesome-Robotics-Diffusion: A curated list of recent robot learning papers incorporating diffusion models for robotics tasks.](https://github.com/showlab/Awesome-Robotics-Diffusion)
